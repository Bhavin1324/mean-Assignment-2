const tableBody = document.querySelector(".table-body");
const formContainer = document.querySelector(".form-container")
const createNew = document.querySelector("#create-new");

createNew.addEventListener("click", () => {
    formContainer.classList.toggle("d-none");
})
function editThis(id) {

}
function deleteThis(id) {

}

async function fetchStduentList() {
    const token = localStorage.getItem("token");
    if (!token) {
        location.replace("../index.html");
    }
    try {
        const response = await fetch("http://localhost:5000/api/v1/students", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const { data, email } = await response.json();
        document.querySelector("#brand").textContent = "Welcome: " + email;
        tableBody.innerHTML += data.map(item => {
            return `
            <tr>
                <th>${item.rollno}</th>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td><button class="btn btn-primary" onclick=editThis(${item.rollno})>Edit</button></td>
                <td><button class="btn btn-danger" onclick=deleteThis(${item.rollno})>Delete</button></td>
            </tr>
            `
        }).join(" ");
    }
    catch (ex) {
        console.log(ex)
    }
}
fetchStduentList();