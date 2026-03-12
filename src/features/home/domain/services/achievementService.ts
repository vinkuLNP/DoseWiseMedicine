import { Medication } from "../entities/medication";
import { MedicationStatus } from "../enum/medicationStatus";

export function isPerfectDay(meds: Medication[]) {
    return meds.every((m) => m.status === MedicationStatus.TAKEN);
}