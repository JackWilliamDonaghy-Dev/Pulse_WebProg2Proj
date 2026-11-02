
import { createInteractionZSchema } from "../../models/interaction";

const validInteraction = {
    personId: "507f1f77bcf86cd799439011",
    date: "2026-10-11",
    type: "call"
};

describe("Interaction validation", () => {

    it("accepts a valid interaction", () => {
        expect(() => createInteractionZSchema.parse(validInteraction)).not.toThrow();
    });

    it("rejects an invalid person ID", () => {
        expect(() => createInteractionZSchema.parse({
            ...validInteraction, personId: "invalid"
        })).toThrow();
    });

    it("rejects an unsupported interaction type", () => {
        expect(() => createInteractionZSchema.parse({
            ...validInteraction, type: "telephone"
        })).toThrow();
    });

    it("rejects a missing date", () => {
        expect(() => createInteractionZSchema.parse({
            ...validInteraction, date: undefined
        })).toThrow();
    });
});
