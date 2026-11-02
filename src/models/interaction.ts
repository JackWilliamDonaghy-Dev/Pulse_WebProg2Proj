
import { Schema, model, Types } from "mongoose";
import { z } from "zod";

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
    "Interaction", interactionSchema, "Interactions"
);
  


/**
 * @openapi
 * components:
 *   schemas:
 *     CreateInteractionInput:
 *       type: object
 *       required:
 *         - personId
 *         - date
 *         - type
 *       properties:
 *         personId:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$'
 *           description: MongoDB ObjectId referencing a Person
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-10-11T14:00:00.000Z"
 *         type:
 *           type: string
 *           enum: [call, message, in-person, other]
 *         notes:
 *           type: string
 *           example: "Caught up over coffee"
 *     UpdateInteractionInput:
 *       type: object
 *       properties:
 *         personId:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$'
 *         date:
 *           type: string
 *           format: date-time
 *         type:
 *           type: string
 *           enum: [call, message, in-person, other]
 *         notes:
 *           type: string
 */

export const createInteractionZSchema = z.object({
    personId: z.string().regex(/^[a-f\d]{24}$/i),
    date: z.coerce.date(),
    type: z.enum(["call", "message", "in-person", "other"]),
    notes: z.string().optional()
});

export const updateInteractionZSchema = createInteractionZSchema.partial();
