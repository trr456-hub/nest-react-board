import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  getAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async getOne(id: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id },
    });
    if (!board) {
      console.log(`Board with ID ${id} not found`);
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = this.boardRepository.create(createBoardDto);
    return await this.boardRepository.save(newBoard);
  }
}
