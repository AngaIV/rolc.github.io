function toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const icon = document.getElementById('toggle-icon');
    if (sidebar && icon) {
        sidebar.classList.toggle('collapsed');
        icon.classList.toggle('bi-layout-sidebar-reverse', !sidebar.classList.contains('collapsed'));
        icon.classList.toggle('bi-layout-sidebar', sidebar.classList.contains('collapsed'));
    }
}

function showSection(sectionName) {
    const sections = {
        dashboard: document.querySelector('.dashboard'),
        logout: document.querySelector('.Logout-section'),
        profile: document.querySelector('.profile-wrapper'),
        orders: document.querySelector('.order-section'),
        store: document.querySelector('.store_section'),
        testimonies: document.querySelector('.testimonies-section'),
        events: document.querySelector('.add-sevents-section'),
        messages: document.querySelector('.messages-section'),
        analytics: document.querySelector('.analytics-section')
    };

    //hide all sections
    Object.values(sections).forEach(section => {
        if (section) section.style.display = 'none';
    });

    //show the selected section
    if (sections[sectionName]) {
        sections[sectionName].style.display = 'block';
          window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
    }

    //update active class
    document.querySelectorAll('.sidebar a').forEach(button => {
        button.classList.toggle('active', button.getAttribute('data-section') === sectionName);
    });

    //save the current section to sessionStorage (only for this browser session)
    sessionStorage.setItem('currentSection', sectionName);
}

function clearSectionStorage() {
    //clear the section storage when logging out
    sessionStorage.removeItem('currentSection');
}

document.addEventListener('DOMContentLoaded', function() {
    //get the saved section from sessionStorage or default to dashboard
    const savedSection = sessionStorage.getItem('currentSection') || 'dashboard';
    
    //show the saved section
    showSection(savedSection);

    document.querySelectorAll('.sidebar a[data-section]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(button.getAttribute('data-section'));
        });
    });

    // Sidebar toggle event listener
    const toggleLink = document.getElementById('sidebar-toggle-link');
    if (toggleLink) {
        toggleLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleSidebar();
        });
    }

    document.getElementById('editProfileBtn').addEventListener('click', () => {
        const formElements = document.querySelectorAll('.profile-form input, .profile-form select, .profile-form textarea');
        formElements.forEach(el => el.removeAttribute('disabled'));
    });
});

//handle subscription cancellation buttons
document.querySelectorAll('.subsOverlay-openBtn').forEach(button => {
    button.addEventListener('click', function() {
        const donationID = this.getAttribute('data-donation-id');
        document.getElementById('donationID').value = donationID;
        document.getElementById('subsOverlay-confirmation').style.display = 'block';
    });
});

document.getElementById('subsOverlay-close').addEventListener('click', function() {
    document.getElementById('subsOverlay-confirmation').style.display = 'none';
});

// Add event listener to trigger the overlay
document.getElementById('showVolunteerBtn').addEventListener('click', showVolunteerOverlay);

// Your existing functions
function showVolunteerOverlay() {
    const overlay = document.querySelector('.overlay-vol');
    if (overlay) {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; 

        // Close overlay when clicking outside
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeVolunteerOverlay();
            }
        });
    }
}

function closeVolunteerOverlay() {
    const overlay = document.querySelector('.overlay-vol');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

// Close button
const closeBtn = document.getElementById('closeOverlay');
if (closeBtn) {
    closeBtn.addEventListener('click', closeVolunteerOverlay);
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") === "volunteer") {
        showVolunteerOverlay();
    }
});


//function for current password
function toggleCurrentPassword() {
    const pwd = document.querySelector('input[name="currentPassword"]');
    const eye = document.querySelector('input[name="currentPassword"]').closest('.password-container').querySelector('.toggle-eye');
    
    togglePasswordField(pwd, eye);
}

//function for new password
function toggleNewPassword() {
    const pwd = document.querySelector('input[name="newPassword"]');
    const eye = document.querySelector('input[name="newPassword"]').closest('.password-container').querySelector('.toggle-eye');
    
    togglePasswordField(pwd, eye);
}

//function for confirm new password
function toggleConfirmPassword() {
    const pwd = document.querySelector('input[name="confirmNewPassword"]');
    const eye = document.querySelector('input[name="confirmNewPassword"]').closest('.password-container').querySelector('.toggle-eye');
    
    togglePasswordField(pwd, eye);
}

//shared logic for password fields
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