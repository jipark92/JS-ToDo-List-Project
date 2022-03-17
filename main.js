const taskFactory = (id, title, tasks) => {
    return {id, title,tasks};
};

const addTaskToList = (()=>{
    
    const addTaskBtns = document.querySelector('.add-task-btn');
    const taskInput = document.querySelector('.task-input');
    let taskID = 0;
    let taskList = [];

    const submitTask = () => {
        addTaskBtns.addEventListener('click', (e)=>{
            e.preventDefault();
            if (taskInput.value === "") return;
            pushTasktoTaskList();
            emptyInput();
            createTaskHTML.makeTaskBar();
            console.log('click', taskID,taskList );
        })
    }
    submitTask();

    const emptyInput = () =>{
        setTimeout(() => {
            taskInput.value = "";
        }, 0);
    };

    const pushTasktoTaskList = () => {
        const newTask = taskFactory(taskID++, taskInput.value);
        taskList.push(newTask);
    };

    return {taskList}
})();

const createTaskHTML = (()=>{   

    const makeTaskBar = () => {
        //create container
        const taskListContainer = document.querySelector('.task-list');
        const liTaskContainer = document.createElement('li');
        liTaskContainer.setAttribute('class', 'tasks');
        taskListContainer.appendChild(liTaskContainer);

        //create title
        const taskTitle = document.createElement('input');
        taskTitle.setAttribute('class', 'task-name');
        taskTitle.setAttribute('value', 'Example Task');
        taskTitle.setAttribute('type', 'text');
        liTaskContainer.appendChild(taskTitle);

        //create buttons
        const btnsContainer = document.createElement('div');
        btnsContainer.setAttribute('class', 'btn-container');
        liTaskContainer.appendChild(btnsContainer);

        const editBtns = document.createElement('button');
        editBtns.setAttribute('class', 'edit-btn');
        btnsContainer.appendChild(editBtns);
        editBtns.textContent = "EDIT";

        const deleteBtns = document.createElement('button');
        deleteBtns.setAttribute('class', 'delete-btn');
        btnsContainer.appendChild(deleteBtns);
        deleteBtns.textContent = "DELETE";

        //call functions from other modules
        titleToTaskName(taskTitle);
        buttonFunctions.deleteFunction();
        buttonFunctions.editFunction();
    };

    const titleToTaskName = (taskTitle) => {
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            taskTitle.value  = addTaskToList.taskList[i].title;
        }
    };
    
    return {makeTaskBar, titleToTaskName};
})();


const buttonFunctions = (()=>{

    const deleteFunction = () => {
        const deleteBtns = document.querySelector('.delete-btn');
        deleteBtns.addEventListener('click', ()=>{
            console.log('deleted');
        })
    };

    const editFunction = () => {
        const editBtns = document.querySelector('.edit-btn');
        editBtns.addEventListener('click', ()=>{
            console.log('edited');
        })

    };

    return {deleteFunction, editFunction};

})();