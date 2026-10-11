
import { Request, Response } from "express";
import { PersonService } from "../services/people";

const personService = new PersonService();

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
