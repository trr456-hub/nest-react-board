import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getAll(@Query('sort') sort: string): Promise<Board[]> {
    console.log('controllerSort : ', sort);
    return this.boardService.getAll(sort);
  }

  @Get(':id')
  getOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        exceptionFactory: (error) => {
          throw new BadRequestException('ID는 숫자여야 합니다.');
        },
      }),
    )
    id: number,
  ): Promise<Board> {
    return this.boardService.getOne(id);
  }

  @Post()
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.boardService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    console.log('controllerId : ', id);
    console.log('controllerBoardDto : ', updateBoardDto);
    return this.boardService.update(id, updateBoardDto);
  }
}
