import { getObjetos } from "../factories/getObjeto";

export class TestQuerie {
    async handle() {
        const getObjetosService = getObjetos();
        const objetos = await getObjetosService.execute();
        console.log(objetos[0]);
    }
}
