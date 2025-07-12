document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const form = document.getElementById("empForm");

  if (id) {
    const emp = employees.find(e => e.id == id);
    if (emp) {
      document.getElementById("firstName").value = emp.firstName;
      document.getElementById("lastName").value = emp.lastName;
      document.getElementById("email").value = emp.email;
      document.getElementById("department").value = emp.department;
      document.getElementById("role").value = emp.role;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newEmp = {
      id: id ? parseInt(id) : Date.now(),
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      department: form.department.value.trim(),
      role: form.role.value.trim()
    };

    if (!newEmp.firstName || !newEmp.lastName || !newEmp.email || !newEmp.department || !newEmp.role) {
      document.getElementById("errorMsg").textContent = "All fields are required.";
      return;
    }

    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(newEmp.email)) {
      document.getElementById("errorMsg").textContent = "Invalid email.";
      return;
    }

    if (id) {
      const index = employees.findIndex(e => e.id == id);
      employees[index] = newEmp;
    } else {
      employees.push(newEmp);
    }

    window.location.href = "index.html";
  });
});
