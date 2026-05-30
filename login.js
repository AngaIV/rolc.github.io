//function to toggle Login/Register divs
function toggleSections(showRegister) {
    const loginDiv = document.querySelector('.login');
    const registerDiv = document.querySelector('.register');

    if (showRegister) {
        loginDiv.style.display = 'none';
        registerDiv.style.display = 'block';
        document.getElementById("loginForm").reset();
        attachNameFieldListeners();
    } else {
        loginDiv.style.display = 'block';
        registerDiv.style.display = 'none';
        document.getElementById("registerForm").reset();
    }
}

//radio Button Change Listener
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('typeButton')) {
        toggleSections(e.target.id === 'register');
    }
});

function closeLoginOverlay() {
    const overlay = document.querySelector('.login_overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}



//function to handle Create Account link click
function handleCreateAccountClick() {
    const registerRadio = document.getElementById('register');
    registerRadio.checked = true;
    toggleSections(true);
}

//initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    const registerRadio = document.getElementById('register');
    toggleSections(registerRadio.checked);
    
    //attach event listeners for name fields
    attachNameFieldListeners();

    const createAccountLink = document.getElementById('createAccountLink');
    if (createAccountLink) {
        createAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleCreateAccountClick();
        });
    }
});


//verify password requirements
const form = document.getElementById("registerForm");
const passwordInput = document.getElementById("registerPassword");
const confirmInput = document.getElementById("confirm");
const registerBtn = document.getElementById("registerBtn");

const lengthReq = document.getElementById("length");
const letterReq = document.getElementById("letter");
const numberReq = document.getElementById("number");
const specialReq = document.getElementById("special");

function validatePassword(value) {
    let isValid = true;

    //check length
    if (value.length >= 8) {
        lengthReq.classList.add("valid");
        lengthReq.classList.remove("invalid");
        lengthReq.innerHTML = '<i class="fa-solid fa-circle-check"></i> At least 8 characters';
    } else {
        lengthReq.classList.add("invalid");
        lengthReq.classList.remove("valid");
        lengthReq.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> At least 8 characters';
        isValid = false;
    }

    //check letter
    if (/[A-Za-z]/.test(value)) {
        letterReq.classList.add("valid");
        letterReq.classList.remove("invalid");
        letterReq.innerHTML = '<i class="fa-solid fa-circle-check"></i> 1 letter';
    } else {
        letterReq.classList.add("invalid");
        letterReq.classList.remove("valid");
        letterReq.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> 1 letter';
        isValid = false;
    }

    //check number
    if (/\d/.test(value)) {
        numberReq.classList.add("valid");
        numberReq.classList.remove("invalid");
        numberReq.innerHTML = '<i class="fa-solid fa-circle-check"></i> 1 number';
    } else {
        numberReq.classList.add("invalid");
        numberReq.classList.remove("valid");
        numberReq.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> 1 number';
        isValid = false;
    }

    //check special character
    if (/[^A-Za-z0-9]/.test(value)) {
        specialReq.classList.add("valid");
        specialReq.classList.remove("invalid");
        specialReq.innerHTML = '<i class="fa-solid fa-circle-check"></i> 1 special character';
    } else {
        specialReq.classList.add("invalid");
        specialReq.classList.remove("valid");
        specialReq.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> 1 special character';
        isValid = false;
    }

    return isValid;
}

//function to update register button state
function updateRegisterButton() {
    const passwordValid = validatePassword(passwordInput.value);
    
    if (passwordValid) {
        registerBtn.disabled = false;
    } else {
        registerBtn.disabled = true;
    }
}

//live check while typing
passwordInput.addEventListener("input", function () {
    validatePassword(passwordInput.value);
    updateRegisterButton();
});

//prevent form submit if requirements fail
form.addEventListener("submit", function (e) {
    const passwordValid = validatePassword(passwordInput.value);
    const age = document.getElementById("age").value;

    if (!passwordValid) {
        e.preventDefault();
        alert("Please meet all password requirements before submitting.");
        return;
    }

    if (age < 16 || age > 90) {
        e.preventDefault();
        alert("Age must be between 16 and 90");
        return;
    }
});

//function to attach event listeners to name fields
function attachNameFieldListeners() {
    const firstnameInput = document.getElementById("firstName");
    const lastnameInput = document.getElementById("lastName");
    const pnumber = document.getElementById("phone");
    const money = document.getElementById("customAmount");
    const donor_name = document.getElementById("donor_name");
     const cardName = document.getElementById("cardName");

    
    if (firstnameInput) {
        firstnameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z]/g, ""); 
        });
    }
    
    if (lastnameInput) {
        lastnameInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z]/g, ""); 
        });
    }

    if (pnumber) {
        pnumber.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, ''); 
        });
    }
    if (donor_name) {
        donor_name.addEventListener("input", function () {
            this.value = this.value.replace(/[^A-Za-z]/g, ""); 
        });
    }

    if (cardName) {
        cardName.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s'-]/g, "").toUpperCase(); 
    });
}
}

//validate on page load
window.addEventListener('DOMContentLoaded', function() {
    updateRegisterButton();
});

//for login password
function toggleLoginPassword() {
    const pwd = document.getElementById("password");
    const eye = document.querySelector(".login .toggle-eye");
    
    togglePasswordField(pwd, eye);
}

//for register password  
function toggleRegisterPassword() {
    const pwd = document.getElementById("registerPassword");
    const eye = document.querySelector(".register .toggle-eye");
    
    togglePasswordField(pwd, eye);
}

//share logic for pwds fr
function togglePasswordField(passwordField, eyeIcon) {
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
}

function togglePassword() {
    const register_pwd = document.getElementById("registerPassword");
    const pwd = document.getElementById("password");
    const eye = document.querySelector(".toggle-eye");

    if (pwd.type === "password" || register_pwd === "password") {
        register_pwd.type = "text"
        pwd.type = "text";
        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");
    } else {
        pwd.type = "password";
        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");
    }
}

