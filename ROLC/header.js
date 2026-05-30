let lastScrollY = window.scrollY;
const header = document.querySelector('.web_header');
const back2top = document.querySelector('.back2top-btn');

window.addEventListener('scroll', () => {
  const header_logoW = document.querySelector('.white-logo');
  const header_logoB = document.querySelector('.black-logo');
  
  //hide header when scrolling down past 50px
  if (window.scrollY > lastScrollY && window.scrollY > 50) {
    header.style.transform = 'translateY(-200%)';
  } else {
    header.style.transform = 'translateY(0)';
  }

  //apply active style when not at tip top
  if (window.scrollY > 0) {
    header.classList.add("active");
    back2top.classList.add("show");
    if (header_logoB) header_logoB.style.display = "block";
    if (header_logoW) header_logoW.style.display = "none";
  } else {
    header.classList.remove("active");
    back2top.classList.remove("show");
    if (header_logoW) header_logoW.style.display = "block";
    if (header_logoB) header_logoB.style.display = "none";
  }

  lastScrollY = window.scrollY;
});

//scroll to top when back2top button is clicked
back2top.addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

//show dropdown when user clicks on MORE
const moreBtn = document.querySelector(".more_btn");
const dropdownContent = document.querySelector(".navDropdown .dropdown-content");

moreBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    dropdownContent.classList.toggle("show");
});

//close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".navDropdown")) {
        dropdownContent.classList.remove("show");
    }
});

//close dropdown on scroll
window.addEventListener("scroll", () => {
    dropdownContent.classList.remove("show");
});

//display the login/register overlay and go to the specific section (Login/register) base on the button clicked
document.querySelector('.VisitUsButton').addEventListener('click', () => showLoginOverlay('login'));


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


function closeLoginOverlay() {
    const overlay = document.querySelector('.login_overlay');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}