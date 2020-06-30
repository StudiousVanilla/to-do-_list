import {ListHolder} from './list_holder'

let listHolder = new ListHolder()

class Render{
    constructor(){
        
    }

    // the logic for rendering lists to the home page
    renderHomeLogic(name,priority,numberOfTasks){

        let dirtyListName = name
        let cleanListName = dirtyListName.replace(/\s/g, '-')

        let container = document.querySelector("#list-of-lists")

        let listName = document.createElement('li')
        listName.setAttribute('class','list-name')
        listName.setAttribute('id',cleanListName)
        listName.innerHTML = cleanListName.replace("-", ' ')
        listName.style.borderColor = "var(--priority-"+priority+")"

        let hexagon = document.createElement("div")
        hexagon.setAttribute('class',"hexagon")
        hexagon.setAttribute('id',name)

        let taskNumber = document.createElement("div")
        taskNumber.setAttribute('class','task-numbers')
        taskNumber.setAttribute('id',"task-numbers-"+cleanListName)
        taskNumber.innerHTML = numberOfTasks
        hexagon.appendChild(taskNumber)

        let deleteList = document.createElement('button')
        deleteList.innerHTML = "X"
        deleteList.setAttribute('class','delete-list-button')
        deleteList.setAttribute('id','delete-'+cleanListName)

        let completeList = document.createElement('button')
        completeList.innerHTML = "&#10003"
        completeList.setAttribute('class','complete-list-button')
        completeList.setAttribute('id','complete-'+cleanListName)
        completeList.style.color = "var(--priority-"+priority+")"
        completeList.style.borderColor = "var(--priority-"+priority+")"
        

        let listHolderDiv = document.createElement("div")
        listHolderDiv.setAttribute('class','list-holder')
        listHolderDiv.setAttribute('id',cleanListName+"-div")

        listHolderDiv.appendChild(hexagon)
        listHolderDiv.appendChild(listName)
        listHolderDiv.appendChild(completeList)
        listHolderDiv.appendChild(deleteList)
        container.appendChild(listHolderDiv)

        
 
    }

    // called once the new list button is clicked, or upon returning to the homepage
    renderLists(lists){

        let container = document.querySelector("#list-of-lists")
        container.innerHTML = "";
        
        if (lists<=1){
            this.renderHomeLogic(lists["name"],lists["priority"],lists["items"].length)
        }
        else{
            for (const list of lists){
                this.renderHomeLogic(list["name"],list["priority"],list["items"].length)
            }
        }
    }

    // populates blank container
    rednerOneListItem(title,date,notes,priority){

            let itemNotes = document.createElement('p')
            itemNotes.setAttribute('id','notes')
            itemNotes.innerHTML=notes

            let deleteItemButton = document.createElement('button')
            deleteItemButton.setAttribute('id',title+'-delete-item-button')
            deleteItemButton.setAttribute('class','delete-item-button')
            deleteItemButton.innerHTML = "X"

            let itemDate = document.createElement('p')
            itemDate.setAttribute('id','date')
            itemDate.innerHTML=date

            let itemTitle = document.createElement('p')
            itemTitle.setAttribute('id','title')
            itemTitle.innerHTML= title.replace('-'," ")

            let completeItemButton = document.createElement('button')
            completeItemButton.setAttribute('id',title+'-complete-item-button')
            completeItemButton.setAttribute('class','complete-item-button')
            completeItemButton.innerHTML = "&#10003;"
            completeItemButton.style.borderColor = "var(--priority-"+priority+")"
            completeItemButton.style.color = "var(--priority-"+priority+")"

            let listItem = document.createElement('div')
            listItem.setAttribute('class','item')
            listItem.setAttribute('id',title+"-item")

            listItem.appendChild(completeItemButton)
            listItem.appendChild(itemTitle)
            listItem.appendChild(itemDate)
            listItem.appendChild(deleteItemButton)
            listItem.appendChild(itemNotes)



            let listItems = document.querySelector('.list-of-items')
            listItems.appendChild(listItem)
    }

    removeListItemRender(itemTitle){
        let listOfItems = document.querySelector(".list-of-items")
        let removedItem = document.querySelector("#"+itemTitle+"-item")

       listOfItems.removeChild(removedItem);
    }


    removeListRender(listName){
        let listOflists = document.querySelector("#list-of-lists")
        let removedList = document.querySelector("#"+listName+"-div")

       listOflists.removeChild(removedList);
    }

    taskCompletionRender(complete, remaining){  
        let tasksCompleted = document.querySelector('#tasks-completed')
        let tasksRemaining = document.querySelector('#tasks-remaining')

        tasksCompleted.innerHTML = complete
        tasksRemaining.innerHTML = remaining
    }



}


export{
    Render
}