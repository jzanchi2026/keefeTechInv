// List of class names and student IDs
const classes = ["Senior","Juniors" ,"Sophmore" ,"Freshman"];
const studentIDs = [];

// Handles adding a student from the "Add Student" form
function testAddStudent() {
  var sName = document.getElementById("sName").value.trim();
  var sEmail = document.getElementById("sEmail").value.trim();
  var sClass = document.getElementById("sClass").value;
  // Validate input
  if (!sName || !sEmail || !sClass) {
    alert("Please fill in all fields.");
    return;
  }
  // Generate a unique ID for the student (name-email-timestamp)
  const stdId = (sName + "-" + sEmail + "-" + Date.now()).replace(/\s+/g, '');
  // Reset form fields
  document.getElementById("sName").value = "";
  document.getElementById("sEmail").value = "";
  document.getElementById("sClass").value = classes[0];
  // Add student to selected class
  addStudent(sClass, stdId, sEmail, sName, 0);
}

// Handles dropdown click for class or student to show/hide details
function dropDownClick(year) {
  if(classes.includes(year)){
    // Toggle class group visibility
    if(document.getElementById(year + "Drop").innerHTML.charCodeAt(0) == "8595"){
      document.getElementById(year + "Drop").innerHTML = "&#8593";
      document.getElementById(year).style.display = "table-row-group";
    }
    else{
      document.getElementById(year + "Drop").innerHTML = "&#8595";
      document.getElementById(year).style.display = "none";
    }
    console.log(document.getElementById(year + "Drop").innerHTML.codePointAt(0));
  }
  else if(studentIDs.includes(year)){
    // Toggle student item details visibility
    let items = document.getElementsByClassName(year);
    console.log("std" + year);
    if(document.getElementById("std" + year).innerHTML.charCodeAt(0) == "8595"){
      document.getElementById("std" + year).innerHTML = "&#8593";
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "table-row";
      }
    }
    else{
      document.getElementById("std" + year).innerHTML = "&#8595";
      for (let i = 0; i < items.length; i++) {
        items[i].style.display = "none";
      }
    }
    console.log(document.getElementById("std" + year).innerHTML.codePointAt(0));
  }
  
  updateNumber();
}  

// Updates the outbound item count for each class
function updateNumber(){
  classes.forEach(numMath);
}

// Calculates total outbound items for a class
function numMath(year){
  var total = 0;
  // Start from row 1 to skip header
  for (let i = 1; i < document.getElementById(year).rows.length; i++) {
    if(document.getElementById(year).rows[i].cells[2].innerHTML != "none" && document.getElementById(year).rows[i].classList.contains("student")){
      total += parseInt(document.getElementById(year).rows[i].cells[2].innerHTML, 10);
    }
  }
  if(total <= 0){
    total = "none";
  }
  document.getElementById(year + "Total").innerHTML = total;
}

// Adds a new class to the table and dropdown
function addNewYear(year){
  if(classes.includes(year)){
    return;
  }
  classes.push(year);

  // Create class header row
  const yearRow = document.createElement("tr");

  const col1 = document.createElement("td");
  const col1Text = document.createTextNode(year);
  col1.appendChild(col1Text);
  yearRow.appendChild(col1);
  
  const col2 = document.createElement("td");
  const col2Text = document.createTextNode("");
  col2.appendChild(col2Text);
  yearRow.appendChild(col2);

  const col3 = document.createElement("td");
  const col3Text = document.createTextNode("none");
  col3.id = (year + "Total");
  col3.appendChild(col3Text);
  yearRow.appendChild(col3);

  const col4 = document.createElement("td");
  col4.classList.add("check");
  const col4Div = document.createElement("div");
  col4Div.classList.add("dropdown");
  
  // Add dropdown button for class
  const col4Btn = document.createElement("button");
  col4Btn.id = year + "Drop";
  col4Btn.classList.add("dropbtn");
  col4Btn.addEventListener("click",function(){ dropDownClick(year)});
  col4Btn.year = year;
  col4Btn.innerHTML ="&#8595";
  col4Div.appendChild(col4Btn);
  col4.appendChild(col4Div);
  yearRow.appendChild(col4);

  document.getElementById("classTable").appendChild(yearRow);
  
  addYearDrop(year);
}

// Adds the tbody for a class group
function addYearDrop(year){
  const tbody = document.createElement("tbody");
  tbody.id = year;
  tbody.classList.add("classDropDown");
  tbody.style.display = "none";

  // Add header row for students
  const row1 = document.createElement("tr");
  row1.classList.add("tabHead");
  
  tbody.appendChild(row1);

  const col1 =document.createElement("td");
  col1.innerHTML = "name";
  row1.appendChild(col1);
  
  const col2 = document.createElement("td");
  col2.innerHTML = "email";
  row1.appendChild(col2);

  const col3 = document.createElement("td");
  col3.innerHTML = "amount of out bound items";
  row1.appendChild(col3);

  const col4 =document.createElement("td");
  col4.classList.add("check");
  row1.appendChild(col4);

  document.getElementById("classTable").appendChild(tbody);
}

