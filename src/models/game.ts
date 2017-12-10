import { Team } from "./team";
import { Gameoptions } from "./gameoptions";
import { Player } from "./player";

export interface Game {
    id?: string;
    date?: Date;
    players?: Player[];
}