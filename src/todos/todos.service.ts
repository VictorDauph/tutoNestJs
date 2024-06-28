//// controller généré avec le commande nest generate service todos
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/CreateTodoDto';
import { Todo } from './interfaces/Todo.interface';


@Injectable()
export class TodosService {
    todos:Todo[]=[
        {
            id: 1,
            titre: "Objet 1",
            description: "Description de l'objet 1",
            done:false
        },
        {
            id: 2,
            titre: "Objet 2",
            description: "Description de l'objet 2",
            done:true
        },
        {
            id: 3,
            titre: "Objet 3",
            description: "Description de l'objet 3",
            done:false
        }
    ]

    findOne(id:string){
        return this.todos.find(todo=> todo.id=== Number(id));
    }
    findAll():Todo[] {
        return this.todos;
    }

    create(todo:CreateTodoDto){
        this.todos=[...this.todos, todo as Todo];
    }

    update(id:string, todo:Todo){
        //retrieve todo to update
        const todoToUpdate = this.todos.find( todo=> todo.id === +id );
        if(!todoToUpdate){
            return new NotFoundException("todo not found");
        }

        //apply modifications
        //apply to update a single property
        if(todo.hasOwnProperty('done') ){
            todoToUpdate.done=todo.done;
        }
        if(todo.titre){
            todoToUpdate.titre=todo.titre;
        }
        if(todo.description ){
            todoToUpdate.description=todo.description;
        }

        const updatedTodos = this.todos.map(t => t.id !== +id ? t:todoToUpdate);
        this.todos = [...updatedTodos];
        return {updatedTodos:1, todo:todoToUpdate};
    }

    delete(id:string){
        const nbOfTodosBeforeDelete = this.todos.length;
        this.todos=this.todos.filter(t=>t.id !== +id);
        if(this.todos.length<nbOfTodosBeforeDelete){
            return {deletedTodos:1,nbTodos:this.todos.length}
        }else{
            return {deletedTodos:0,nbTodos:this.todos.length}
        }
    }
}
