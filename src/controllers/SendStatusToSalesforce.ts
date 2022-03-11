/* eslint-disable no-await-in-loop */
import { ObjetoPendente } from "../entities/db_rastramento_cartoes/ObjetoPendente";
import { getIsCartaoCanceladoService } from "../factories/getCartaoCanceladaService";
import { getConta } from "../factories/getConta";
import { getCreateDataRequestSalesforce } from "../factories/getCreateDataRequestSalesforce";
import { getGetCartaoByIdService } from "../factories/getGetCartaoByIdService";
import { getGetProdutoService } from "../factories/getGetProdutoService";
import { getGetUltimoIdEnviado } from "../factories/getGetUltimoIdEnviado";
import { getNumeroCelular } from "../factories/getNumeroCelular";
import { getObjetos } from "../factories/getObjeto";
import { getPessoaDetalhes } from "../factories/getPessoaDetalhes";
import { getSaveObjetoPendenteService } from "../factories/getSaveObjetoPendenteService";
import { getsaveUltimoIdEnviado } from "../factories/getSaveUltimoIdEnviado";
import { getSendDataToSalesforce } from "../factories/getSendDataToSalesforce";
import { getSetObjetoCouriers } from "../factories/getSetObjetoCouriersStrategy";

export class SendStatusToSalesforce {
    async handle() {
        // Criando os services necessários para execução da rotina
        const getObjetosService = getObjetos();
        const setObjetoCourierStrategyService = getSetObjetoCouriers();
        const createDataRequestSalesforce = getCreateDataRequestSalesforce();
        const getNumeroCelularService = getNumeroCelular();
        const getContaService = getConta();
        const GetPessoasDetalhesService = getPessoaDetalhes();
        const sendDataToSalesforce = getSendDataToSalesforce();
        const isCartaoCanceladoService = getIsCartaoCanceladoService();
        const saveObjetoPendenteService = getSaveObjetoPendenteService();
        const getUltimoIdEnviado = getGetUltimoIdEnviado();
        const saveUltimoIdEnviado = getsaveUltimoIdEnviado();
        const getProduto = getGetProdutoService();
        const getCartao = getGetCartaoByIdService();
        // -- execução da rotina --

        // getObjetos traz os objetos que tiveram alguma atualização nos últimos 10 minutos
        const objetos = await getObjetosService.execute();

        // printa numero de objetos retornados na consulta.
        console.log("Numero de objetos: ", objetos.length);
        // cada objeto tem sua courier, que por sua vez tem as regras para determinar o status do objeto
        // aqui a courier é inserida no objeto para verificar o status.

        const objetosWithCourierSettled =
            setObjetoCourierStrategyService.execute(objetos);

        // eslint-disable-next-line no-restricted-syntax
        for (const objeto of objetosWithCourierSettled) {
            try {
                // só serão enviados para salesforce aqueles que mudaram seus status em relação a iteração anterior.
                const cartao = await getCartao.execute(objeto.id_cartao);

                let objetoPendente = objeto.objeto_pendente_info;
                if (objetoPendente) {
                    if (!objetoPendente.isSameStatus(objeto.getStatus())) {
                        objetoPendente.setJornada(objeto.getStatus());

                        const isCartaoCancelado =
                            await isCartaoCanceladoService.execute(cartao);
                        // se cartão foi cancelado, então finaliza a jornada.
                        if (isCartaoCancelado) {
                            objetoPendente.cancelCartao();
                        }
                    }
                    /* Se não tiver objeto novo entao cria um novo. Como é a primeira vez então deverá ser enviado
                    para salesforce */
                } else {
                    objetoPendente =
                        ObjetoPendente.createNewObjetoPendente(objeto);
                }

                // se existir agora um objetoPendente e for para ser enviado então é enviado
                if (objetoPendente.isToBeSend()) {
                    const conta = await getContaService.execute(
                        objeto.id_conta
                    );
                    // resgata os detalhes da pessoa
                    const pessoaDetalhes =
                        await GetPessoasDetalhesService.execute(conta.idPessoa);

                    // resgata o telefone da pessoa
                    const telefone = await getNumeroCelularService.execute(
                        conta.idPessoa
                    );

                    const ultimoIdEnviado = await getUltimoIdEnviado.execute();

                    const produto = await getProduto.execute({ cartao });
                    // cria os dados que devem ser enviados atraves da api Salesforce.
                    const dataToSend =
                        await createDataRequestSalesforce.execute(
                            objeto,
                            conta,
                            pessoaDetalhes,
                            telefone,
                            ultimoIdEnviado,
                            produto
                        );
                     await sendDataToSalesforce.execute(dataToSend);
                     await saveUltimoIdEnviado.execute(ultimoIdEnviado);
                     await saveObjetoPendenteService.execute(objetoPendente);
                }
            } catch (error) {
                if (error.isAxiosError) {
                    console.log(
                        "Objeto.id:",
                        objeto.id,
                        "Request url:",
                        error.config.url,
                        "Request data:",
                        error.config.data,
                        "Response status:",
                        error.response.status,
                        "Response data:",
                        error.response.data
                    );
                } else {
                    console.log(objeto);
                    console.log(error);
                }
            }
        }
    }
}
