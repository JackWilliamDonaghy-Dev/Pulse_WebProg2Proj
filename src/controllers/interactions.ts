
import { Request, Response } from "express";
import { InteractionService } from "../services/interactions";

const interactionService = new InteractionService();

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
