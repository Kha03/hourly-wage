// Hàm tạo bảng dựa trên số ngày công
function generateTable() {
  const numDays = document.getElementById("numDays").value;
  const hourlyWage = document.getElementById("hourlyWage").value;
  const container = document.getElementById("workTableContainer");
  container.innerHTML = "";

  if (!numDays || !hourlyWage || numDays <= 0 || hourlyWage <= 0) {
    alert("Please enter valid number of days and hourly wage.");
    return;
  }

  const table = document.createElement("table");
  table.classList.add("table", "table-bordered");

  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
      <th>Start Time</th>
      <th>End Time</th>
      <th>Daily Salary (VND)</th>
    `;
  table.appendChild(headerRow);

  for (let i = 0; i < numDays; i++) {
    const row = document.createElement("tr");

    const startCell = document.createElement("td");
    startCell.innerHTML = `<input type="time" class="form-control" id="start${i}" required>`;
    row.appendChild(startCell);

    const endCell = document.createElement("td");
    endCell.innerHTML = `<input type="time" class="form-control" id="end${i}" required>`;
    row.appendChild(endCell);

    const salaryCell = document.createElement("td");
    salaryCell.innerHTML = `<span id="salary${i}">0</span> VND`;
    row.appendChild(salaryCell);

    table.appendChild(row);
  }

  container.appendChild(table);

  const calculateButton = document.createElement("button");
  calculateButton.classList.add("btn", "btn-success");
  calculateButton.innerText = "Calculate Total Salary";
  calculateButton.onclick = () => calculateTotalSalary(numDays, hourlyWage);
  container.appendChild(calculateButton);
}

function calculateTotalSalary(numDays, hourlyWage) {
  let totalSalary = 0;

  for (let i = 0; i < numDays; i++) {
    const startTime = document.getElementById(`start${i}`).value;
    const endTime = document.getElementById(`end${i}`).value;

    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const startDate = new Date(0, 0, 0, startHour, startMinute);
      const endDate = new Date(0, 0, 0, endHour, endMinute);

      let hoursWorked = (endDate - startDate) / (1000 * 60 * 60);

      if (hoursWorked < 0) {
        alert(`End time for day ${i + 1} must be after start time.`);
        return;
      }

      const dailySalary = hoursWorked * hourlyWage;
      document.getElementById(`salary${i}`).innerText = dailySalary.toFixed(2);
      totalSalary += dailySalary;
    } else {
      alert(`Please enter both start and end time for day ${i + 1}.`);
      return;
    }
  }

  document.getElementById("totalSalary").innerText = totalSalary.toFixed(2);
}
