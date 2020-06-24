import {TodoList} from './todo_lists'

class ListMaker{
    constructor(){
    }
    createList(name,items){
        let list = new TodoList(name,items)
        return list;
    }
}

export{
    ListMaker
}