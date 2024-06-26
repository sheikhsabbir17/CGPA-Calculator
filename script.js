let subjects = [];

function addSubject() {
  let subject = document.getElementById("subject").value;
  let grade = document.getElementById("grade").value;
  let credit = parseInt(document.getElementById("credit").value);
  subjects.push({ subject, grade, credit });
  document.getElementById("subject").value = "";
  document.getElementById("grade").value = "A+";
  document.getElementById("credit").value = "";
  updateTable();
}

function updateTable() {
  let table = document.getElementById("subject-table");
  table.innerHTML = `
    <tr>
      <th>Subject</th>
      <th>Grade</th>
      <th>Credit</th>
      <th>Action</th>
    </tr>
  `;
  subjects.forEach((subject, index) => {
    let row = table.insertRow();
    row.innerHTML = `
      <td>${subject.subject}</td>
      <td>${subject.grade}</td>
      <td>${subject.credit}</td>
      <td><button type="button" onclick="deleteSubject(${index})">Delete</button></td>
    `;
  });
}

function calculateCGPA() {
  let totalCredits = 0;
  let totalGradePoints = 0;
  subjects.forEach((subject) =>{
    let gradeValue;
    switch (subject.grade) {
      case "A+":
        gradeValue = 4;
        break;
      case "A":
        gradeValue = 4;
        break;
      case "B+":
        gradeValue = 3.5;
        break;
      case "B":
        gradeValue = 3;
        break;
      case "C+":
        gradeValue = 2.5;
        break;
      case "C":
        gradeValue = 2;
        break;
      case "D+":
        gradeValue = 1.5;
        break;
      case "D":
        gradeValue = 1;
        break;
      case "F":
        gradeValue = 0;
        break;
      default:
        gradeValue = 0;
    }
    totalGradePoints += gradeValue * subject.credit;
    totalCredits += subject.credit;
  });
  let cgpa = totalGradePoints / totalCredits;
  document.getElementById("cgpa").innerHTML = cgpa.toFixed(2);
}

function resetForm() {
  subjects = [];
  updateTable();
  document.getElementById("subject").value = "";
  document.getElementById("grade").value = "A+";
  document.getElementById("credit").value = "";
  document.getElementById("cgpa").innerHTML = "0.00";
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  updateTable();
  calculateCGPA();
}