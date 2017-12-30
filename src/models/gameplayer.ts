export class GamePlayer {
    constructor(
        public id?: string,
        public date?: Date,
        public name?: string,
        public points?: number,
        public rebounds?: number,
        public assists?: number,
        public steals?: number,
        public blocks?: number,
        public turnovers?: number,
        public gameId?: string,
        public status?: boolean
    )
    {

    }
}