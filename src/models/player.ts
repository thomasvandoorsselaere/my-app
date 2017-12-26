import { Gameoptions } from "./gameoptions";

export interface Player extends Gameoptions {
    id?: string;
    name?: string;
    team?: string;
    points?: string
    rebounds?: string
    assists?: string
    steals?: string
    blocks?: string
    turnovers?: string
    
}