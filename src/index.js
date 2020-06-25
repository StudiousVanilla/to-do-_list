import {TodoList} from './todo_lists'
import {ListItem} from './list_items'
import {ListHolder} from './list_holder'
import {TaskCompletion} from './task_completion'
import {ItemMaker} from './item_maker'
import {ListMaker} from './list_maker'

let listHolder = new ListHolder([])
let listMaker = new ListMaker()
let itemMaker = new ItemMaker() 
let taskCompletion = new TaskCompletion(0,0)

class ControlPanel{
    constructor(){
    }

    // called when create list button is clicked
    newList(name,priority){
        // listmkaers makes list &
        // new list added to listholder array using
        listHolder.addList(listMaker.createList(name,[],priority))
    }

    // called when order lists button is clicked
    orderLists(property){
        listHolder.sortListsByProperty(property)
    }

    // called when remove list button is clicked
    removeList(name){
        listHolder.filterOutList(name)
    }

    // called when complete list button is clicked  **************
    completeList(name){
        // gets length of items array from relevant list
        let numOfItems = listHolder.getList(name)["items"].length

        // if list has only 1 item, a singular message is sent
        if(numOfItems === 1){
            console.log("Are you sure? There is still " + numOfItems + " uncompleted task in this list"); // after this 
        }

        // if list has more than 1 item, a plural message is sent
        else if(numOfItems > 1){
            console.log("Are you sure? There are still " + numOfItems + " uncompleted tasks in this list");
        }

        // if list has not items then completion message is sent
        // then list is deleted
        else{
            console.log(name + " list completed");
            listHolder.filterOutList(name)
        }
    }

    // called when list edits are submitted
    editList(name,newName,newPriority){
        let listEdited = listHolder.getList(name)
        listEdited.editList(newName,newPriority)
    }

    // called when create list button is clicked
    newItem(listname,title,notes,dueDate,priority){
        taskCompletion.taskCreated()
        // creates temporary list variable so store appropriate ToDo list
        let list = listHolder.getList(listname)
        // creats a new item object, and adds is to the relevant ToDo list
        list.addItemToList(itemMaker.createItem(listname,title,notes,dueDate,priority))
    }

    // when order items button is clicked (in a list)
    orderItemsInList(name,property){
        // gets relevant list and assigns value to 'list'
        let list = listHolder.getList(name)
        // executes ordering function fom TodoLidt class
        list.orderItemsByProperty(property)
    }

    removeItem(name,title){
        let list = listHolder.getList(name)
        list.filterOutItem(title)
    }

    completeItem(name,title){
        taskCompletion.taskCompleted()
        // selects relevant list
        let list = listHolder.getList(name)
        // sends a completion message
        console.log("Task completed: "+ title);
        // removes item from list
        list.filterOutItem(title)
    }

    editItems(name,title,newList,newTitle,newNotes,newDueDate,newPriority){
        let list = listHolder.getList(name)
        let item = list.getItem(title)
        item.editItem(newList,newTitle,newNotes,newDueDate,newPriority)
    }

}


// variable that will control flow of everything
let controlPanel = new ControlPanel();

console.log("Remaning: "+taskCompletion.tasksUncompleted);
console.log("Completed: "+taskCompletion.tasksCompleted);


// Made two lists for List Holder
controlPanel.newList("Shopping",3)
controlPanel.newList("Exercise",2)
controlPanel.newList("Editing",1)


// Add items to 'Shopping' list
controlPanel.newItem("Shopping","Buy Groceries","Don't forget the carrots","Monday",8)

controlPanel.newItem("Shopping","Buy Clothes")

// Add item to 'Exercise' list
controlPanel.newItem("Exercise","Push-ups")
controlPanel.newItem("Exercise","Squats")
controlPanel.newItem("Exercise","Sit-ups")









// complete list & complete item --- DOM checking element *********
// (logic for display of message?) *****



// don't forget about task counters
// taskCompletion.tasksUncompleted & taskCompletion.tasksCompleted



// functionality whereby editing an items list will automatically move it to that list or make a new list if needed










