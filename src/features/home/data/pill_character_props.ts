import { ThemeColors } from "../../splash/types/types";
import { MedicationStatus } from "../domain/entities/medication";

export type PillCharacterProps = {
    color: keyof ThemeColors;
    status: MedicationStatus;
    size?: number;
};