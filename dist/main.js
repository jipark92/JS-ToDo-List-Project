// import { addDays} from 'date-fns';


//add task later
const taskFactory = (id, title, task) => {
    return {id, title, task};
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
        taskTitle.setAttribute('type', 'text');
        taskTitle.classList.add('disabled');
        liTaskContainer.appendChild(taskTitle);

        //create buttons
        const btnsContainer = document.createElement('div');
        btnsContainer.setAttribute('class', 'btn-container');
        liTaskContainer.appendChild(btnsContainer);

        //make todo button
        const toDoBtns = document.createElement('button');
        toDoBtns.setAttribute('class', 'todo-btn');
        btnsContainer.appendChild(toDoBtns);
        toDoBtns.textContent = "TODO";

        //make edit button
        const editBtns = document.createElement('button');
        editBtns.setAttribute('class', 'edit-btn');
        btnsContainer.appendChild(editBtns);
        editBtns.textContent = "EDIT";

        //make delete button
        const deleteBtns = document.createElement('button');
        deleteBtns.setAttribute('class', 'delete-btn');
        btnsContainer.appendChild(deleteBtns);
        deleteBtns.textContent = "DELETE";

        //make modal box
        const modalBox = document.createElement('div');
        modalBox.setAttribute('class', 'modal');
        taskListContainer.appendChild(modalBox)

        //make description input
        const description = document.createElement('textarea')
        description.setAttribute('class', 'description-box')
        description.setAttribute('placeholder', 'your description here');
        modalBox.appendChild(description)

        //due date 
        const dueDate = document.createElement('p');
        dueDate.setAttribute('class', 'due-date')
        dueDate.textContent = "Due Date"
        modalBox.appendChild(dueDate)

        //priority level drop down menu
        const priorityLevel = document.createElement('select');
        priorityLevel.setAttribute('class', 'priority')
        modalBox.appendChild(priorityLevel)

        //level low
        const priorityLevelSelect = document.createElement('option');
        priorityLevelSelect.setAttribute('value', 'Low')
        priorityLevelSelect.textContent = "Low"
        priorityLevel.appendChild(priorityLevelSelect)

        //level mid
        const priorityLevelSelectMid = document.createElement('option');
        priorityLevelSelectMid.setAttribute('value', 'Mid')
        priorityLevelSelectMid.textContent = "Mid"
        priorityLevel.appendChild(priorityLevelSelectMid)

        //level hard
        const priorityLevelSelectHigh = document.createElement('option');
        priorityLevelSelectHigh.setAttribute('value', 'High')
        priorityLevelSelectHigh.textContent = "High"
        priorityLevel.appendChild(priorityLevelSelectHigh)

        //close modal
        const closeModalBtns = document.createElement('button');
        closeModalBtns.setAttribute('class','close-modal-btn')
        closeModalBtns.textContent = "Save & Hide"
        modalBox.appendChild(closeModalBtns);

        //call functions from other modules
        titleToTaskName(taskTitle);
        buttonFunctions.deleteFunction(deleteBtns,liTaskContainer, taskTitle, modalBox);
        buttonFunctions.editFunction(editBtns, taskTitle, contID);
        buttonFunctions.toDoFunction(toDoBtns, modalBox, closeModalBtns);
        buttonFunctions.closeModal(modalBox, closeModalBtns)

        // console.log(addTaskToList.taskList)
    };

    const titleToTaskName = (taskTitle) => {
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            taskTitle.value  = addTaskToList.taskList[i].title;
        }
    };
    return {makeTaskBar, titleToTaskName};
})();

const buttonFunctions = (()=>{
    const deleteFunction = (deleteBtns, liTaskContainer,taskTitle, modalBox) => {
        deleteBtns.addEventListener('click', ()=>{
            liTaskContainer.remove();
            modalBox.remove();
            alterObjects.deleteObject(taskTitle);
        })
    };

    const toDoFunction = (toDoBtns,modalBox, closeModalBtns) => {
        toDoBtns.addEventListener('click', ()=>{
            modalBox.style.visibility = "visible"
        })
    };

    const closeModal = (modalBox,closeModalBtns) => {
        closeModalBtns.addEventListener('click',()=>{
            modalBox.style.visibility = "hidden"
        })
    }

    const editFunction = (editBtns, taskTitle, contID) => {
            let editSave = false;
            editBtns.addEventListener('click', ()=>{
                if (!editSave){
                    editSave = true;
                    taskTitle.classList.remove('disabled');
                    editBtns.textContent = "SAVE";
                    taskTitle.style.border = "2px solid green"
                } else if (editSave){
                    editSave = false;
                    editBtns.textContent = "EDIT";
                    taskTitle.classList.add('disabled');
                    alterObjects.editObjectTitle(taskTitle, contID);
                    taskTitle.style.border = ""
                }
            })
    };
    return {deleteFunction, toDoFunction, closeModal, editFunction};
})();

const alterObjects = (() =>{
    const deleteObject = (taskTitle) => {        
        for (let i = 0; i < addTaskToList.taskList.length; i++){
            if (taskTitle.value === addTaskToList.taskList[i].title){
                addTaskToList.taskList.splice(i,1);
                console.log(addTaskToList.taskList)
            }
        }
    };

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

// const closeModal = (modal) => {
//     const closeModalBtns = document.querySelector('.close-btn');
//     closeModalBtns.addEventListener('click', ()=>{
//         modal.style.visibility = "hidden";
//     })
// }

// const toDoFunction = (toDoBtns) => {
//     const modal = document.querySelector('.modal');
//     toDoBtns.addEventListener('click', ()=>{
        
//         modal.style.visibility = "visible";
//         closeModal(modal);
//     })
// };