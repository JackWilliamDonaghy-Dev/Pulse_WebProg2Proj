
import { PersonModel, IPerson } from "../models/people";
import { HydratedDocument } from "mongoose";

export class PersonService {

    async getAllPeople(): Promise<IPerson[]> {
        return await PersonModel.find().lean();
    }

    async getPersonById(id: string): Promise<IPerson | null> {
        return await PersonModel.findById(id).lean();
    }

    async createPerson(personData: IPerson): Promise<HydratedDocument<IPerson>> {
        const person = new PersonModel(personData);
        return await person.save();
    }

    async updatePerson(id: string, personData: Partial<IPerson>): Promise<IPerson | null> {
        return await PersonModel.findByIdAndUpdate(
            id, personData, { returnDocument: "after"}
        ).lean();
    }

    async deletePerson(id: string): Promise<IPerson | null> {
        return await PersonModel.findByIdAndDelete(id).lean();
    }
}
