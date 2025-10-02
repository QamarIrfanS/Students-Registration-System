
// for adding data and validation

function addData(){
    let name = document.getElementById("name").value;
    let id = document.getElementById("id").value;
    let emailID = document.getElementById("email").value;
    let contact = document.getElementById("contact-no").value;

    // validation

if (name === "" || /\d/.test(name))
    {    
    alert("Please Enter Name");
    return true;
    } 

if (id === "") 
    {
    alert("Please Enter Student ID")
    return true;
    }
 if (emailID === "" || !emailID.includes("@") || !emailID.includes("."))
    {
    alert("Please Enter Email ID")
    return true;
    }
    if (isNaN(contact) || contact.length !== 10)
    {
    alert("Please Enter Contact Number")
    return true;
    }
else {
  
    //  adding data

    let table = document.getElementsByClassName("displayTable");
    let newRow = table[0].insertRow(table[0].rows.length);
    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = id;
    newRow.insertCell(2).innerHTML = emailID;
    newRow.insertCell(3).innerHTML = contact;
    newRow.insertCell(4).innerHTML =
`<button onClick="editData(this)">Edit</button>`+`<button class="delete-btn" onClick="deleteData(this)">Delete</button>`;
// Save to localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
students.push({ name, id, emailID, contact });
localStorage.setItem("students", JSON.stringify(students));
}

// calling clearData function

clearData();
}
     

// For editing data

function editData(button){
    let row = button.parentNode.parentNode;
    let nameCell = row.cells[0];
    let idCell = row.cells[1];
    let emailCell = row.cells[2];
    let contactCell = row.cells[3];

    let nameInput = prompt("Edit Name:",nameCell.innerHTML);
    let idInput = prompt("Edit Student ID:",idCell.innerHTML);
    let emailInput = prompt("Edit Email ID:",emailCell.innerHTML);
    let contactInput = prompt("Edit Contact No.:",contactCell.innerHTML);

    nameCell.innerHTML = nameInput;
    idCell.innerHTML = idInput;
    emailCell.innerHTML = emailInput;
    contactCell.innerHTML = contactInput;
   
}

// For deleting data

function deleteData(button) {
    let row = button.parentNode.parentNode;
    let table = document.getElementsByClassName("displayTable")[0];

    // Get student ID from the row (assuming it's in column 1)
    let studentId = row.cells[1].innerText;

    // Remove the row from the table
    table.deleteRow(row.rowIndex);

    // Get current students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Remove student based on unique ID match
    let updatedStudents = students.filter(student => student.id !== studentId);

    // Save back to localStorage
    localStorage.setItem("students", JSON.stringify(updatedStudents));
}



// For Clearing data

function clearData(){

    document.getElementById("name").value = " ";
    document.getElementById("id").value = " ";
    document.getElementById("email").value = " ";
    document.getElementById("contact-no").value = " ";

}

function loadData() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let table = document.getElementsByClassName("displayTable")[0];

    students.forEach((student) => {
        let newRow = table.insertRow(table.rows.length);
        newRow.insertCell(0).innerHTML = student.name;
        newRow.insertCell(1).innerHTML = student.id;
        newRow.insertCell(2).innerHTML = student.emailID;
        newRow.insertCell(3).innerHTML = student.contact;
        newRow.insertCell(4).innerHTML =
            `<button onClick="editData(this)">Edit</button>` +
            `<button class="delete-btn" onClick="deleteData(this)">Delete</button>`;
    });
}

window.onload = loadData;
