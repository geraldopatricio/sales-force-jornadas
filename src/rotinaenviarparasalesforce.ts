/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/first */
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import { DateTime } from "luxon";

import { SendStatusToSalesforce } from "./controllers/SendStatusToSalesforce";
import { connectToDB } from "./databases";

(async () => {
    const dataParaBuscarObjetosBanco = DateTime.now()
        .minus({ minutes: 10 })
        .set({ millisecond: 0, second: 0 })
        .setZone("utc")
        .toString();

    console.log(
        `Script iniciado com data para data_atualizacao >= ${dataParaBuscarObjetosBanco}`
    );

    await connectToDB();

    const sendStatusToSalesforce = new SendStatusToSalesforce();
    await sendStatusToSalesforce.handle();
    console.log(`Finalizado às ${DateTime.now().toString()}`);
})();
