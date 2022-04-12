export class GameStateDto {
  id: number;
  turn: number;
  players: [{ id: string; inControlOfColor: Array<string>; turnCompleted: boolean }];
  unitsRed: {};
  unitsBlue: {};
  unitsWhite: {};
}
