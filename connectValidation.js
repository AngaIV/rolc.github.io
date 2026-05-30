function ValidateConnect() {
    let isValid = true;

    // Clear previous errors
    document.getElementById("fnames-errors").innerText = "";
    document.getElementById("lnames-errors").innerText = "";
    document.getElementById("cellphones-error").innerText = "";
    document.getElementById("emails-error").innerText = "";

    // First Name Validation
    const fname = document.getElementById("fname").value.trim();
    if (fname === "") {
        document.getElementById("fnames-errors").innerText = "First name is required.";
        isValid = false;
    }

    // Last Name Validation
    const lname = document.getElementById("lname").value.trim();
    if (lname === "") {
        document.getElementById("lnames-errors").innerText = "Last name is required.";
        isValid = false;
    }

    // Cellphone Validation
    const phone = document.getElementById("cellphone").value.trim();
    const phonePattern = /^(\+?[0-9]{1,3})?[0-9]{7,10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("cellphones-error").innerText = "Please enter a valid phone number.";
        isValid = false;
    }

    // Email Validation
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emails-error").innerText = "Please enter a valid email address.";
        isValid = false;
    }

    // Role Validation
   // const role = document.getElementById("role").value;
    //if (role === "") {
       // alert("Please select your preferred ministry role.");
        //isValid = false;
    //}

    return isValid;
}

// Optional: Clear errors when Reset button is clicked
document.addEventListener("DOMContentLoaded", function () {
    const resetBtn = document.querySelector(".reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            document.getElementById("fnames-errors").innerText = "";
            document.getElementById("lnames-errors").innerText = "";
            document.getElementById("cellphones-error").innerText = "";
            document.getElementById("emails-error").innerText = "";
        });
    }
});





document.addEventListener("DOMContentLoaded", () => {
  const letterOnlyFields = [
    "first_name",
    "last_name",
    "city",
    "province",
    "card_name"
  ];

  const numberOnlyFields = [
    "phone",
    "zip",
    "card_number",
    "cvv"
  ];

  //prevent numbers in letter-only fields
  letterOnlyFields.forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", function () {
        this.value = this.value.replace(/[^A-Za-z\s'-]/g, "");
      });
    } 
  });

  //prevent letters in number-only fields
  numberOnlyFields.forEach(id => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
      });
    }
  });

  

  //space every 4 digits
  const cardNumber = document.getElementById("card_number");
  if (cardNumber) {
    cardNumber.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      value = value.replace(/(.{4})/g, "$1 ").trim();
      this.value = value;
    });
  }

  //add "/" after 2 digits
  const expiryDate = document.getElementById("expiry_date");
  if (expiryDate) {
    expiryDate.addEventListener("input", function () {
      let value = this.value.replace(/[^0-9]/g, ""); 
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      this.value = value;
    });
  }
});

