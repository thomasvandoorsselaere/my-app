import { Player } from "./player";

export interface Game {
    id?: string;
    date?: Date;
    players?: Player[];
}