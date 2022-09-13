const emailBox = document.querySelector('#stud-email');
const passBox = document.querySelector('#stud-pass');
const btnSubmit = document.querySelector("#btn-submit");
async function start() {
    const response = await fetch('/api/v1/students/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: emailBox.value, password: passBox.value })
    })
    const { data, token } = await response.json();
    console.log("Data", data)
    console.log("Token", token)
}
btnSubmit.addEventListener('click', start);
