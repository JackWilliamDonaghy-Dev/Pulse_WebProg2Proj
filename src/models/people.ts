import { Schema, model } from "mongoose";

export interface IPerson {
    firstName: string;
    lastName: string;
    frequencyDays: number;
    lastContacted: Date | null;
    openers: string[];
}

const personSchema = new Schema<IPerson>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    frequencyDays: { type: Number, required: true, min: 1 },
    lastContacted: { type: Date, default: null },
    openers: { type: [String], default: [] }
}, { timestamps: true });

export const PersonModel = model<IPerson>("Person", personSchema);