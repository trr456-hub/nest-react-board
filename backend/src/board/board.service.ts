import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  getAll(sort?: string): Promise<Board[]> {
    return this.boardRepository.find({
      order: {
        [sort || 'id']: 'DESC',
      },
    });
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

  async delete(id: number): Promise<void> {
    const board = await this.getOne(id);
    await this.boardRepository.remove(board);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    await this.boardRepository.update(id, updateBoardDto);
    console.log('serviceId : ', id);
    console.log('serviceBoardDto : ', updateBoardDto);
    return this.getOne(id);
  }
}
