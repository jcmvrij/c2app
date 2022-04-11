import { PartialType } from '@nestjs/mapped-types';
import { GameStateDto } from './game-state.dto';

export class UpdateGameStateDto extends PartialType(GameStateDto) {}
