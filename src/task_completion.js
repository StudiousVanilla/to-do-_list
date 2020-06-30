class TaskCompletion{
    constructor (tasksCompleted, tasksUncompleted){
        this.tasksCompleted = tasksCompleted
        this.tasksUncompleted = tasksUncompleted
    }

    // increase tasks completed
    taskCompleted(){
        this.tasksCompleted++
        this.tasksUncompleted--
    }

    // increase tasks uncompleted
    taskCreated(){
        this.tasksUncompleted++
    }

    taskDeleted(){
        this.tasksUncompleted--
    }
}

export{
    TaskCompletion
}