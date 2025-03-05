  // Dashboard Page Elements
  const dashboardPage = document.getElementById("dashboardPage");
  const sectionTitle = document.getElementById("sectionTitle");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebar = document.getElementById("sidebar");


  function navigateTo(section) {
    const sections = ['dashboardSection', 'teamsSection', 'projectsSection', 'attendanceSection', 'assignTasksSection'];
    

    sections.forEach(sec => {
      const sectionElement = document.getElementById(sec);
      sectionElement.classList.add('d-none');
      
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => link.classList.remove('active'));
    });
    
    document.getElementById(section).classList.remove('d-none');
    
    const activeNavLink = document.querySelector(`a[onclick="navigateTo('${section}')"]`);
    if (activeNavLink) {
      activeNavLink.classList.add('active');
    }
    
    
  }

  sidebarToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  // Teams data and functionality
  const teams = [
    {
      name: "Team Alpha",
      employees: [
        { name: "John Smith", avatar: "https://randomuser.me/api/portraits/men/1.jpg", position: "Team Lead", status: "Active", progress: 85, progressColor: "green" },
        { name: "Emily Johnson", avatar: "https://randomuser.me/api/portraits/women/1.jpg", position: "Developer", status: "Active", progress: 75, progressColor: "blue" },
        { name: "Michael Brown", avatar: "https://randomuser.me/api/portraits/men/2.jpg", position: "Designer", status: "Active", progress: 80, progressColor: "green" },
        { name: "Sarah Davis", avatar: "https://randomuser.me/api/portraits/women/2.jpg", position: "QA Tester", status: "Active", progress: 70, progressColor: "blue" }
      ]
    },
    {
name: "Team Beta",
employees: [
  { name: "David Wilson", avatar: "https://randomuser.me/api/portraits/men/3.jpg", position: "Team Lead", status: "Active", progress: 90, progressColor: "green" },
  { name: "Jessica Taylor", avatar: "https://randomuser.me/api/portraits/women/3.jpg", position: "Website Redesign", status: "On Leave", progress: 60, progressColor: "orange" },
  { name: "Robert Martinez", avatar: "https://randomuser.me/api/portraits/men/4.jpg", position: "Database Management", status: "Active", progress: 82, progressColor: "green" },
  { name: "Lauren Anderson", avatar: "https://randomuser.me/api/portraits/women/4.jpg", position: "Data Analytics", status: "Active", progress: 78, progressColor: "blue" }
]
},
{
name: "Team Gamma",
employees: [
  { name: "Christopher Lee", avatar: "https://randomuser.me/api/portraits/men/5.jpg", position: "Team Lead", status: "Active", progress: 88, progressColor: "green" },
  { name: "Amanda White", avatar: "https://randomuser.me/api/portraits/women/5.jpg", position: "Mobile App Development", status: "Active", progress: 79, progressColor: "blue" },
  { name: "Daniel Harris", avatar: "https://randomuser.me/api/portraits/men/6.jpg", position: "API Integration", status: "On Leave", progress: 55, progressColor: "orange" },
  { name: "Olivia Martin", avatar: "https://randomuser.me/api/portraits/women/6.jpg", position: "IT Security Audits", status: "Active", progress: 72, progressColor: "blue" }
]
},
{
name: "Team Delta",
employees: [
  { name: "William Thompson", avatar: "https://randomuser.me/api/portraits/men/7.jpg", position: "Team Lead", status: "Active", progress: 87, progressColor: "green" },
  { name: "Sophia Garcia", avatar: "https://randomuser.me/api/portraits/women/7.jpg", position: "Server Upgrade", status: "Active", progress: 81, progressColor: "blue" },
  { name: "James Rodriguez", avatar: "https://randomuser.me/api/portraits/men/8.jpg", position: "Software Developmen", status: "Active", progress: 76, progressColor: "blue" },
  { name: "Emma Lopez", avatar: "https://randomuser.me/api/portraits/women/8.jpg", position: "Technical Support ", status: "Terminated", progress: 20, progressColor: "red" }
]
},
{
name: "Team Epsilon",
employees: [
  { name: "Alexander Clark", avatar: "https://randomuser.me/api/portraits/men/9.jpg", position: "Team Lead", status: "Active", progress: 89, progressColor: "green" },
  { name: "Isabella Lewis", avatar: "https://randomuser.me/api/portraits/women/9.jpg", position: "Marketing", status: "Active", progress: 83, progressColor: "green" },
  { name: "Benjamin Walker", avatar: "https://randomuser.me/api/portraits/men/10.jpg", position: "Cybersecurity", status: "Active", progress: 77, progressColor: "blue" },
  { name: "Mia Hall", avatar: "https://randomuser.me/api/portraits/women/10.jpg", position: "Cloud Management ", status: "Active", progress: 74, progressColor: "blue" }
]
}
    // ... (rest of the teams data remains the same)
  ];

  function createEmployeeRow(employee) {
    return `
      <tr>
        <td>
          <div class="employee-info">
            <img src="${employee.avatar}" alt="${employee.name}" class="employee-avatar">
            ${employee.name}
          </div>
        </td>
        <td>${employee.position}</td>
        <td><span class="status status-${employee.status.toLowerCase().replace(' ', '')}">${employee.status}</span></td>
        <td>
          <div class="progress-bar">
            <div class="progress progress-${employee.progressColor}" style="width: ${employee.progress}%"></div>
          </div>
        </td>
      </tr>
    `;
  }

  function createTeamSection(team) {
    return `
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">${team.name}</h5>
          <table class="employee-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Position</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              ${team.employees.map(createEmployeeRow).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function populateTeamsSection() {
    const teamsSection = document.getElementById('teamsSection');
    teamsSection.innerHTML = teams.map(createTeamSection).join('');
  }

  // Chart initialization
  document.addEventListener('DOMContentLoaded', function() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
    new Chart(attendanceCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Attendance (%)',
          data: [90, 92, 94, 89, 96, 95],
          borderColor: 'rgba(52, 152, 219, 1)',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });

    // Project Progress Chart
    const projectProgressCtx = document.getElementById('projectProgressChart').getContext('2d');
    new Chart(projectProgressCtx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [{
          data: [35, 50, 15],
          backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    // Team Performance Chart
    const teamPerformanceCtx = document.getElementById('teamPerformanceChart').getContext('2d');
    new Chart(teamPerformanceCtx, {
      type: 'radar',
      data: {
        labels: ['Productivity', 'Quality', 'Collaboration', 'Innovation', 'Timeliness'],
        datasets: [{
          label: 'Team Alpha',
          data: [85, 90, 88, 78, 92],
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderColor: 'rgba(52, 152, 219, 1)',
        }, {
          label: 'Team Beta',
          data: [88, 85, 92, 82, 89],
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
          borderColor: 'rgba(46, 204, 113, 1)',
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: {
              display: false
            },
            suggestedMin: 50,
            suggestedMax: 100
          }
        }
      }
    });
  });




  // ################################################################################


  function updateTotalTasksCount() {
    let totalTasksElement = document.getElementById("totalTasks");
    let projectsTable = document.querySelector("#projectsSection table tbody");
    
    if (totalTasksElement && projectsTable) {
        let totalTasks = projectsTable.getElementsByTagName("tr").length;
        totalTasksElement.textContent = totalTasks;
    }
}

function saveTasksToLocalStorage() {
    let projectsTable = document.querySelector("#projectsSection table tbody");
    let tasks = [];
    projectsTable.querySelectorAll("tr").forEach(row => {
        let columns = row.getElementsByTagName("td");
        tasks.push({
            taskName: columns[0].textContent,
            taskDeadline: columns[1].textContent,
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let projectsTable = document.querySelector("#projectsSection table tbody");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    projectsTable.innerHTML = ""; // Clear table before loading
    
    tasks.forEach((task, index) => {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.taskDeadline}</td>
            <td><span class="badge bg-info">Assigned</span></td>
            <td>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
                </div>
            </td>
            <td>
                <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
            </td>
        `;
        projectsTable.appendChild(newRow);
    });
    updateTotalTasksCount();
}

