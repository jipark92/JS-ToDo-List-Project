const createHTML = (()=>{
    const container = document.querySelector('.container');
    container.innerHTML = 
    `
    <!-- start -->
    <header class="title">
        <h1>My To-DO List</h1>
    </header>
    <div class="sidebar">
        <h2>Projects</h2>
        <p>Example Project</p>
        <p>Example Project</p>
        <p>Example Project</p>
        <p>Example Project</p>
        <p>Example Project</p>
        <p>Example Project</p>
        <button class="add-task-btn">ADD PROJECT</button>
    </div>
    <div class="content">
        <!-- start -->
        <div class="task">
            <div class="task-name">
                <p>Example testing</p>
            </div>
            <div class="details">
                <button>details</button>
            </div>
            <div class="date">
                <p>date</p>
            </div>
            <div class="btn-container">
                <button class="edit">edit</button>
                <button class="delete">delete</button>
                <input type="checkbox">Complete</input>
            </div>
        </div>
        <button class="new-task-btn">New Task</button>
    </div>
    <!-- end -->
    `;
});

window.addEventListener('DOMContentLoaded',()=>{
    createHTML();
})



