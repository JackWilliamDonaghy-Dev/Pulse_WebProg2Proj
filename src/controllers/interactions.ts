
import { Request, Response } from "express";
import { InteractionService } from "../services/interactions";

const interactionService = new InteractionService();


/**
 * @openapi
 * /interactions:
 *   get:
 *     summary: Get all interactions
 *     tags: [Interactions]
 *     responses:
 *       200:
 *         description: List of interactions
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create an interaction
 *     tags: [Interactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInteractionInput'
 *     responses:
 *       201:
 *         description: Interaction created
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Server error
 *
 * /interactions/{id}:
 *   get:
 *     summary: Get an interaction by ID
 *     tags: [Interactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interaction found
 *       404:
 *         description: Interaction not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update an interaction
 *     tags: [Interactions]
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
 *             $ref: '#/components/schemas/UpdateInteractionInput'
 *     responses:
 *       200:
 *         description: Interaction updated
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Interaction not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an interaction
 *     tags: [Interactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Interaction deleted
 *       404:
 *         description: Interaction not found
 *       500:
 *         description: Server error
 */

export class InteractionController {

    getInteractions = async (_req: Request, res: Response): Promise<void> => {
        try {
            const interactions = await interactionService.getAllInteractions();
            res.status(200).json(interactions);
        } catch (error) {
            res.status(500).json({ message: "Error fetching interactions" });
        }
    };

    getInteractionById = async (req: Request, res: Response): Promise<void> => {
        try {
            const interaction = await interactionService.getInteractionById(String(req.params.id));
            if (!interaction) {
                res.status(404).json({ message: "Interaction not found" });
                return;
            }
            res.status(200).json(interaction);
        } catch (error) {
            res.status(500).json({ message: "Error fetching interaction" });
        }
    };

    createInteraction = async (req: Request, res: Response): Promise<void> => {
        try {
            const interaction = await interactionService.createInteraction(req.body);
            res.status(201).json(interaction);
        } catch (error) {
            res.status(500).json({ message: "Error creating interaction" });
        }
    };

    updateInteraction = async (req: Request, res: Response): Promise<void> => {
        try {
            const interaction = await interactionService.updateInteraction(String(req.params.id), req.body);
            if (!interaction) {
                res.status(404).json({ message: "Interaction not found" });
                return;
            }
            res.status(200).json(interaction);
        } catch (error) {
            res.status(500).json({ message: "Error updating interaction" });
        }
    };

    deleteInteraction = async (req: Request, res: Response): Promise<void> => {
        try {
            const interaction = await interactionService.deleteInteraction(String(req.params.id));
            if (!interaction) {
                res.status(404).json({ message: "Interaction not found" });
                return;
            }
            res.status(200).json({ message: "Interaction deleted" });
        } catch (error) {
            res.status(500).json({ message: "Error deleting interaction" });
        }
    };
}
