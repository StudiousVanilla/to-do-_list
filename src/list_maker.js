import {TodoList} from './todo_lists'

class ListMaker{
    constructor(){
    }
    createList(name,items,priority){
        let dirtyListName = name
        let cleanListName = dirtyListName.replace(/\s/g, '-')
        let list = new TodoList(cleanListName,items,priority)
        return list;
    }
}

export{
    ListMaker
}