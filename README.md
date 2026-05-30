# River of Life Church – E-Commerce & Ministry Platform

**Live Demo:** [angaiv.github.io/rolc.github.io](https://angaiv.github.io/rolc.github.io/)  

---

### Project Metrics & Environment
| Property | Details |
| :--- | :--- |
| **Course Context** | CS3 Web Technology Assignment |
| **Development Tier** | Frontend Only (Decoupled Client-Side) |
| **Core Languages** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Design Integrations** | Bootstrap Icons, Animate On Scroll (AOS) Library |

---

## Project Overview
This project is a frontend web platform designed for a ministry, combining community information pages with an interactive retail storefront. 

Developed as a **CS3 Web Technology** practical submission, the site is built completely with vanilla technologies. The goal of the project was to implement core frontend systems—like dynamic content rendering, interactive pop-up modals, and strict form validation rules—manually using modern JavaScript without relying on framework abstractions like React or Vue.

---

## Key Technical Features

### 1. DOM Modification & Local Data Mocking
* **Dynamic Product Profiles:** Product cards read data attributes (`data-product-id`, `data-sizes`) from the HTML. The JavaScript parses these attributes to track size selections, manage quantities on the fly, and pull deeper product details out of a local array object when an item is selected.
* **Scroll-Locked Modals:** Item detail layers and review forms use overlay windows managed through script-based style toggles. The script locks the viewport scroll state (`body { overflow: hidden }`) when a modal is active so users don't lose their place on the page.

### 2. Event Delegation System
* **Global Document Listeners:** Instead of binding performance-heavy click listeners to every single product image or button on the page, the application uses event delegation by listening for clicks globally at the document level.
* **Handling Injected Elements:** This ensures that interactions on elements modified or added to the page later (such as dynamic "Write a Review" links inside popups or quick cart alerts) are caught perfectly without needing to re-bind events.

```js
// Event delegation model used to catch dynamic triggers globally
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-cart-btn')) {
        event.preventDefault();
        const name = event.target.getAttribute('data-name');
        alert(`Demo Mode: "${name}" cannot be added right now.`);
    }
});
