
import { createPersonZSchema } from "../../models/people";

const validPerson = {
    firstName: "Helen",
    lastName: "Donaghy",
    frequencyDays: 3,
    lastContacted: null
};

describe("Person validation", () => {

    it("accepts valid person data", () => {
        expect(() => createPersonZSchema.parse(validPerson)).not.toThrow();
    });

    it("rejects a missing first name", () => {
        expect(() => createPersonZSchema.parse({
            ...validPerson, firstName: undefined
        })).toThrow();
    });

    it("rejects an empty last name", () => {
        expect(() => createPersonZSchema.parse({
            ...validPerson, lastName: ""
        })).toThrow();
    });

    it("rejects a negative frequency", () => {
        expect(() => createPersonZSchema.parse({
            ...validPerson, frequencyDays: -5
        })).toThrow();
    });

    it("rejects a decimal frequency", () => {
        expect(() => createPersonZSchema.parse({
            ...validPerson, frequencyDays: 2.5
        })).toThrow();
    });

    it("allows null for lastContacted", () => {
        expect(() => createPersonZSchema.parse({
            ...validPerson, lastContacted: null
        })).not.toThrow();
    });
});
