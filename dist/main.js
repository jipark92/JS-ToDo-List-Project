const taskFactory = (id, title, tasks) => {
    return {id, title,tasks}
};



const addTaskToList = (()=>{
    const addTaskBtns = document.querySelector('.add-task-btn')
    const taskInput = document.querySelector('.task-input')
    let taskID = 0
    let taskList = [];

    const submitTask = () => {
        addTaskBtns.addEventListener('click', (e)=>{
            e.preventDefault();
            if (taskInput.value === "") return;
            pushTasktoTaskList();
            emptyInput();
            createTaskHTML.makeContainer();
            createTaskHTML.makeTitle();
            createTaskHTML.makeButtons();
            console.log('click', taskID,taskList );
        })
    }
    submitTask();


    const emptyInput = () =>{
        setTimeout(() => {
            taskInput.value = "";
        }, 0);
    }

    const pushTasktoTaskList = () => {
        const newTask = taskFactory(taskID++, taskInput.value )
        taskList.push(newTask);
    }

})();







const createTaskHTML = (()=>{   

    const makeContainer = () =>{
        const taskListContainer = document.querySelector('.task-list');
        const litaskContainer = document.createElement('li');
        litaskContainer.setAttribute('class', 'tasks');
        taskListContainer.appendChild(litaskContainer)
    } 

    const makeTitle = () => {
        const taskContainer = document.querySelector('.tasks')
        const taskTitle = document.createElement('input');
        taskTitle.setAttribute('class', 'task-name');
        taskTitle.setAttribute('value', 'Example Task');
        taskTitle.setAttribute('type', 'text');
        taskContainer.appendChild(taskTitle);
    }

    const makeButtons = () => {
        const taskContainer = document.querySelector('.tasks')
        const btnsContainer = document.createElement('div');
        btnsContainer.setAttribute('class', 'btn-container');
        taskContainer.appendChild(btnsContainer);

        const editBtns = document.createElement('button');
        editBtns.setAttribute('class', 'edit-btn');
        btnsContainer.appendChild(editBtns);
        editBtns.textContent = "EDIT";

        const deleteBtns = document.createElement('button');
        deleteBtns.setAttribute('class', 'delete-btn');
        btnsContainer.appendChild(deleteBtns);
        deleteBtns.textContent = "DELETE";
    }
    
    return {makeContainer, makeTitle, makeButtons}
})();















// console.log('click', taskID,taskList );
