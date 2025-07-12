let currentPage = 1;
let perPage = 10;
let currentSort = '';
let filters = { firstName: '', department: '', role: '' };

function renderEmployees() {
  let filtered = [...employees];

  const searchVal = document.getElementById("search").value.toLowerCase();
  if (searchVal) {
    filtered = filtered.filter(emp =>
      emp.firstName.toLowerCase().includes(searchVal) ||
      emp.lastName.toLowerCase().includes(searchVal) ||
      emp.email.toLowerCase().includes(searchVal)
    );
  }

  if (filters.firstName) {
    filtered = filtered.filter(emp =>
      emp.firstName.toLowerCase().includes(filters.firstName.toLowerCase())
    );
  }
  if (filters.department) {
    filtered = filtered.filter(emp =>
      emp.department.toLowerCase().includes(filters.department.toLowerCase())
    );
  }
  if (filters.role) {
    filtered = filtered.filter(emp =>
      emp.role.toLowerCase().includes(filters.role.toLowerCase())
    );
  }

  if (currentSort === "firstName") {
    filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (currentSort === "department") {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }

  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  const container = document.getElementById("employeeContainer");
  container.innerHTML = paginated.map(emp => `
    <div class="card">
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p><strong>Email:</strong> ${emp.email}</p>
      <p><strong>Department:</strong> ${emp.department}</p>
      <p><strong>Role:</strong> ${emp.role}</p>
      <div class="card-actions">
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    </div>
  `).join("");

  renderPagination(filtered.length);
}

function renderPagination(total) {
  const totalPages = Math.ceil(total / perPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderEmployees();
    });
    pagination.appendChild(btn);
  }
}

function deleteEmployee(id) {
  employees = employees.filter(emp => emp.id !== id);
  renderEmployees();
}

function editEmployee(id) {
  window.location.href = `add-edit.html?id=${id}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderEmployees();

  document.getElementById("search").addEventListener("input", () => {
    currentPage = 1;
    renderEmployees();
  });

  document.getElementById("applyFilter").addEventListener("click", () => {
    filters.firstName = document.getElementById("filterFirstName").value;
    filters.department = document.getElementById("filterDept").value;
    filters.role = document.getElementById("filterRole").value;
    currentPage = 1;
    renderEmployees();
  });

  document.getElementById("resetFilter").addEventListener("click", () => {
    document.getElementById("filterFirstName").value = '';
    document.getElementById("filterDept").value = '';
    document.getElementById("filterRole").value = '';
    filters = { firstName: '', department: '', role: '' };
    currentPage = 1;
    renderEmployees();
  });

  document.getElementById("perPage").addEventListener("change", (e) => {
    perPage = parseInt(e.target.value);
    currentPage = 1;
    renderEmployees();
  });

  document.getElementById("sortBy").addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderEmployees();
  });

  document.getElementById("filterToggle").addEventListener("click", () => {
    document.getElementById("filterSidebar").classList.toggle("hidden");
  });

  document.getElementById("addEmployeeBtn").addEventListener("click", () => {
    window.location.href = "add-edit.html";
  });
});
