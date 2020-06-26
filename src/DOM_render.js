class Render{
    constructor(){
        
    }

    // the logic for rendering lists to the home page
    renderHomeLogic(name,priority,numberOfTasks){
        let container = document.querySelector("#list-of-lists")

        let listName = document.createElement('li')
        listName.setAttribute('class','list-name')
        listName.setAttribute('id',name)
        listName.innerHTML = name
        listName.style.borderColor = "var(--priority-"+priority+")"

        let hexagon = document.createElement("div")
        hexagon.setAttribute('class',"hexagon")
        hexagon.setAttribute('id',name)

        let taskNumber = document.createElement("div")
        taskNumber.setAttribute('class','task-numbers')
        taskNumber.setAttribute('id',name)
        taskNumber.innerHTML = numberOfTasks
        hexagon.appendChild(taskNumber)

        let listHolderDiv = document.createElement("div")
        listHolderDiv.setAttribute('class','list-holder')
        listHolderDiv.setAttribute('id',name)

        listHolderDiv.appendChild(hexagon)
        listHolderDiv.appendChild(listName)
        container.appendChild(listHolderDiv)

        
 
    }

    // called once the new list button is clicked, or upon returning to the homepage
    renderLists(lists){
        let container = document.querySelector("#list-of-lists")
        container.innerHTML = "";
        for (const list of lists){
            this.renderHomeLogic(list["name"],list["priority"],list["items"].length)
        }
    }

    // populates blank container
    rednerOneListItem(title,date,notes,priority){
        
        let itemNotes = document.createElement('p')
        itemNotes.setAttribute('id','notes')
        itemNotes.innerHTML=notes

        let deleteItemButton = document.createElement('button')
        deleteItemButton.setAttribute('id','delete-item-button')
        deleteItemButton.innerHTML = "X"

        let itemDate = document.createElement('p')
        itemDate.setAttribute('id','date')
        itemDate.innerHTML=date

        let itemTitle = document.createElement('p')
        itemTitle.setAttribute('id','title')
        itemTitle.innerHTML= title

        let completeItemButton = document.createElement('button')
        completeItemButton.setAttribute('id','complete-item-button')
        completeItemButton.innerHTML = "&#10003;"
        completeItemButton.style.borderColor = "var(--priority-"+priority+")"
        completeItemButton.style.color = "var(--priority-"+priority+")"

        let listItem = document.querySelector('.list-of-items')


        listItem.appendChild(completeItemButton)
        listItem.appendChild(itemTitle)
        listItem.appendChild(itemDate)
        listItem.appendChild(deleteItemButton)
        listItem.appendChild(itemNotes)



    }



}


export{
    Render
}