import { PlayerModel } from "../models/player-model"

const database: PlayerModel[] = [
    { 
        id: 1,
        name: "Lionel Messi",
        club: "Paris Saint-Germain",
        nacionality: "Argentina",
        position: "Forward",
        statistics: {
            Overall: 93,
            Pace: 85,
            Shooting: 94,
            Passing: 91,
            Dribbling: 95,
            Defending: 38,
            Physical: 65,
        },
    },
    { 
        id: 2,
        name: "Cristiano Ronaldo",
        club: "Manchester United",
        nacionality: "Portugal",
        position: "Forward",
        statistics: {
            Overall: 92,
            Pace: 89,
            Shooting: 93,
            Passing: 82,
            Dribbling: 88,
            Defending: 35,
            Physical: 78,
        },
    },
    { 
        id: 3,
        name: "Robert Lawandowski",
        club: "Bayern Munich",
        nacionality: "Poland",
        position: "Forward",
        statistics: {
            Overall: 91,
            Pace: 80,
            Shooting: 92,
            Passing: 78,
            Dribbling: 83,
            Defending: 40,
            Physical: 84,
        },
    },
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
    return database;
}

export const findPlayerById = async (id: number | undefined): Promise<PlayerModel | undefined> => {
    return database.find((player) => player.id === id);
}