// Adds a student row to the selected class
function addStudent(year, stdId, email, name, outBound){
  if(classes.includes(year) && !studentIDs.includes(stdId)){
    studentIDs.push(stdId);

    // Student row
    const row1 = document.createElement("tr");
    row1.classList.add("student");
    row1.id = stdId;

    const col1 = document.createElement("td");
    col1.innerHTML = name;
    row1.appendChild(col1);

    const col2 = document.createElement("td");
    col2.innerHTML = email;
    row1.appendChild(col2);

    const col3 = document.createElement("td");
    if(outBound > 0){
      col3.innerHTML = outBound;
    }
    else{
      col3.innerHTML = "none";
    }
    row1.appendChild(col3);

    // Action buttons (details, delete)
    const col4 = document.createElement("td");
    col4.classList.add("check");

    const col4Btn = document.createElement("button");
    col4Btn.id = "std" + stdId;
    col4Btn.classList.add("dropbtn");
    col4Btn.innerHTML = "&#8595";
    col4Btn.addEventListener("click",function(){ dropDownClick(stdId)});

    const col4Btn2 = document.createElement("button");
    col4Btn2.id = "stdbin" + stdId;
    col4Btn2.classList.add("dropbtn");
    col4Btn2.innerHTML = "&#9003";
    col4Btn2.addEventListener("click", function(){ deleteThis(stdId)})

    col4.appendChild(col4Btn);
    col4.appendChild(col4Btn2);

    row1.appendChild(col4);

    document.getElementById(year).appendChild(row1);

    updateNumber();

    // Add header for outbound items
    const row2 = document.createElement("tr");
    row2.classList.add("tabHead");
    row2.classList.add(stdId);
    row2.style.display = "none";

    const col21 =  document.createElement("td");
    col21.innerHTML = "item name";
    const col22 =  document.createElement("td");
    col22.innerHTML = "sku number";
    const col23 =  document.createElement("td");
    col23.innerHTML = "amount outbound";
    const col24 =  document.createElement("td");
    col24.classList.add("check");

    row2.appendChild(col21);
    row2.appendChild(col22);
    row2.appendChild(col23);
    row2.appendChild(col24);
    row1.after(row2);
  }
}

// Adds an item row for a student
function addStudentItems(stdId, toolID, toolName){
  const row1 = document.createElement("tr");
  row1.classList.add("item");
  row1.classList.add(stdId);

  const col1 = document.createElement("td");
  col1.innerHTML = toolName;
  row1.appendChild(col1);
  
  const col2 = document.createElement("td");
  col2.innerHTML = toolID;
  row1.appendChild(col2);

  const col3 = document.createElement("td");
  col3.innerHTML = "1";
  row1.appendChild(col3);

  const col4 = document.createElement("td");
  col4.classList.add("check");
  row1.appendChild(col4);

  row1.style.display = "none";

  document.getElementsByClassName("tabHead " + stdId)[0].after(row1);
}

// Handles adding a class from the form
function testAddClass(){
  var tName = document.getElementById("cName").value;
  document.getElementById("cName").value = "";
  addNewYear(tName);
  populateClassDropdown();
}

// Handles adding a student from the manual add table
function testAddStudent(stdId){
  const stdElem = document.getElementById("add"+stdId);
  var stdYear = document.getElementById("slt").value;
  var stdEmail = stdElem.cells[1].innerHTML;
  var stdName = stdElem.cells[0].innerHTML;
  console.log(stdYear + ", " + stdEmail + ", " + stdName);
  addStudent(stdYear, stdId, stdEmail, stdName, 0);
  stdElem.remove();
}

// Adds a student to the manual add table
function addStudentToList(stdId, stdName, stdEmail){
  const row = document.createElement("tr");
  row.id = "add"+stdId;

  const col1 = document.createElement("td");
  col1.innerHTML = stdName;
  row.appendChild(col1);

  const col2 = document.createElement("td");
  col2.innerHTML = stdEmail;
  row.appendChild(col2);

  const col3 = document.createElement("td");
  const col3slt = document.createElement("select");
  col3slt.id = "slt" + stdId;
  for(let i = 0; i < classes.length; i++){
    const col3op = document.createElement("option");
    col3op.value = classes[i];
    col3op.innerHTML = classes[i];
    col3slt.appendChild(col3op);
  }
  col3.appendChild(col3slt);
  row.appendChild(col3);

  const col4 = document.createElement("td");
  const col4Btn = document.createElement("button");
  col4Btn.addEventListener("click",function(){ testAddStudent(stdId)});
  col4Btn.innerHTML = "add student";
  col4.appendChild(col4Btn);
  row.appendChild(col4);
  
  document.getElementById("stdTable").appendChild(row);
}

// Shows confirmation dialog for deleting a student
function deleteThis(stdId){
  const div = document.createElement("div");
  div.id = "confirm";
  const para = document.createElement("p");
  para.innerHTML = "are you sure";
  div.appendChild(para);

  const btnY = document.createElement("button");
  btnY.innerHTML = "yes";
  btnY.addEventListener("click",function(){ confirmDelete(stdId)});
  div.appendChild(btnY);

  const btnN = document.createElement("button");
  btnN.innerHTML = "no";
  btnN.addEventListener("click",function(){ dontDelete()});
  div.appendChild(btnN);
  document.body.appendChild(div);
}

// Cancels delete confirmation
function dontDelete(){
  document.getElementById("confirm").remove();
}

// Confirms and deletes student and their items
function confirmDelete(stdId){
  document.getElementById("confirm").remove();
  document.getElementById(stdId).remove();
  const delt = document.getElementsByClassName(stdId);
  for(let i = 0; i < delt.length; i++){
    console.log(delt[i]);
    delt[i].remove();
  }
}

// Populates the class dropdown in the "Add Student" form
function populateClassDropdown() {
  const sClassSelect = document.getElementById("sClass");
  if (!sClassSelect) return;
  sClassSelect.innerHTML = "";
  classes.forEach(cls => {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    sClassSelect.appendChild(option);
  });
}

// Populate dropdown on page load and after adding a class
window.addEventListener("DOMContentLoaded", populateClassDropdown);