let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoIn = document.getElementById("todoIn");
const todoLi = document.getElementById("todoLi");
const todoCount = document.getElementById("todoCount");
const addBtn = document.querySelector(".btn");
const deleteBtn = document.getElementById("deleteBtn");

document.addEventListener("DOMContentLoaded", function(){
    addBtn.addEventListener("click", addTask);
    todoIn.addEventListener("keydown", function(event){
        if (event.key === "Enter"){
            event.preventDefault();
            addTask();
        }
    });
    deleteBtn.addEventListener("click", deleteAll);
    displayTasks();
});

function addTask(){
    const newTask = todoIn.value.trim();
    if (newTask !== ""){
        todo.push({
            text: newTask,
            disabled: false,
        });
        saveToLocalStorage();
        todoIn.value = "";
        displayTasks();
    }
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}

function displayTasks() {
    todoLi.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-con">
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
            <span id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text}</span>
        </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoLi.appendChild(p);
    });
    todoCount.textContent = todo.length;
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const exist = todo[index].text;
    const inpEl = document.createElement("input");

    inpEl.value = exist;
    inpEl.setAttribute("id", `input-edit-${index}`);
    todoItem.replaceWith(inpEl);
    inpEl.focus();
    inpEl.addEventListener("blur", function(){
        const newText = inpEl.value.trim();
        if (newText){
            todo[index].text = newText;
            saveToLocalStorage();
        }
        displayTasks();
    });
    inpEl.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            inpEl.blur();
        }
    });
}

function toggleTask(index){
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAll() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}
