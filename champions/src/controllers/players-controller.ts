import { Request, Response } from "express";
import { getPlayerService } from "../services/players-service";
import { httpResponse } from "../utils/http-helper";

export const getPlayer = async (req: Request, res: Response) => {
    const data = await getPlayerService();
    const response = await httpResponse(data);
    res.status(response.statusCode).json(response.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const data = await getPlayerService(id);
    const response = await httpResponse(data);
    res.status(response.statusCode).json(response.body);
};