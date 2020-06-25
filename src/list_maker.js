import {TodoList} from './todo_lists'

class ListMaker{
    constructor(){
    }
    createList(name,items,priority){
        let list = new TodoList(name,items,priority)
        return list;
    }
}

export{
    ListMaker
}