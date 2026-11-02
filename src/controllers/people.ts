
import { Request, Response } from "express";
import { PersonService } from "../services/people";

const personService = new PersonService();


/**
 * @openapi
 * /people:
 *   get:
 *     summary: Get all people
 *     tags: [People]
 *     responses:
 *       200:
 *         description: List of people
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a person
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePersonInput'
 *     responses:
 *       201:
 *         description: Person created
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 *
 * /people/{id}:
 *   get:
 *     summary: Get a person by ID
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person found
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a person
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePersonInput'
 *     responses:
 *       200:
 *         description: Person updated
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a person
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Person deleted
 *       404:
 *         description: Person not found
 *       500:
 *         description: Server error
 */

export class PersonController {

    getPeople = async (_req: Request, res: Response): Promise<void> => {
        try {
            const people = await personService.getAllPeople();
            res.status(200).json(people);
        } catch (error) {
            res.status(500).json({ message: "Error fetching people" });
        }
    };

    getPersonById = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            const person = await personService.getPersonById(id);

            if (!person) {
                res.status(404).json({ message: "Person not found" });
                return;
            }

            res.status(200).json(person);
        } catch (error) {
            res.status(500).json({ message: "Error fetching person" });
        }
    };

    createPerson = async (req: Request, res: Response): Promise<void> => {
        try {
            const person = await personService.createPerson(req.body);
            res.status(201).json(person);
        } catch (error) {
            res.status(500).json({ message: "Error creating person" });
        }
    };

    updatePerson = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            const person = await personService.updatePerson(id, req.body);

            if (!person) {
                res.status(404).json({ message: "Person not found" });
                return;
            }

            res.status(200).json(person);
        } catch (error) {
            res.status(500).json({ message: "Error updating person" });
        }
    };

    deletePerson = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = String(req.params.id);
            const person = await personService.deletePerson(id);

            if (!person) {
                res.status(404).json({ message: "Person not found" });
                return;
            }

            res.status(200).json({ message: "Person deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting person" });
        }
    };
}
