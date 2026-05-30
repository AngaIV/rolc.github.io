
//toggle the navMenu when the hamburger btn is clicked. Remove overflow when the menu is active
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".navMenu");
const body = document.querySelector("body");
const header_logoW = document.querySelector(".white-logo");
const header_logoB = document.querySelector(".black-logo");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    body.style.overflow = "hidden";
    
  } else {
    body.style.overflow = "auto";  
  }
});


//remove the active menu when window size is above 768 px
window.addEventListener("resize", () => {
  if (window.innerWidth > 850 ) {
    navMenu.classList.remove("active");
    body.style.overflow = "auto"; 
  }
});

//remove the active menu when clicking a menu link
document.querySelectorAll('.navMenu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    body.style.overflow = "auto"; 
  });
});


//display the login/register overlay and go to the specific section (Login/register) base on the button clicked
document.querySelector('.VisitUsButton').addEventListener('click', () => showLoginOverlay('login'));
document.querySelector('.register-btn').addEventListener('click', () => showLoginOverlay('register'));

function showLoginOverlay(section) {
  const loginDiv = document.querySelector('.login');
  const registerDiv = document.querySelector('.register');
  const overlay = document.querySelector('.login_overlay');

  if (!overlay) return;
  const loginRadio = document.getElementById('login');
  const registerRadio = document.getElementById('register');

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  if (section === 'login') {
    loginDiv.style.display = 'block';
    registerDiv.style.display = 'none';
    if (loginRadio) loginRadio.checked = true;
    document.getElementById("loginForm").reset();
  } else if (section === 'register') {
    loginDiv.style.display = 'none';
    registerDiv.style.display = 'block';
    if (registerRadio) registerRadio.checked = true;
    document.getElementById("registerForm").reset();
  }
}

/*function to close the login overlay*/
function closeLoginOverlay() {
    const overlay = document.querySelector('.login_overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}