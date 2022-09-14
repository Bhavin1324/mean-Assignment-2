const emailBox = document.querySelector('#stud-email');
const passBox = document.querySelector('#stud-pass');
const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/v1/students/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email: emailBox.value, password: passBox.value })
        })
        const { token } = await response.json();
        console.log(token);
        if (token) {
            localStorage.setItem('token', token);
        }
    }
    catch (ex) {
        console.log(ex);
    }
})
