// DIALOGBOX
/** @type { HTMLInputElement } */
const taskinput = document.querySelector("#taskinput");
/** @type { HTMLButtonElement } */
const addtask = document.querySelector("#addtask");

// TASKLIST
/** @type { HTMLUListElement } */
const tasklist = document.querySelector("#tasklist");

/** @type { HTMLLIElement } */
const taskitem = document.querySelector("#tasklist .task");
taskitem.style.display = "none";

// FUNÇÕES

/**
 * @param { string } name 
 * @param { boolean } state 
 */
function newTask(name, state = false) {
    /** @type { HTMLLIElement } */
    const newTask = taskitem.cloneNode(true);
    newTask.querySelector("span").textContent = name;
    newTask.querySelector("button").addEventListener("click", () => {
        newTask.remove();
    });
    const cbox = newTask.querySelector("input");
    const taskText = newTask.querySelector("span");
    const setState = () => {
        if (
            cbox.checked && 
            !taskText.classList.contains("completed")
        ) {
            taskText.classList.add("completed");
        } else if (
            !cbox.checked && 
            taskText.classList.contains("completed")
        ) {
            taskText.classList.remove("completed");
        }
    }
    cbox.addEventListener("change", (e) => {
        setState();
    });
    setState();
    cbox.checked = state;
    newTask.style.display = "flex";
    tasklist.appendChild(newTask);
    setInterval(setState, 100);
}
function addTask() {
    if (taskinput.value.trim() === "") return;
    newTask(taskinput.value.trim());
    taskinput.value = "";
}

addtask.addEventListener("click", addTask);
taskinput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

// STORAGE
function saveTasks() {
    const tasks = [];
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        const text = task.querySelector("span").textContent;
        const completed = task.querySelector("input").checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((task) => {
        newTask(task.text, task.completed);
    });  
}

window.addEventListener("beforeunload", saveTasks);
window.addEventListener("load", loadTasks);

// UTILS
/** @type { HTMLButtonElement } */
const clearcompleted = document.querySelector("#clearcompleted");
/** @type { HTMLButtonElement } */
const cleartasks = document.querySelector("#cleartasks");
/** @type { HTMLButtonElement } */
const markall = document.querySelector("#markall");
/** @type { HTMLButtonElement } */
const unmarkall = document.querySelector("#unmarkall");
/** @type { HTMLButtonElement } */
const toggleall = document.querySelector("#toggleall");
/** @type { HTMLButtonElement } */
const togglenext = document.querySelector("#togglenext");

clearcompleted.addEventListener("click", () => {
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        const cbox = task.querySelector("input");
        if (cbox.checked) {
            task.remove();
        }
    });
});

cleartasks.addEventListener("click", () => {
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        task.remove();
    });
});

markall.addEventListener("click", () => {
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        const cbox = task.querySelector("input");
        cbox.checked = true;
    });
});

unmarkall.addEventListener("click", () => {
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        const cbox = task.querySelector("input");
        cbox.checked = false;
    });
});

toggleall.addEventListener("click", () => {
    tasklist.querySelectorAll("li").forEach((task) => {
        if (task.style.display === "none") return;
        const cbox = task.querySelector("input");
        cbox.checked = !cbox.checked;
    });
});

togglenext.addEventListener("click", () => {
    const tasks = tasklist.querySelectorAll("li");
    const nextTask = Array.from(tasks).find((task) => {
        if (task.style.display === "none") return false;
        const cbox = task.querySelector("input");
        return !cbox.checked;
    });
    if (nextTask) {
        const cbox = nextTask.querySelector("input");
        cbox.checked = !cbox.checked;
    }
});