import { Player } from "./player";

export interface Game {
    id?: string;
    name?: string;
    date?: Date;
    players?: Player[];
}