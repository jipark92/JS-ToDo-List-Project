//object creation factory
const projectNameFactory = (id, title, task) => {
    return {id, title,task};
};

const taskInfoFactory = (description, dueDate, priority) => {
    return {description, dueDate, priority};
};


//project array
let projectList = [];

//html querySelectors
const projectListContainer = document.querySelector('.project-list');
const addProjectBtn = document.querySelector('.add-project-btn')
const projectNameInput = document.querySelector('.project-name-input');
const newTaskBtns = document.querySelector('.new-task-btn');


//variables
let ID = 0;


//add project
const addProject = () =>{
    addProjectBtn.addEventListener('click',()=>{
        if (projectNameInput.value === "") return;
        
        const newProjectName = projectNameFactory(ID++, projectNameInput.value);
        projectList.push(newProjectName)

        const listElement = document.createElement('li')
        listElement.setAttribute('class', 'project-name');
        projectListContainer.appendChild(listElement);
        
        selectProject(listElement);

        for (let i = 0; i < projectList.length; i++){
            listElement.textContent = projectList[i].title;
        }

        newTaskBtns.style.visibility = "visible";
        console.log(projectList)
    })
};
addProject();

//===============================================================
//html querySelectors
const projectNameList = document.querySelectorAll('.project-name');

//select project
const selectProject = (elements) => {
    elements.addEventListener('click',()=>{
        elements.style.color = "white";
    })
};


//=================================================================




// start addTaskModule
    newTaskBtns.addEventListener('click',()=>{
        makeTaskBar();
        
    })



//make task bar
const makeTaskBar = () =>{
        const contentContainer = document.querySelector('.content');

        const taskContainer = document.createElement('div');
        taskContainer.setAttribute('class', 'task');
        contentContainer.appendChild(taskContainer)

        const title = document.createElement('p');
        title.setAttribute('class', 'title');
        taskContainer.appendChild(title);
        taskContainer.textContent = "example";

        const detail = document.createElement('button');
        detail.setAttribute('class', 'detail');
        taskContainer.appendChild(detail);
        detail.textContent = "detail"

        const dates = document.createElement('p');
        dates.setAttribute('class', 'date');
        taskContainer.appendChild(dates);
        dates.textContent = "date"

        const editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'edit');
        taskContainer.appendChild(editBtn);
        editBtn.textContent = "edit"

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'delete');
        taskContainer.appendChild(deleteBtn);
        deleteBtn.textContent = "delete";

        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox')
        checkBox.setAttribute('class', 'checkbox');
        taskContainer.appendChild(checkBox);

        const checkBoxText = document.createElement('p');
        checkBoxText.setAttribute('class','check-box-text');
        taskContainer.appendChild(checkBoxText);
        checkBoxText.textContent = "complete"


};
