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
        localStorage.setItem("lists",JSON.stringify(listHolder.lists))
    }

    // called when order lists button is clicked
    orderLists(property){
        listHolder.sortListsByProperty(property)
    }

    // called when remove list button is clicked
    removeList(name){
        listHolder.filterOutList(name)
        localStorage.setItem("lists",JSON.stringify(listHolder.lists))
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
        render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
        localStorage.setItem("lists",JSON.stringify(listHolder.lists))

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
        taskCompletion.taskDeleted()
        render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
        localStorage.setItem("lists",JSON.stringify(listHolder.lists))
    }

    // when complete item is clicked
    completeItem(name,title){
        // selects relevant list
        let list = listHolder.getList(name)
        // sends a completion message
        console.log("Task completed: "+ title);
        // removes item from list
        taskCompletion.taskCompleted()
        render.taskCompletionRender(taskCompletion.taskCompleted,taskCompletion.tasksUncompleted)
        list.filterOutItem(title)

        localStorage.setItem("lists",JSON.stringify(listHolder.lists))
    }

    editItems(name,title,newList,newTitle,newNotes,newDueDate,newPriority){
        let list = listHolder.getList(name)
        let item = list.getItem(title)
        item.editItem(newList,newTitle,newNotes,newDueDate,newPriority)
    }

    initaliseStoredLists(){
        if (localStorage.length === 0){
            localStorage.setItem("lists",JSON.stringify(listHolder.lists))
            localStorage.setItem("tasks",(taskCompletion.tasksCompleted))
        }   
    }

    getStoredLists(){
        // 1 get stored lists
        let storedLists =  JSON.parse(localStorage.getItem('lists'))

        // 2 populate listholder with lists - use stored lists info
        for(const storedList of storedLists){
            this.newList(storedList.name,storedList.priority)
            // 3 populates lists with items - use stored lists item info
            for(const item of storedList.items){
                this.newItem(storedList.name,item.title,item.notes,item.dueDate,item.priority)         
            }  
        }
    }

    getTasksCompleted(){
        taskCompletion.tasksCompleted= parseInt(localStorage.getItem('tasks'))
    }

    homeRender(){
    // 4 render lists -- make a control panel function
    if(listHolder.lists.length === 0){    
    }
    else{
        render.renderLists(listHolder.lists)
        //render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
    }
    }

    buttonListen(){
        /* logic for clickig on lists */

        /**********************************************************/

        // selects container which  will be hidden to show list
        let container = document.querySelector("#container")

        // selects list overlay template which will be populated with chisen list details
        let overlayList = document.querySelector(".overlay-list")

        // selects all the lists and click event logic to each 
        let listButtons = document.querySelectorAll('.list-name')
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
                listName.innerHTML = list.id.replace('-'," ")

                // allows list name to be grabbed when clicking add task button
                addTaskButton.setAttribute("id",list.id)

                // sets the border colour for a list by its priority value
                listName.style.borderColor = "var(--priority-"+listHolder.getList(list.id)["priority"]+")"

                // sets hexagon indicator to the same length as the items object
                listHexagon.innerHTML = listHolder.getList(list.id)["items"].length
                

                // assign variable 'listItems' to the items of the list selected (using getlist())
                let listItems = listHolder.getList(list.id)["items"]

                // populate list with items here, calling function froM render module
                for (const item of listItems){
                    render.rednerOneListItem(item.title,item.dueDate,item.notes,item.priority)
                }
                // logic for making list-of-lists dissappear and single chosen list appear
                container.style.visibility = "hidden"
                overlayList.style.visibility = "visible"
                overlayList.style.top = "18vw"

                let deleteItemButtons = document.querySelectorAll('.delete-item-button')

                for(const deleteItemButton of deleteItemButtons){
                    deleteItemButton.addEventListener('click',(e)=>{
                        e.preventDefault()
                        let itemTitle = e.target.id.slice(0,-19);
                        render.removeListItemRender(itemTitle)

                        this.removeItem(list.id,itemTitle)
                        listHexagon.innerHTML = listHolder.getList(list.id)["items"].length
                    }) 
                }

                let completeItemButtons = document.querySelectorAll(".complete-item-button")

                for (const completeItemButton of completeItemButtons){
                    completeItemButton.addEventListener('click',(e)=>{
                        e.preventDefault()
                        let itemTitle = e.target.id.slice(0,-21);
                        let item = document.querySelector('#'+itemTitle+'-item')
                        item.style.transition = "0.5s"
                        item.style.color =  completeItemButton.style.color
                        setTimeout(()=>{render.removeListItemRender(itemTitle)},1000)
                        this.removeItem(list.id,itemTitle)
                        listHexagon.innerHTML = listHolder.getList(list.id)["items"].length

                        taskCompletion.taskCompleted()

                        console.log(taskCompletion);

                        render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)

                        localStorage.setItem("tasks",(taskCompletion.tasksCompleted))
                    })
                }
                

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

            // updates list hexagonal task counter
            for (const list of listHolder.lists){
               let hexagon = document.querySelector("#task-numbers-"+list.name);
                hexagon.innerHTML = list["items"].length  
            }


            
        })


        // logic for adding tasks
        let addTaskForm = document.querySelector('#item-form-container')
        let addTaskButton = document.querySelector('.add-task-button')
        let listID = "";

        addTaskButton.addEventListener('click',(e)=>{
            e.preventDefault()

            // CSS for making form appear and disdappear when relevant button clicked
            overlayList.style.transition = "0s"
            overlayList.style.visibility = "hidden"
            addTaskForm.style.transition = "0.5s"
            addTaskForm.style.visibility="visible"
            addTaskForm.style.height = "fit-content"
            addTaskForm.style.top = "30vw"

            // stores the name of the list based on which list the item will be added to
            return listID = e.target["id"]            
        })

        // identifies and adds event that listens for 'Add Task' submit button, submitting the item form
        let submitItem = document.querySelector("#item-form")
        submitItem.addEventListener('submit',(e)=>{
            e.preventDefault()

            let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if(format.test(submitItem.title.value)){
                alert("Unfortunately special characters are not supported:\n[ ` ! @ # $ % ^ & * ( ) _ + \- = \ [\] { } ; ' : \\ | , .<>\ /?~]") 
            }

            else{

                // makes a new item from inputs and adds this item to the relevant list
                this.newItem(listID,submitItem.title.value, submitItem.dueDate.value, submitItem.notes.value, submitItem.priority.value);

                // removes form and brings back list of items
                addTaskForm.style.transition = "0s"
                addTaskForm.style.top = "100%"
                addTaskForm.style.height = "0.1vw"
                addTaskForm.style.visibility = "hidden"
                overlayList.style.transition = "0.5s"
                overlayList.style.visibility = "visible"

                // sets number of items in list Hexagon
                let listHexagon = document.querySelector("#task-numbers-one")
                listHexagon.innerHTML = listHolder.getList(listID)["items"].length
                
                // adds new item to bottom of the list
                render.rednerOneListItem(submitItem.title.value, submitItem.dueDate.value, submitItem.notes.value, submitItem.priority.value)

                // resets form values
                submitItem.reset()

                let oldWrapper = document.getElementById('mega-wrapper')
                let newWrapper = oldWrapper.cloneNode(true);
                oldWrapper.parentNode.replaceChild(newWrapper, oldWrapper)
                this.buttonListen()
            }

        })

        // reverses visibility of new task form and list of items elements
        let cancelAddTaskButton = document.querySelector('#cancel-new-task')
        cancelAddTaskButton.addEventListener('click',(e)=>{
            e.preventDefault()
            addTaskForm.style.transition = "0s"
            addTaskForm.style.top = "100%"
            addTaskForm.style.height = "0.1vw"
            addTaskForm.style.visibility = "hidden"
            overlayList.style.transition = "0.5s"
            overlayList.style.visibility = "visible"
            submitItem.reset()
            
        })
        
        

         // logic for showing users the new list form and hiding container
        let newListForm = document.querySelector('#list-form-container')
        let newListButton = document.querySelector('#new-list-button')
        newListButton.addEventListener('click',(e)=>{
            e.preventDefault()
            container.style.visibility = "hidden"
            newListForm.style.transition = "0.5s"
            newListForm.style.visibility = "visible"
            newListForm.style.height = "fit-content"
            newListForm.style.top = "30vw"
        })

        // reverses visibility of new list form and container elements
        let cancelNewlistButton = document.querySelector('#cancel-new-list')
        cancelNewlistButton.addEventListener('click', (e)=>{
            e.preventDefault()
            newListForm.style.transition = "0s"
            newListForm.style.top = "100%"
            newListForm.style.visibility = "hidden"
            newListForm.style.height = "0.1vw"
            container.style.visibility = "visible"
            newList.reset()
        })

        // logic for submitting new list 
        let newList = document.querySelector('#list-form')
        newList.addEventListener('submit',(e)=>{
            e.preventDefault()
            let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if(format.test(newList.name.value)){
                alert("Unfortunately special characters are not supported:\n[ ` ! @ # $ % ^ & * ( ) _ + \- = \ [\] { } ; ' : \\ | , .<>\ /?~]")
                
            }
            else{
            
            this.newList(newList.name.value,newList.priority.value)

            newListForm.style.transition = "0s"
            newListForm.style.top = "100%"
            newListForm.style.visibility = "hidden"
            newListForm.style.height = "0.1vw"
            container.style.visibility = "visible"

            render.renderLists(listHolder.lists)

            newList.reset()

            let oldWrapper = document.getElementById('mega-wrapper')
            let newWrapper = oldWrapper.cloneNode(true);
            oldWrapper.parentNode.replaceChild(newWrapper, oldWrapper)
            this.buttonListen()
             }
        })

        let deleteListButtons = document.querySelectorAll('.delete-list-button')
        for (const deleteListButton of deleteListButtons){
            deleteListButton.addEventListener('click',(e)=>{
                e.preventDefault()
                let listName = e.target.id.slice(7)
                let hex = document.querySelector("#task-numbers-"+listName)

                for(let i = 0; i < hex.innerHTML; i++){
                    taskCompletion.taskDeleted()
                }
                this.removeList(listName)
                render.removeListRender(listName)

                render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
            })
        }

        let completeListButtons = document.querySelectorAll('.complete-list-button')
        for (const completeListButton of completeListButtons){
            completeListButton.addEventListener('click',(e)=>{
                e.preventDefault()
                let listName = e.target.id.slice(9)
                let hex = document.querySelector("#task-numbers-"+listName)

                for(let i = 0; i < hex.innerHTML; i++){
                    taskCompletion.taskCompleted()
                }


                this.removeList(listName)

                render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
                localStorage.setItem("tasks",(taskCompletion.tasksCompleted))

                let listsCompleted = document.querySelectorAll("#"+listName)
                for(const listCompleted of listsCompleted){
                    listCompleted.style.transition = "0.5s"
                    listCompleted.style.color = "green"            
                    if(listCompleted.className === "list-name"){
                        listCompleted.style.borderColor ="green"
                    }

                }
                setTimeout(()=>{render.removeListRender(listName)},800)
            })
        }
    }

}
let controlPanel = new ControlPanel()

controlPanel.initaliseStoredLists()
controlPanel.getStoredLists()
controlPanel.getTasksCompleted()
controlPanel.homeRender()
render.taskCompletionRender(taskCompletion.tasksCompleted,taskCompletion.tasksUncompleted)
controlPanel.buttonListen()









// tasks remaing is double deleting?


// priority colours dissappear upon refresh?

// font size on inputs is too small



// dates










