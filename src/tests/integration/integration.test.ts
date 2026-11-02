
import request from "supertest";
import { app } from "../../app";
import { connectDB, disconnectDB } from "../../config/database";
import { PersonModel } from "../../models/people";
import { InteractionModel } from "../../models/interaction";

describe("Interaction API Integration Tests", () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    it("creates and retrieves an interaction", async () => {
        let personId: string | undefined;
        let interactionId: string | undefined;

        try {
            const person = await PersonModel.create({
                firstName: "InteractionTest",
                lastName: "Temporary",
                frequencyDays: 7
            });

            personId = person.id;

            const created = await request(app)
                .post("/api/v1/interactions")
                .send({
                    personId,
                    date: "2026-10-11T12:00:00.000Z",
                    type: "call",
                    notes: "Automated test"
                });

            expect(created.status).toBe(201);
            interactionId = created.body._id;
            expect(interactionId).toBeDefined();

            const found = await request(app)
                .get(`/api/v1/interactions/${interactionId}`);

            expect(found.status).toBe(200);
            expect(found.body.type).toBe("call");
            expect(found.body.personId).toBe(personId);

        } finally {
            if (interactionId) {
                await InteractionModel.findByIdAndDelete(interactionId);
            }
            if (personId) {
                await PersonModel.findByIdAndDelete(personId);
            }
        }
    });

    it("rejects invalid interaction data", async () => {
        const response = await request(app)
            .post("/api/v1/interactions")
            .send({
                personId: "invalid",
                date: "not-a-date",
                type: "telephone"
            });

        expect(response.status).toBe(400);
    });
});
