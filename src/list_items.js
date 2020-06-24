// class, constructor and methods from individual list items (objects)
class ListItem {
    constructor(list,title,notes,dueDate,priority){
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.priority = priority
        this.list = list
    }
    // logic for editing an item in list, only assigns new values if there is an actual new value
    editItem(newList,newTitle,newNotes,newDueDate,newPriority){
        if(newList!=null && newList!=""){
            this.list = newList
       } 
        if(newTitle!=null && newTitle!=""){
            this.title = newTitle;
        }
        if(newNotes!=null && newNotes!=""){
            this.description = newNotes
        }
        if(newDueDate!=null && newDueDate!=""){
            this.dueDate = newDueDate
        }
        if(newPriority!=null && newPriority!=""){
            this.priority = newPriority
        }
    }

    // still needs logic ****************
    completeItem(){

        // still needs logic

        console.log("You completed this task: "+this.title)
        return this.title
    }

}

export{
    ListItem
}