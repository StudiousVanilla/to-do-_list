import {TodoList} from './todo_lists'
import {ListItem} from './list_items'
import {ListHolder} from './list_holder'
import {TaskCompletion} from './task_completion'
import {ItemMaker} from './item_maker'
import {ListMaker} from './list_maker'
import {Render} from './DOM_render'

let listHolder = new ListHolder([])
let listMaker = new ListMaker()
let itemMaker = new ItemMaker() 
let taskCompletion = new TaskCompletion(0,0)
let render = new Render()

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

    // when remove item is clicked
    removeItem(name,title){
        let list = listHolder.getList(name)
        list.filterOutItem(title)
    }

    // when complete item is clicked
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

    buttonListen(){
        // logic for clicking new list
        let newListButton = document.querySelector('#new-list-button')
        newListButton.addEventListener('click',(e)=>{
            e.preventDefault()
            console.log("New List");
        })
 



        /* logic for clickig on lists */

        /**********************************************************/

        // selects container which  will be hidden to show list
        let container = document.querySelector("#container")

        // selects list overlay template which will be populated with chisen list details
        let overlayList = document.querySelector(".overlay-list")

        // selects all the lists and click event logic to each 
        let listButtons = document.querySelectorAll('.list-holder')
        // assigns logic to each list
        for(const listButton of listButtons){

        // selects listname of overlay, to be populated once a list is clicked
        let listName = document.querySelector(".one-list-name")
        let addTaskButton = document.querySelector('.add-task-button')

        // selects the hexagon which shows how many remaining items are in a list
        let listHexagon = document.querySelector("#task-numbers-one")
        
            listButton.addEventListener('click',(e)=>{
                e.preventDefault()
                // identifies DOM element
                let list = e.target
                // using DOM element id the name of the list is gotten
                // this list name populates the listName DOM element
                listName.innerHTML = list.id

                // allows list name to be grabbed when clicking add task button
                addTaskButton.setAttribute("id",list.id)

                // sets the border colour for a list by its priority value
                listName.style.borderColor = listHolder.getList(list.id)["priority"]

                // sets hexagon indicator to the same length as the items object
                listHexagon.innerHTML = listHolder.getList(list.id)["items"].length
                

                // assign variable 'listItems' to the items of the list selected (using getlist())
                let listItems = listHolder.getList(list.id)["items"]

                // populate list with items here, calling function fro render module
                for (const item of listItems){
                    render.rednerOneListItem(item.title,item.dueDate,item.notes,item.priority)
                }
                // logic for making list-of-lists dissappear and single chosen list appear
                container.style.visibility = "hidden"
                overlayList.style.visibility = "visible"
                overlayList.style.top = "18vw"
            })
        }  

         /**********************************************************/





        // reverses visibility of lists and list-of-lists
        let homeButton = document.querySelector('#home-button')
        homeButton.addEventListener('click',(e)=>{
            e.preventDefault()
            container.style.visibility = "visible"
            overlayList.style.visibility = "hidden"
            overlayList.style.top = "100%"

            // removes anything rendered in the list-overlay
            let listItem = document.querySelector('.list-of-items')
            listItem.innerHTML=""
        })




        let addTaskButton = document.querySelector('.add-task-button')
        addTaskButton.addEventListener('click',(e)=>{
            let button = e.target
            console.log(button.id);
            
            
        })

    }



}


// variable that will control flow of everything
let controlPanel = new ControlPanel();


// Made three lists for List Holder
controlPanel.newList("Shopping",1)
controlPanel.newList("Exercise",2)
controlPanel.newList("Editing",3)

controlPanel.newItem("Shopping","Food","Carrots","Monday",1)
controlPanel.newItem("Shopping","Clothes","Shorts","Friday",2)
controlPanel.newItem("Shopping","Clothes","Shorts","Friday",1)
controlPanel.newItem("Shopping","Clothes","Shorts","Friday",3)

controlPanel.newItem("Exercise","Push-ups","6 reps of 30","Tuesday",3)
controlPanel.newItem("Exercise","Clothes","Shorts","Friday",1)

render.renderLists(listHolder.lists)
controlPanel.buttonListen()

controlPanel.newList("Books",1)
render.renderLists(listHolder.lists)
controlPanel.buttonListen()













// local storage?



// #*#*#*#*#*#*#*#*#*#*#
// be careful with sequence and flow of functions
// for example controlPanel.buttonListen() must be recalled after every render event so it captures new, or ignores deleted, buttons/clicks





// add list - (hopefully without fully re-rendering) - form design
// complete list
// delete list
// edit list




// add items to a list (hopefully without fully re-rendering) - form design
// complete items
// delete items
// task completion & generation trackers
            // (taskCompletion.tasksUncompleted & taskCompletion.tasksCompleted)
// edit items











