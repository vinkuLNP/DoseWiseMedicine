import { Medication } from '../entities/medication';
import { MedicationColor } from '../enum/medicationColor';
import { MedicationStatus } from '../enum/medicationStatus';

export const DEFAULT_MEDICATIONS: Medication[] = [
    {
        id: '1',
        name: 'Vitamin D',
        dosage: '1000 IU',
        time: '08:00 AM',
        status: MedicationStatus.PENDING,
        color: MedicationColor.YELLOW,
    },
    {
        id: '2',
        name: 'Omega-3',
        dosage: '500 mg',
        time: '08:00 AM',
        status: MedicationStatus.PENDING,
        color: MedicationColor.TEAL,
    },
    {
        id: '3',
        name: 'Iron Supplement',
        dosage: '65 mg',
        time: '01:00 PM',
        status: MedicationStatus.PENDING,
        color: MedicationColor.CORAL,
    },
    {
        id: '4',
        name: 'Magnesium',
        dosage: '200 mg',
        time: '09:00 PM',
        status: MedicationStatus.PENDING,
        color: MedicationColor.PURPLE,
    },
];