const taskFactory = (id, title, detail, date, priority, isComplete ) => {
    return {id, title, detail, date, priority, isComplete};
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
        const newTask = taskFactory(taskID++, taskInput.value, "", "", "");
        taskList.push(newTask);
    };

    const pushInformation = (closeModalBtns, description,dueDate,priorityLevel, contID) => {
        
        
        closeModalBtns.addEventListener('click', ()=>{
            console.log(taskList);
            let newContID = parseInt(contID);
            for (let i = 0;i <taskList.length; i++){
                if ( newContID === taskList[i].id){
                    taskList[i].detail = dueDate.value;
                    taskList[i].date = priorityLevel.value;
                    taskList[i].priority = description.value;
                }
            }
        })
    };

    const isChecked = (check, checkText,contID) => {
        let checkedBox = check.checked
        console.log(checkedBox);
        check.addEventListener('click',()=>{
            let newContID = parseInt(contID);
            for (let i = 0; i < taskList.length; i++){
                if (newContID === taskList[i].id){
                    if (!checkedBox){
                        checkText.textContent = "Complete"
                        checkedBox = true;
                        taskList[i].isComplete = checkedBox;
                        console.log(checkedBox)
                        console.log(taskList)
                    } else {
                        checkText.textContent = "Incomplete"
                        checkedBox = false;
                        taskList[i].isComplete = checkedBox;
                        console.log(checkedBox)
                        console.log(taskList)
                    }
                }
            }
        })
    }
    
    return {taskList, taskID, pushInformation, isChecked};
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
        const contID = liTaskContainer.getAttribute('id', addTaskToList.taskList.id);

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
        taskListContainer.appendChild(modalBox);

        //make description/month/priorty div container
        const descriptionCont = document.createElement('div');
        descriptionCont.setAttribute('class','desc-container')
        modalBox.appendChild(descriptionCont);

        const dateCont = document.createElement('div');
        dateCont.setAttribute('class','date-container');
        modalBox.appendChild(dateCont);

        const priorityCont = document.createElement('div');
        priorityCont.setAttribute('class','priority-container');
        modalBox.appendChild(priorityCont);

        const checkCont = document.createElement('div');
        checkCont.setAttribute('class','check-container');
        modalBox.appendChild(checkCont);

        //make text 
        const descText = document.createElement('p');
        descText.setAttribute('class','desc-text');
        descriptionCont.appendChild(descText);
        descText.textContent = "Detail: ";

        const dateText = document.createElement('p');
        dateText.setAttribute('class','date-text');
        descriptionCont.appendChild(dateText);
        dateCont.textContent = "Due Date: ";

        const priorityText = document.createElement('p')
        priorityText.setAttribute('class','priority-text');
        descriptionCont.appendChild(priorityText);
        priorityCont.textContent = "Priority Level: ";

        const checkText = document.createElement('p')
        checkText.setAttribute('class','check-text');
        checkCont.appendChild(checkText);
        checkText.textContent = "Incomplete: ";

        //make description input
        const description = document.createElement('textarea');
        description.setAttribute('class', 'description-box');
        description.setAttribute('placeholder', 'your description here');
        descriptionCont.appendChild(description);

        //due date 
        const dueDate = document.createElement('input');
        dueDate.setAttribute('class', 'due-date');
        dueDate.setAttribute('type', 'date');
        dateCont.appendChild(dueDate);

        //priority level drop down menu
        const priorityLevel = document.createElement('select');
        priorityLevel.setAttribute('class', 'priority');
        priorityCont.appendChild(priorityLevel);

        //level low
        const priorityLevelSelect = document.createElement('option');
        priorityLevelSelect.setAttribute('value', 'Low');
        priorityLevelSelect.textContent = "Low";
        priorityLevel.appendChild(priorityLevelSelect);

        //level mid
        const priorityLevelSelectMid = document.createElement('option');
        priorityLevelSelectMid.setAttribute('value', 'Mid');
        priorityLevelSelectMid.textContent = "Mid";
        priorityLevel.appendChild(priorityLevelSelectMid);

        //level high
        const priorityLevelSelectHigh = document.createElement('option');
        priorityLevelSelectHigh.setAttribute('value', 'High');
        priorityLevelSelectHigh.textContent = "High";
        priorityLevel.appendChild(priorityLevelSelectHigh);

        //checkbox
        const check = document.createElement('input');
        check.setAttribute('class', 'check-box');
        check.setAttribute('type', 'checkbox');
        checkCont.appendChild(check);

        //close modal
        const closeModalBtns = document.createElement('button');
        closeModalBtns.setAttribute('class','close-modal-btn');
        closeModalBtns.textContent = "Save & Hide";
        modalBox.appendChild(closeModalBtns);

        //call functions from other modules
        titleToTaskName(taskTitle);
        buttonFunctions.deleteFunction(deleteBtns,liTaskContainer, taskTitle, modalBox);
        buttonFunctions.editFunction(editBtns, taskTitle, contID);
        buttonFunctions.toDoFunction(toDoBtns, modalBox, closeModalBtns);
        buttonFunctions.closeModal(modalBox, closeModalBtns);
        addTaskToList.pushInformation(closeModalBtns, priorityLevel, description,dueDate, contID);
        addTaskToList.isChecked(check, checkText, contID)
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
            modalBox.style.visibility = "visible";
        })
    };

    const closeModal = (modalBox,closeModalBtns) => {
        closeModalBtns.addEventListener('click',()=>{
            modalBox.style.visibility = "hidden";
        })
    }

    const editFunction = (editBtns, taskTitle, contID) => {
            let editSave = false;
            editBtns.addEventListener('click', ()=>{
                if (!editSave){
                    editSave = true;
                    taskTitle.classList.remove('disabled');
                    editBtns.textContent = "SAVE";
                    taskTitle.style.border = "2px solid green";
                } else if (editSave){
                    editSave = false;
                    editBtns.textContent = "EDIT";
                    taskTitle.classList.add('disabled');
                    alterObjects.editObjectTitle(taskTitle, contID);
                    taskTitle.style.border = "";
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
                console.log(addTaskToList.taskList);
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
        // console.log(newContID)
    };
    return {deleteObject, editObjectTitle};
})();