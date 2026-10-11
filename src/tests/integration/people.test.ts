
import request from "supertest";
import { app } from "../../app";
import { connectDB, disconnectDB } from "../../config/database";
import { PersonModel } from "../../models/people";

describe("Person API Integration Tests", () => {

    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await disconnectDB();
    });

    it("should complete the Person CRUD lifecycle", async () => {
        const testName = `Test-${Date.now()}`;
        let id: string | undefined;

        try {
            // CREATE
            const created = await request(app)
                .post("/api/v1/people")
                .send({
                    firstName: testName,
                    lastName: "Integration",
                    frequencyDays: 7,
                    lastContacted: null
                });

            expect(created.status).toBe(201);
            id = created.body._id;
            expect(id).toBeDefined();

            // READ
            const found = await request(app)
                .get(`/api/v1/people/${id}`);

            expect(found.status).toBe(200);
            expect(found.body.firstName).toBe(testName);

            // UPDATE
            const updated = await request(app)
                .put(`/api/v1/people/${id}`)
                .send({ frequencyDays: 14 });

            expect(updated.status).toBe(200);
            expect(updated.body.frequencyDays).toBe(14);

            // DELETE
            const deleted = await request(app)
                .delete(`/api/v1/people/${id}`);

            expect(deleted.status).toBe(200);

            // VERIFY DELETION
            const missing = await request(app)
                .get(`/api/v1/people/${id}`);

            expect(missing.status).toBe(404);

        } finally {
            // Clean up even if an assertion fails
            if (id) {
                await PersonModel.findByIdAndDelete(id);
            }
        }
    });

    it("should reject invalid Person data", async () => {
        const response = await request(app)
            .post("/api/v1/people")
            .send({
                firstName: "",
                lastName: "Test",
                frequencyDays: -3
            });

        expect(response.status).toBe(400);
    });

});
