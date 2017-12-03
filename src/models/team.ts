import {Player} from '../models/player'

export interface Team {
    id? : string 
    name?: string;
     player?: Player[];
}