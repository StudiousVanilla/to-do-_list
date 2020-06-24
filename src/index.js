import {TodoList} from './todo_lists'
import {ListItem} from './list_items'
import {ListHolder} from './list_holder'
import {TaskCompletion} from './task_completion'
import {ItemMaker} from './item_maker'
import {ListMaker} from './list_maker'

let listHolder = new ListHolder([])
let listMaker = new ListMaker()
let itemMaker = new ItemMaker()
let taskCompletion = new TaskCompletion()

class ControlPanel{
    constructor(){
    }

    // called when create list button is clicked
    newList(name){
        // listmkaers makes list &
        // new list added to listholder array using
        listHolder.addList(listMaker.createList(name,[]))
    }

    // called when create list button is clicked
    newItem(listname,title,notes,dueDate,priority){
        // creates temporary list variable so store appropriate ToDo list
        let list = listHolder.getList(listname)
        // creats a new item object, and adds is to the relevant ToDo list
        list.addItemToList(itemMaker.createItem(listname,title,notes,dueDate,priority))
    }
}

// variable that will control flow of everything
let controlPanel = new ControlPanel();


// Made two lists for List Holder
controlPanel.newList("Shopping")
controlPanel.newList("Exercise")

// Add items to 'Shopping' list
controlPanel.newItem("Shopping","Buy Groceries","Don't forger the carrots")
controlPanel.newItem("Shopping","Buy Clothes")

// Add item to 'Exercise' list
controlPanel.newItem("Exercise","Push-ups")

console.log((listHolder.lists));


/*

********************

below functions are written
However, they need to be accessed through the ControlPanel class

********************

*/

// order lists

// complete list
// delete list
// edit list
// order list items



// complete item - need a 'getItem()' function?
// delete item
// edit item







//**************** dynamically creating lists and list items **************









