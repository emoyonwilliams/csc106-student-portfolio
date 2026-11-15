document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskCategory = document.getElementById("task-category");
  const taskList = document.getElementById("task-list");

  // Only run planner logic when on planner.html
  if (!taskForm || !taskList) return;

  let tasks = JSON.parse(localStorage.getItem("csc106_tasks")) || [
    { text: "Complete 5-page portfolio HTML & CSS", category: "Coursework", completed: true },
    { text: "Push latest changes to GitHub repository", category: "Coding", completed: false }
  ];

  function saveTasks() {
    localStorage.setItem("csc106_tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task-item ${task.completed ? "completed" : ""}`;

      li.innerHTML = `
        <div class="task-left">
          <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}" />
          <span class="task-text">${task.text}</span>
          <span class="task-badge">${task.category}</span>
        </div>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
      text,
      category: taskCategory.value,
      completed: false
    });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  });

  taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (index === undefined) return;

    if (e.target.type === "checkbox") {
      tasks[index].completed = e.target.checked;
      saveTasks();
      renderTasks();
    } else if (e.target.classList.contains("delete-btn")) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  });

  renderTasks();
});
// Contact Form Feedback
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name").value.trim();
      formStatus.textContent = `Thanks, ${name}! Your message has been received.`;
      contactForm.reset();
    });
  }