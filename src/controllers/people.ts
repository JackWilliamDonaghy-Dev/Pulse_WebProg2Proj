import { Request, Response } from 'express';

export class PeopleController {

  getPeople = async (_req: Request, res: Response): Promise<void> => {

    res.status(200).json({ success: true, 
      data: "this is just dummy for now a response to the get all people request" });
  };

  getPersonById = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the get person by id request with person id ${req.params.id}` });
  };

  createPerson = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the create person request the data received in the request body is: ${JSON.stringify(req.body)}` });
  };

  updatePerson = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the update person by id request with person id ${req.params.id}` }); 
  };

  deletePerson = async (_req: Request, res: Response): Promise<void> => {
    res.status(200).json({ success: true, 
      data: `this is just dummy for now a response to the delete person by id request with person id ${_req.params.id}` }); 
  };
}
