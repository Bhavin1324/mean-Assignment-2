const emailBox = document.querySelector('#stud-email');
const passBox = document.querySelector('#stud-pass');
const btnSubmit = document.querySelector("#btn-submit");
let errorText = document.querySelector(".error-text");

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
                errorText.classList.remove('d-none');
                errorText.classList.add('d-block');
                errorText.previousElementSibling.classList.add('error');
                errorText.textContent = "Invalid username or password";
                break;
            case 401:
                errorText.classList.remove('d-none');
                errorText.classList.add('d-block');
                errorText.previousElementSibling.classList.add('error');
                errorText.textContent = "Unregistered User trying to login";
                break;
            case 500:
                errorText.classList.remove('d-none');
                errorText.classList.add('d-block');
                errorText.previousElementSibling.classList.add('error');
                errorText.textContent = "Internal server error";
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
