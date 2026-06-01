# River of Life Church – Website & Demo Store

**Live Link:** [angaiv.github.io/rolc.github.io](https://angaiv.github.io/rolc.github.io/)  

## What is this?
This is a frontend web platform built as an assignment for a CS3 Web Technology course. It combines standard church community pages with an interactive e-commerce store layout. 

The goal of the assignment was to build everything from scratch using standard vanilla web tech—no frontend libraries or frameworks allowed. 

## Key Features
* **Built with:** HTML5, CSS3, Vanilla JavaScript (ES6), with AOS for scrolling animations.
* **Interactive Store Elements:** Product cards pull layout details straight from HTML data attributes to handle real-time inventory checks, disable out-of-stock sizes, and open overlay item previews.
* **Event Delegation:** Uses a single dynamic global listener instead of stacking separate click handlers onto every item, keeping the script clean and efficient.
* **Pure Client-Side Demo:** Form submissions and network scripts are safely intercepted to keep the site 100% stable as a static GitHub Pages deployment.

```js
// Example: Intercepting dynamic clicks globally
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-cart-btn')) {
        event.preventDefault();
        const name = event.target.getAttribute('data-name');
        alert(`Demo Mode: "${name}" added to cart successfully.`);
    }
});
