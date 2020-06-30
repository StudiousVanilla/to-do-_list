import {ListItem} from './list_items'

class ItemMaker{
    constructor(){
    }
    createItem(list,title,notes,dueDate,priority){
        let dirtyItemTitle = title
        let cleanItemTitle = dirtyItemTitle.replace(/\s/g, '-')
        let item = new ListItem(list,cleanItemTitle,notes,dueDate,priority)
        return item;
    }
}

export{
    ItemMaker
}