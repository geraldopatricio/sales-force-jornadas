import { DateTime } from "luxon";
import { ValueTransformer } from "typeorm";

export class DateTimeTransforme implements ValueTransformer {
    // lê do banco que está em utc e transforma em America/Fortaleza
    public from(value: Date): DateTime {
        if (value) {
            return DateTime.fromJSDate(value, { zone: "America/Fortaleza" });
        }

        return null;
    }
    // o contrário
    public to(value: DateTime): string {
        if (value) return value.setZone("utc").toISO();
        return null;
    }
}
