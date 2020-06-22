// class, constructor and methods from individual list items (objects)
class ListItem {
    constructor(title,description,dueDate,priority,notes,list){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.notes = notes
        this.list = list
    }
    logTitle(){
        console.log(this.title)
    }
    logDesc(){
        console.log(this.description)
    }
    logDate(){
        console.log(this.dueDate)
    }
    logPriority(){
        console.log(this.priority)
    }
    logNotes(){
        console.log(this.notes)
    }

    
}

export{
    ListItem
}