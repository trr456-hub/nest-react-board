import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  private data: Board[] = [];

  getAll(): Board[] {
    return this.data;
  }
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
}
