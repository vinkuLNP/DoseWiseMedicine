import { MedicationStatus } from "../enum/medicationStatus";

export function toggleMedicationStatus(
    status: MedicationStatus
): MedicationStatus {
    return status === MedicationStatus.PENDING
        ? MedicationStatus.TAKEN
        : MedicationStatus.PENDING;
}