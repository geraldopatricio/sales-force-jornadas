/* eslint-disable import-helpers/order-imports */
/* eslint-disable import/first */
import "reflect-metadata";
import dotenv from "dotenv";

dotenv.config();
import { DateTime } from "luxon";

import { SendJornadaUpdateToSalesforce } from "./controllers/SendJornadaUpdateToSalesforce";
import { connectToDB } from "./databases";

(async () => {
    const dataParaBuscarObjetosBanco = DateTime.now()
        .set({ second: 0, millisecond: 0, minute: 0, hour: 0 })
        .setZone("utc")
        .toISO();

    console.log(
        `Script iniciado com data para data_checagem >= ${dataParaBuscarObjetosBanco}`
    );

    await connectToDB();
    const sendJornadaUpdateSalesforce = new SendJornadaUpdateToSalesforce();
    await sendJornadaUpdateSalesforce.handle();
    console.log(`Finalizado às ${DateTime.now().toString()}`);
})();
