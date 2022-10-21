const emailBox = document.querySelector('#stud-email');
const passBox = document.querySelector('#stud-pass');
const btnSubmit = document.querySelector("#btn-submit");
let errorText = document.querySelector(".error-text");

function displayError(msg) {
    errorText.classList.remove('d-none');
    errorText.classList.add('d-block');
    errorText.previousElementSibling.classList.add('error');
    errorText.textContent = msg;
}

btnSubmit.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/v1/students/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email: emailBox.value, password: passBox.value })
        })
        switch (response.status) {
            case 400:
                displayError("Invalid username or password");
                break;
            case 401:
                displayError("Unregistered user trying to login");
                break;
            case 500:
                displayError("Ooops! internal server error");
                break;
        }
        const { token } = await response.json();
        if (token) {
            errorText.classList.remove('d-block')
            errorText.classList.add('d-none')
            errorText.textContent = "";
            localStorage.setItem('token', token);
        }
    }
    catch (ex) {
        console.log(ex)
    }
})
