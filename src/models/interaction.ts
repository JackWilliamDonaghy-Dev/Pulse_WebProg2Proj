
import { Schema, model, Types } from "mongoose";

export interface IInteraction {
    personId: Types.ObjectId;
    date: Date;
    type: "call" | "message" | "in-person" | "other";
    notes?: string;
}

const interactionSchema = new Schema<IInteraction>({
    personId: {
        type: Schema.Types.ObjectId,
        ref: "Person",
        required: true
    },
    date: { type: Date, required: true },
    type: {
        type: String,
        enum: ["call", "message", "in-person", "other"],
        required: true
    },
    notes: { type: String, default: "" }
}, { timestamps: true });

export const InteractionModel = model<IInteraction>(
    "Interaction", interactionSchema
);
  