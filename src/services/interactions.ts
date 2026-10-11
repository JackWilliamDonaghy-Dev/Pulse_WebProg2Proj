
import { InteractionModel, IInteraction } from "../models/interaction";
import { HydratedDocument } from "mongoose";

export class InteractionService {

    async getAllInteractions(): Promise<IInteraction[]> {
        return await InteractionModel.find().lean();
    }

    async getInteractionById(id: string): Promise<IInteraction | null> {
        return await InteractionModel.findById(id).lean();
    }

    async createInteraction(data: IInteraction): Promise<HydratedDocument<IInteraction>> {
        const interaction = new InteractionModel(data);
        return await interaction.save();
    }

    async updateInteraction(id: string, data: Partial<IInteraction>): Promise<IInteraction | null> {
        return await InteractionModel.findByIdAndUpdate(
            id, data, { returnDocument: "after", runValidators: true }
        ).lean();
    }

    async deleteInteraction(id: string): Promise<IInteraction | null> {
        return await InteractionModel.findByIdAndDelete(id).lean();
    }
}
