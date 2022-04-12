import { Module } from '@nestjs/common';
import { GameStateService } from './game-state.service';
import { GameStateController } from './game-state.controller';
import { DefaultWebSocketGateway } from '../gateway/default-websocket.gateway';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [GameStateController],
  providers: [GameStateService, DefaultWebSocketGateway],
})
export class GameStateModule {}
