// controller généré avec le commande nest generate controller todos
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

import { CreateTodoDto } from './dto/CreateTodoDto';
import { Todo } from './interfaces/Todo.interface';


@Controller('todo')
export class TodosController {

    //Injection de dépendance pour utiliser un service
    constructor(private readonly todosService: TodosService){}

    //id est un paramètre dynamique de l'URI
    @Get(':id')
    findOne(@Param('id') id:string){
        return this.todosService.findOne(id);
    }

    @Get()
    findAll(): Todo[]{
        return this.todosService.findAll();
    }

    @Post()
    createTodo(@Body() newTodo:CreateTodoDto){
        console.log(newTodo);
        this.todosService.create(newTodo);
        return "ok";
    }

    @Patch(':id')
    updateTodo(@Param('id') id:string, @Body() todo:CreateTodoDto){
        return this.todosService.update(id,todo);
    }

    @Delete(':id')
    deleteTodo(@Param("id") id:string){
        return this.todosService.delete(id);
    }

}