document.getElementById("assignTaskForm").addEventListener("submit", function (event) {
    event.preventDefault();
    
    let taskName = document.getElementById("taskDescription").value.trim();
    let taskDeadline = document.getElementById("taskDeadline").value;
    
    if (!taskName || !taskDeadline) {
        alert("Task description and deadline are required!");
        return;
    }
    
    let formattedDate = new Date(taskDeadline);
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    let displayDate = formattedDate.toLocaleDateString('en-US', options);
    
    let projectsTable = document.querySelector("#projectsSection table tbody");
    let newRow = document.createElement("tr");
    let index = projectsTable.getElementsByTagName("tr").length;
    newRow.innerHTML = `
        <td>${taskName}</td>
        <td>${displayDate}</td>
        <td><span class="badge bg-info">Assigned</span></td>
        <td>
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
            </div>
        </td>
        <td>
            <button class="btn btn-danger btn-sm delete-task" data-index="${index}">Delete</button>
        </td>
    `;
    
    projectsTable.appendChild(newRow);
    saveTasksToLocalStorage();
    updateTotalTasksCount();
    
    document.getElementById("assignTaskForm").reset();
    alert("Task assigned successfully!");
});

document.addEventListener("DOMContentLoaded", function() {
    loadTasksFromLocalStorage();
    document.querySelector("#projectsSection table tbody").addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-task")) {
            let index = event.target.getAttribute("data-index");
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.splice(index, 1); // Remove the task from the array
            localStorage.setItem("tasks", JSON.stringify(tasks)); // Save updated tasks
            loadTasksFromLocalStorage(); // Reload tasks
        }
    });
});











  // ... (previous code remains the same)





  // SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSs
  
