import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import * as loki from 'lokijs';
import { Collection } from 'lokijs';
import { dirname, resolve } from 'path';
import { cwd } from 'process';
import { GameStateDto } from './dto/game-state.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';

const dbName = process.env.GAMESTATEDB || 'db/gamestate.db';

@Injectable()
export class GameStateService {
  private db: loki;
  private gamestates: Collection<GameStateDto>;

  constructor() {
    const folderPath = dirname(resolve(cwd(), dbName));
    if (!existsSync(folderPath)) mkdirSync(folderPath, { recursive: true });
    this.db = new loki(dbName);
    this.gamestates = this.db.addCollection('gamestates');
  }

  create(state: GameStateDto) {
    return this.gamestates.insert(state);
  }

  findAll() {
    return this.gamestates.find();
  }

  findOne(stateId: number) {
    return this.gamestates.findOne({ id: stateId });
  }

  update(stateId: number, partialState: UpdateGameStateDto) {
    const state = this.gamestates.findOne({ id: stateId }) as GameStateDto;
    for (const property in partialState) {
      state[property] = partialState[property];
    }
    for (const player of state.players) {
      if (!player.turnCompleted) return this.gamestates.update(state);
    }
    // this.defaultWebSocketGateway.server.emit('gamestate', state);
    return this.gamestates.update(state);
  }

  remove(stateId: number) {
    const results = this.gamestates.find({ id: stateId });
    if (results.length === 1) {
      return this.gamestates.remove(results[0]);
    }
    return false;
  }
}
