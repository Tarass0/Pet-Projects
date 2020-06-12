const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: false,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: false,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu llalalalalalalllal lalallala."
  }
];

(function(arrOfTasks) {
  let objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});
  //---------------------------------------------------
  const themes = {
    default: {
      "--base-text-color": "#212529",
      "--header-bg": "#007bff",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#007bff",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#0069d9",
      "--default-btn-border-color": "#0069d9",
      "--danger-btn-bg": "#dc3545",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#bd2130",
      "--danger-btn-border-color": "#dc3545",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#80bdff",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
    },
    dark: {
      "--base-text-color": "#212529",
      "--header-bg": "#343a40",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#58616b",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#292d31",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#b52d3a",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#88222c",
      "--danger-btn-border-color": "#88222c",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
    },
    light: {
      "--base-text-color": "#212529",
      "--header-bg": "#fff",
      "--header-text-color": "#212529",
      "--default-btn-bg": "#fff",
      "--default-btn-text-color": "#212529",
      "--default-btn-hover-bg": "#e8e7e7",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#f1b5bb",
      "--danger-btn-text-color": "#212529",
      "--danger-btn-hover-bg": "#ef808a",
      "--danger-btn-border-color": "#e2818a",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
    }
  };
  let lastSelectedTheme = localStorage.getItem("app_theme") || "default";
  // Element UI
  let listContainer = document.querySelector(".tasks-list-section .list-group");
  let form = document.forms["addTask"];
  let inputTitle = form.elements["title"];
  let inputBody = form.elements["body"];
  let themeSelect = document.getElementById("themeSelect");

  templateBthsShowingDifferentTasks();
  let showNotCompletedTasksBth = document.getElementById(
    "show-not-completed-btn"
  );
  let showAllTasksBth = document.getElementById("show-all-task-btn");
  //---------------------------------------------------
  //Events
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  addTaskFromLocalStorage();

  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);
  listContainer.addEventListener("click", onCompleteHandler);
  showNotCompletedTasksBth.addEventListener(
    "click",
    onNotCompletedTasksBthHandler
  );
  showAllTasksBth.addEventListener("click", onAllTasksBthHandler);
  themeSelect.addEventListener("change", onThemeSelectHandler);

  //--------------------------------------------------- Перебір всіх задач та cтворення шаблону задачі

  function renderAllTasks(tasks) {
    let fragment = document.createDocumentFragment();
    Object.values(tasks).forEach(task => {
      let li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = {}) {
    let li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);

    let span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    let p = document.createElement("p");
    p.classList.add("mt-2", "w-100");
    p.textContent = body;

    let deleteBth = document.createElement("button");
    deleteBth.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");
    deleteBth.textContent = "Delete task";

    let completedBtn = templateCompleteBth();

    li.appendChild(span);
    li.appendChild(deleteBth);
    li.appendChild(completedBtn);
    li.appendChild(p);

    return li;
  }
  //--------------------------------------------------- Cтворення нової задачі
  function onFormSubmitHandler(e) {
    e.preventDefault();
    let titleValue = inputTitle.value;
    let bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert("Введіть title i body!");
      return;
    }
    let task = createNewTask(titleValue, bodyValue);
    let listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset(); // очищає форму
    deleteTemplateAboutEmptyList();
  }

  function createNewTask(title, body) {
    let newTask = {
      _id: `task-${Math.random()}`,
      title,
      body,
      completed: false
    };
    objOfTasks[newTask._id] = newTask;
    localStorage.setItem(newTask._id, JSON.stringify(newTask)); //запис в localStorage
    return { ...newTask };
  }

  //--------------------------------------------------- Видалення задачі
  function deleteTask(id) {
    let { title } = objOfTasks[id];
    let isConfirm = confirm(`Точно видати цю задачу ${title}?`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, element) {
    if (!confirmed) return;
    element.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      let parent = target.closest("[data-task-id]");
      let id = parent.dataset.taskId;
      let confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      isEmptyListTask(objOfTasks);
      deleteTaskFromLocalStorage(id);
    }
  }
  //--------------------------------------------------- Вивід повідомленя про пустий TaskList
  function templateAboutEmptyList() {
    let span = document.createElement("span");
    span.textContent = "Ваш TaskList пустий";
    span.style.fontSize = "25px";
    span.style.color = "red";
    return span;
  }

  function deleteTemplateAboutEmptyList() {
    if (listContainer.getAttribute("id") === "empty") {
      listContainer.lastChild.remove();
      listContainer.setAttribute("id", "not-empty");
    }
  }

  function isEmptyListTask(obj) {
    if (JSON.stringify(obj) === "{}") {
      let emptyTemplate = templateAboutEmptyList();
      listContainer.appendChild(emptyTemplate);
      listContainer.setAttribute("id", "empty");
    }
  }
  //--------------------------------------------------- Виконання завдання
  function templateCompleteBth() {
    let completedBth = document.createElement("button");
    completedBth.classList.add("btn", "btn-success", "completed-btn");
    completedBth.textContent = "Compled Task";
    return completedBth;
  }

  function completeTaskOrRenew(id, parent) {
    if (!objOfTasks[id].completed) {
      objOfTasks[id].completed = true;
      parent.style.background = "#97e397";
      listContainer.insertAdjacentElement("beforeend", parent);
      console.log(objOfTasks[id]);
    } else if (objOfTasks[id].completed) {
      objOfTasks[id].completed = false;
      parent.style.background = "";
      listContainer.insertAdjacentElement("afterbegin", parent);
      console.log(objOfTasks[id]);
    }
  }

  function checkIsListInStateShowNotCompletedTasks(task) {
    if (listContainer.dataset.stateList === "show-not-completed-tasks") {
      task.classList.remove("d-flex");
      task.style.display = "none";
    }
  }

  function onCompleteHandler({ target }) {
    if (target.classList.contains("completed-btn")) {
      let parent = target.closest("[data-task-id]");
      let id = parent.dataset.taskId;
      console.log(parent);
      completeTaskOrRenew(id, parent);
      checkIsListInStateShowNotCompletedTasks(parent);
      completeTaskInLocalStorage(id);
    }
  }
  //--------------------------------------------------- Сторення шаблону кнопок для показу  'не завершених' та 'всіх задач'
  function templateBthsShowingDifferentTasks() {
    let showAllTasksBth = document.createElement("button");
    showAllTasksBth.classList.add("btn", "btn-info");
    showAllTasksBth.setAttribute("id", "show-all-task-btn");
    showAllTasksBth.textContent = "Show all tasks";

    let showNotCompletedTasksBth = document.createElement("button");
    showNotCompletedTasksBth.classList.add("btn", "btn-info");
    showNotCompletedTasksBth.setAttribute("id", "show-not-completed-btn");
    showNotCompletedTasksBth.textContent = "Show not completed tasks";
    showNotCompletedTasksBth.style.marginLeft = "30px";

    listContainer.insertAdjacentElement("beforebegin", showAllTasksBth);
    listContainer.insertAdjacentElement(
      "beforebegin",
      showNotCompletedTasksBth
    );
  }
  //--------------------------------------------------- Показ не завершених задач
  function getIdCompletedTasks(tasks, callBackFn) {
    Object.values(tasks).forEach(item => {
      if (item.completed) {
        let idCompetedTask = item._id;
        let task = document.querySelector(`[data-task-id='${idCompetedTask}']`);
        callBackFn(task);
      }
    });
  }

  function hideTasksFromHtml(task) {
    task.classList.remove("d-flex");
    task.style.display = "none";
  }

  function onNotCompletedTasksBthHandler() {
    getIdCompletedTasks(objOfTasks, hideTasksFromHtml);
    listContainer.setAttribute("data-state-list", "show-not-completed-tasks");
  }
  //--------------------------------------------------- Показ всіх задач
  function showHiddenTasksInHtml(task) {
    task.classList.add("d-flex");
    task.style.display = ""; // данний стиль видаляється
  }

  function onAllTasksBthHandler() {
    getIdCompletedTasks(objOfTasks, showHiddenTasksInHtml);
    listContainer.setAttribute("data-state-list", "show-all-tasks");
    //listContainer.removeAttribute("data-state-list");
  }
  //--------------------------------------------------- Змінення теми кольору
  function setTheme(name) {
    let selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }

  function onThemeSelectHandler(e) {
    let selectedTheme = themeSelect.value;
    let isConfirm = confirm(
      `Ви точно хочете змінити тему на ${selectedTheme}?`
    );
    if (!isConfirm) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem("app_theme", selectedTheme);
  }
  //--------------------------------------------------- Робота з LocalStorage
  function addTaskFromLocalStorage() {
    Object.values(localStorage).forEach(task => {
      let taskFromLocalStorage = JSON.parse(task);
      objOfTasks[taskFromLocalStorage._id] = taskFromLocalStorage;
      let listItemTempleteFromLocalStorage = listItemTemplate(
        taskFromLocalStorage
      );
      listContainer.insertAdjacentElement(
        "afterbegin",
        listItemTempleteFromLocalStorage
      );
      checkCompletedTaskInLocalStorageAndSetColor(
        taskFromLocalStorage,
        listItemTempleteFromLocalStorage
      );
    });
  }

  function deleteTaskFromLocalStorage(id) {
    Object.keys(localStorage).forEach(key => {
      if (key === id) {
        console.log(`Видалити цей елемент з id : ${key}`);
        delete objOfTasks[key];
        localStorage.removeItem(key);
      }
    });
  }

  function completeTaskInLocalStorage(id) {
    Object.entries(localStorage).forEach(([key, value]) => {
      if (key === id) {
        let objTask = JSON.parse(value);
        if (!objTask.completed) {
          objTask.completed = true;
          localStorage.setItem(key, JSON.stringify(objTask));
        } else {
          objTask.completed = false;
          localStorage.setItem(key, JSON.stringify(objTask));
        }
      }
    });
  }

  function checkCompletedTaskInLocalStorageAndSetColor(taskObj, listItem) {
    if (taskObj.completed) {
      listContainer.insertAdjacentElement("beforeend", listItem);
      listItem.style.background = "#97e397";
    } else {
      listContainer.insertAdjacentElement("afterbegin", listItem);
      listItem.style.background = "";
    }
  }
})(tasks);
