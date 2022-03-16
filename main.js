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

//variables
let ID = 0;


//add project
const addProject = () =>{
    addProjectBtn.addEventListener('click',()=>{
        
        const newProjectName = projectNameFactory(ID++, projectNameInput.value);
        projectList.push(newProjectName)

        const listElement = document.createElement('li')
        listElement.setAttribute('class', 'project-name');
        projectListContainer.appendChild(listElement);
        
        selectProject(listElement);

        for (let i = 0; i < projectList.length; i++){
            listElement.textContent = projectList[i].title;
        }

        
        console.log(projectList)
    })
};
addProject();


//html querySelectors
const projectNameList = document.querySelectorAll('.project-name');

//select project
const selectProject = (elements) => {
    elements.addEventListener('click',()=>{
        console.log('clicked', projectList)
        elements.style.color = "white";
    })
};


















// start addTaskModule
const newTaskBtn = document.querySelector('.new-task-btn');


const addTask = () => {

};
//end addTaskModule


