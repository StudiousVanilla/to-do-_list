import {ListItem} from './list_items'

class ItemMaker{
    constructor(){
    }
    createItem(list,title,notes,dueDate,priority){
        let item = new ListItem(list,title,notes,dueDate,priority)
        return item;
    }
}

export{
    ItemMaker
}