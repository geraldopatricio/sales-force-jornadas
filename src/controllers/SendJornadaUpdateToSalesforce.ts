/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { getIsCartaoCanceladoService } from "../factories/getCartaoCanceladaService";
import { getConta } from "../factories/getConta";
import { getCreateDataRequestSalesforce } from "../factories/getCreateDataRequestSalesforce";
import { getEnderecoPierService } from "../factories/getEnderecoPierService";
import { getGetCartaoByIdService } from "../factories/getGetCartaoByIdService";
import { getGetProdutoService } from "../factories/getGetProdutoService";
import { getGetUltimoIdEnviado } from "../factories/getGetUltimoIdEnviado";
import { getNumeroCelular } from "../factories/getNumeroCelular";
import { getObjetosPendentes } from "../factories/getObjetosPendentes";
import { getPessoaDetalhes } from "../factories/getPessoaDetalhes";
import { getSaveObjetoPendenteService } from "../factories/getSaveObjetoPendenteService";
import { getsaveUltimoIdEnviado } from "../factories/getSaveUltimoIdEnviado";
import { getSendDataToSalesforce } from "../factories/getSendDataToSalesforce";
import { getSetObjetoCouriers } from "../factories/getSetObjetoCouriersStrategy";

export class SendJornadaUpdateToSalesforce {
    async handle() {
        const getObjetosPendentesService = getObjetosPendentes();

        const isCartaoCanceladoService = getIsCartaoCanceladoService();
        const getEndereco = getEnderecoPierService();
        const getContaService = getConta();
        const sendDataToSalesforce = getSendDataToSalesforce();
        const createDataRequestSalesforce = getCreateDataRequestSalesforce();
        const getPessoasDetalhesService = getPessoaDetalhes();
        const saveObjetoPendente = getSaveObjetoPendenteService();
        const getNumeroCelularService = getNumeroCelular();
        const getSetObjetoCouriersStrategyService = getSetObjetoCouriers();
        const getUltimoIdEnviado = getGetUltimoIdEnviado();
        const saveUltimoIdEnviado = getsaveUltimoIdEnviado();
        const getProduto = getGetProdutoService();
        const getCartao = getGetCartaoByIdService();

        const [objetosPendentes, count] =
            await getObjetosPendentesService.execute();

        console.log(
            "Numero de objetos pendentes retornados na consulta: ",
            count
        );

        const objetosWithCouriersSettled =
            getSetObjetoCouriersStrategyService.execute(objetosPendentes);

        for (const objeto of objetosWithCouriersSettled) {
            try {
                // verifica se o cartão foi cancelado, o que pode significar que uma nova via foi pedido.
                const objetoPendente = objeto.objeto_pendente_info;
                const cartao = await getCartao.execute(objeto.id_cartao);
                const isCartaoCancelado =
                    await isCartaoCanceladoService.execute(cartao);
                // se cartao for cancelado apenas marcar como finalizado.
                if (isCartaoCancelado) {
                    objetoPendente.marcarComoFinalizado();

                    // se não for cancelado segue com este fluxo
                } else {
                    // conta, telefoneCelular, pessoasDetalhes usados para formar os dados para enviar
                    const conta = await getContaService.execute(
                        objeto.id_conta
                    );

                    const produto = await getProduto.execute({ cartao });

                    const telefoneCelular =
                        await getNumeroCelularService.execute(conta.idPessoa);

                    const pessoaDetalhes =
                        await getPessoasDetalhesService.execute(conta.idPessoa);
                    // fluxo particular para jornada de end_incorreto
                    if (objetoPendente.isJornadaEndIncorreto()) {
                        const enderecoPier = await getEndereco.execute(
                            conta.idPessoa
                        );

                        // se o endereço mudou, não é necessário disparar mais uma vez para o usuário que ele precisa mudar o end
                        if (objetoPendente.isMesmoEndereco(enderecoPier[0])) {
                            objetoPendente.marcarComoFinalizado();

                            // se o endereco for o mesmo, mesmo que tenha mudado, prosseguir com as mensagens.
                        } else {
                            objetoPendente.nextStep();
                        }

                        // Para demais rotinas, calcula-se próxima etapa a ser salva e salva está como ultima.
                        /**  exemplo: jornada de end_incorreto, ultima etapa enviada antes da execução desta rotina era de
                         * 1. Ou seja apenas D1 foi enviado, portanto, agora deve ser enviado D2.
                         * Chamando o nextStep ele atualiza ultima_etapa_enviada para 2.
                         * O createDataRequestSalesforce irá extrair que é a etapa 2 para ser enviado agora e chamará a classe de evento correspondente.                 *
                         */
                    } else {
                        objetoPendente.nextStep();
                        saveObjetoPendente.execute(objetoPendente);
                    }

                    saveObjetoPendente.execute(objetoPendente);

                    const ultimoIdEnviado = await getUltimoIdEnviado.execute();
                    if (!objetoPendente.isFinalizado()) {
                        const dataToSend =
                            await createDataRequestSalesforce.execute(
                                objeto,
                                conta,
                                pessoaDetalhes,
                                telefoneCelular,
                                ultimoIdEnviado,
                                produto
                            );
                        await sendDataToSalesforce.execute(dataToSend);
                        await saveUltimoIdEnviado.execute(ultimoIdEnviado);
                    }
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
                    console.log(`Objeto: ${objeto} error: ${error}`);
                }
            }
        }
    }
}
