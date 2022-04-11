import { Module } from '@nestjs/common';
import { GameStateService } from './game-state.service';
import { GameStateController } from './game-state.controller';

@Module({
  controllers: [GameStateController],
  providers: [GameStateService],
})
export class GameStateModule {}
