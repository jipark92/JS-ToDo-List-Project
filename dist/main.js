//add task later
const taskFactory = (id, title) => {
    return {id, title};
};

//submission module
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
            console.log(taskList );
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
    return {taskList, taskID};
})();

//create html module
const createTaskHTML = (()=>{   
    const makeTaskBar = () => {
        //create container
        const taskListContainer = document.querySelector('.task-list');
        const liTaskContainer = document.createElement('li');
        liTaskContainer.setAttribute('class', 'tasks');
        taskListContainer.appendChild(liTaskContainer);
        for (let i = 0; i < addTaskToList.taskList.length;i++){
            liTaskContainer.setAttribute('id', `${addTaskToList.taskList[i].id}`)
        }
        const contID = liTaskContainer.getAttribute('id', addTaskToList.taskList.id)
        //create title
        const taskTitle = document.createElement('input');
        taskTitle.setAttribute('class', 'task-name');
        // taskTitle.setAttribute('value', 'Example Task');
        taskTitle.setAttribute('type', 'text');
        taskTitle.classList.add('disabled');
        liTaskContainer.appendChild(taskTitle);

        //create buttons
        const btnsContainer = document.createElement('div');
        btnsContainer.setAttribute('class', 'btn-container');
        liTaskContainer.appendChild(btnsContainer);

        const editBtns = document.createElement('button');
        editBtns.setAttribute('class', 'edit-btn');
        btnsContainer.appendChild(editBtns);
        editBtns.textContent = "EDIT";

        const toDoBtns = document.createElement('button');
        toDoBtns.setAttribute('class', 'todo-btn');
        btnsContainer.appendChild(toDoBtns);
        toDoBtns.textContent = "TODO";

        const deleteBtns = document.createElement('button');
        deleteBtns.setAttribute('class', 'delete-btn');
        btnsContainer.appendChild(deleteBtns);
        deleteBtns.textContent = "DELETE";

        //call functions from other modules
        titleToTaskName(taskTitle);
        buttonFunctions.deleteFunction(deleteBtns,liTaskContainer, taskTitle);
        buttonFunctions.editFunction(editBtns, taskTitle, contID);
        buttonFunctions.toDoFunction(toDoBtns);
        // console.log(addTaskToList.taskList)
    };

    const titleToTaskName = (taskTitle) => {
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            taskTitle.value  = addTaskToList.taskList[i].title;
        }
    };
    return {makeTaskBar, titleToTaskName};
})();

//button module
const buttonFunctions = (()=>{
    const deleteFunction = (deleteBtns, liTaskContainer,taskTitle) => {
        deleteBtns.addEventListener('click', ()=>{
            liTaskContainer.remove();
            alterObjects.deleteObject(taskTitle);
        })
    };

    const toDoFunction = (toDoBtns) => {
        toDoBtns.addEventListener('click', ()=>{
            console.log('todo');
        })
    };

    const editFunction = (editBtns, taskTitle, contID) => {
            let editSave = false;
            editBtns.addEventListener('click', ()=>{
                if (!editSave){
                    editSave = true;
                    taskTitle.classList.remove('disabled');
                    editBtns.textContent = "SAVE";
                } else if (editSave){
                    editSave = false;
                    editBtns.textContent = "EDIT";
                    taskTitle.classList.add('disabled');
                    alterObjects.editObjectTitle(taskTitle, contID);
                }
            })
    };
    return {deleteFunction, toDoFunction, editFunction};
})();

//changing object module
const alterObjects = (() =>{
    const deleteObject = (taskTitle) => {        
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            if (taskTitle.value === addTaskToList.taskList[i].title){
                addTaskToList.taskList.splice(i,1);
                console.log(addTaskToList.taskList)
            }
        }
    }
    //work on changing object title for each.
    const editObjectTitle = (taskTitle, contID) => {
        let newContID = parseInt(contID);
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            if (newContID === addTaskToList.taskList[i].id){
                addTaskToList.taskList[i].title = taskTitle.value;
                console.log(addTaskToList.taskList);
            }
        }
        console.log(newContID)
    };
    return {deleteObject, editObjectTitle};
})();


// for (let i = 0; i < addTaskToList.taskList.length; i++){
//     if (taskTitle.value === addTaskToList.taskList[i].id){
//         addTaskToList.taskList[i].title = taskTitle.value;
//         console.log(addTaskToList.taskList);
//     }
// }