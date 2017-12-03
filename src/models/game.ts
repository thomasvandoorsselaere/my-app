import { Team } from "./team";
import { Gameoptions } from "./gameoptions";

export interface Game {
    id?: string;
    date?: Date;
    team?: Team;
    options?: Gameoptions;
}