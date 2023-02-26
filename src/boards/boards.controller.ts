/* eslint-disable prettier/prettier */
import { Controller, Get, Logger, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './board.status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';


@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController')
    constructor(private boardsService: BoardsService) {}
    
    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    @Get()
    getAllBoard(
        @getUser() user: User
    ): Promise<Board[]>{
        this.logger.verbose(`User ${user.username} trying to get all boards`)
        return this.boardsService.getAllBoards(user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
        @getUser() user: User): Promise<Board> {
        this.logger.verbose(`User ${user.username} creating a new board.
        Payload: ${JSON.stringify(createBoardDto)} `)
        return this.boardsService.createBoard(createBoardDto, user);
    }


    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string) {
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @getUser() user:User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);        
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     return this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
