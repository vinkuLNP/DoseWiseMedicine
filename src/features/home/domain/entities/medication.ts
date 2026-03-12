import { MedicationStatus } from "../enum/medicationStatus";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: MedicationStatus;
  color: 'coral' | 'purple' | 'teal' | 'yellow' | 'pink';
  icon?: string;
}