// Global variable to store tasks
// let tasks = [
//   {
//     name: "Website Redesign",
//     deadline: "Oct 15, 2024",
//     status: "On Track",
//     progress: 75
//   },
//   {
//     name: "Mobile App Development",
//     deadline: "Nov 1, 2024",
//     status: "Delayed",
//     progress: 40
//   },
//   {
//     name: "Server Upgrade",
//     deadline: "Dec 10, 2024",
//     status: "On Track",
//     progress: 60
//   }
// ];

// // Function to create a task row
// function createTaskRow(task) {
//   return `
//     <tr>
//       <td>${task.name}</td>
//       <td>${task.deadline}</td>
//       <td><span class="badge ${task.status === 'On Track' ? 'bg-success' : 'bg-danger'}">${task.status}</span></td>
//       <td>
//         <div class="progress">
//           <div class="progress-bar ${task.status === 'Delayed' ? 'bg-danger' : ''}" role="progressbar" style="width: ${task.progress}%;" aria-valuenow="${task.progress}" aria-valuemin="0" aria-valuemax="100">${task.progress}%</div>
//         </div>
//       </td>
//     </tr>
//   `;
// }

// // Function to populate the projects section
// function populateProjectsSection() {
//   const projectsSection = document.getElementById('projectsSection');
//   const tableBody = projectsSection.querySelector('tbody');
//   tableBody.innerHTML = tasks.map(createTaskRow).join('');
// }

// // Function to update the dashboard section
// function updateDashboard() {
//   const totalTasksElement = document.querySelector('#dashboardSection .card-text.display-4');
//   totalTasksElement.textContent = tasks.length;
// }

// // Assign Tasks form submission
// document.getElementById('assignTaskForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   const team = document.getElementById('teamSelect').value;
//   const description = document.getElementById('taskDescription').value;
//   const deadline = document.getElementById('taskDeadline').value;
//   const priority = document.getElementById('taskPriority').value;

//   // Create a new task object
//   const newTask = {
//     name: description,
//     deadline: new Date(deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
//     status: "On Track",
//     progress: 0
//   };

//   // Add the new task to the tasks array
//   tasks.push(newTask);

//   // Update the projects section
//   populateProjectsSection();

//   // Update the dashboard section
//   updateDashboard();

//   // Clear the form
//   this.reset();

//   // Show a success message
//   alert('Task assigned successfully!');
// });

// // Initialize the projects section on page load
// document.addEventListener('DOMContentLoaded', function() {
//   populateProjectsSection();
//   updateDashboard();
// });

// // ... (rest of the code remains the same)