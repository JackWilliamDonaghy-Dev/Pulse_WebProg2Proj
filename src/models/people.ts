import { Schema, model } from "mongoose";
import { z } from "zod";

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

export const PersonModel = model<IPerson>(
    "Person", personSchema, "People"
);


export const createPersonZSchema = z.object({
    firstName: z.string().trim().min(1),
    lastName: z.string().trim().min(1),
    frequencyDays: z.number().int().min(1),
    lastContacted: z.coerce.date().nullable().optional(),
    openers: z.array(z.string()).optional()
});

export const updatePersonZSchema = createPersonZSchema.partial();
