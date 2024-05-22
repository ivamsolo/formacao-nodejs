import { findAllPlayers, findPlayerById } from "../repositories/players-repository";

export const getPlayerService = async (id?: number) => {
    let data = null;

    if (id) {
        data = await findPlayerById(id);
    } else {
        data = await findAllPlayers();
    }

    return data;    
};