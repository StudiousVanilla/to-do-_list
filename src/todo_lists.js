// class, constructor and methods for the discrete To-Do lists/projects
class TodoList {
    constructor(name,items){
        this.name = name
        this.items = items
    }

    // adds an item to the To-Do list
    addItemToList(listItem){
        this.items.push(listItem)
    }
    // sort To-Do list by property
    sortListByProperty(property){
        this.items.sort((a, b) => a[property] > b[property] ? 1 : -1);
    }

    // creates a new array removing the item whose title matches the 'title' parameter
    deleteItemFromList(title){
        return this.items.filter(function(item){
            if(item["title"] !== title){
                return true
            }
        })
    }

    // sets the value of the orignal array to the new array generated from 'deleteItemFromList()' which will have desired items removed
    filterOutItem(title){
        this.items = this.deleteItemFromList(title)
    }

    // still needs logic *************
    completeList(){

        // still needs logic *************

        console.log("You completed this list: "+this.name)
        return this.name
    }

}

export{
    TodoList
}