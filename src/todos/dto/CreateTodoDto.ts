export class CreateTodoDto{
    readonly id:number;
    readonly titre:string;
    readonly done: boolean;
    readonly description?:string;
}