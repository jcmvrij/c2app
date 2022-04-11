import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GameStateDto } from './dto/game-state.dto';
import { UpdateGameStateDto } from './dto/update-game-state.dto';
import { GameStateService } from './game-state.service';

@Controller('game-state')
export class GameStateController {
  constructor(private readonly gameStateService: GameStateService) {}

  @Post()
  create(@Body() state: GameStateDto) {
    return this.gameStateService.create(state);
  }

  @Get()
  findAll() {
    const results = this.gameStateService.findAll();
    return results;
  }

  @Get('/:stateId')
  findOne(@Param('stateId') stateId: string) {
    return this.gameStateService.findOne(Number(stateId));
  }

  @Patch('/:stateId')
  update(@Param('stateId') stateId: string, @Body() state: UpdateGameStateDto) {
    return this.gameStateService.update(Number(stateId), state);
  }

  @Delete('/:stateId')
  remove(@Param('stateId') stateId: string) {
    return this.gameStateService.remove(Number(stateId));
  }
}
