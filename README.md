# River of Life Church – E-Commerce & Ministry Platform

**Live Demo:** [angaiv.github.io/rolc.github.io](https://angaiv.github.io/rolc.github.io/)  
**Architecture:** Frontend Web Application (HTML5, CSS3, JavaScript ES6+, Bootstrap Icons, AOS Library)

## Project Overview
This repository contains a high-fidelity frontend implementation for a ministry platform that seamlessly combines community engagement features with a fully interactive e-commerce storefront. 

Developed as a CS3 Web Technology project, this system is built entirely using vanilla modern JavaScript (ES6+), semantic design structures, and modular architecture. It serves to demonstrate core academic and practical competencies in frontend software engineering—specifically, real-world client-side state tracking, complex user layout control flow, and robust validation mechanics without relying on abstraction frameworks like React or Vue.

## Core Technical Competencies Demonstrated

### 1. Advanced DOM Manipulation & Client-Side State Management
* **Dynamic Catalog Engineering:** Coordinates an interactive product grid mapping context-specific dataset attributes (`data-product-id`, `data-sizes`). Handles real-time inventory configuration tracking, size selections, dynamic quantity toggling, and programmatic catalogue data parsing via a local JSON simulation schema.
* **Component-Level Modals:** Controls contextual popups for detail inspection layers and feedback forms safely using runtime stylesheet modifications and viewport scroll locks (`body { overflow: hidden }`) to preserve the application's visual layout state during overlay interactions.

### 2. Scalable Architecture via Event Delegation
* **Global Decoupled Listeners:** To maximize event performance and mitigate the memory overhead of attaching multiple standalone listeners across extensive product grids, the application implements global document listeners to decouple click workflows. 
* **Dynamic Element Management:** This delegation strategy ensures that clicks are captured perfectly across dynamically injected components, structural layout rewrites, or nested interactive viewports (such as independent product review entry fields or cart alerts) without needing manual listener re-binding routines.

### 3. Defensive Form Validation Modules
* **Input Compliance Checking:** Implements script compliance layers validating multi-step form structures (e.g., star-rating selections, text inputs) before submissions are finalized.
* **String Parsing Algorithms:** Features custom validation functions evaluating strict character constraints (such as a hard 50-word limitation cutoff for review texts) utilizing RegExp and string-splitting mechanics to parse user content on the fly.

### 4. Layout Architecture & Fluid Design
* **Responsive Layouts:** Employs advanced Flexbox layouts and structured CSS variables to define scalable, grid-aligned templates that adjust seamlessly across mobile, tablet, and desktop viewports.
* **Scroll-Driven Interactions:** Incorporates the Animate On Scroll (AOS) library to orchestrate clean element entry behaviors across container boundaries, maximizing visual engagement for the end-user.

## Frontend-Only Deployment Notice
* **Architecture Limitations:** This repository is currently hosted as a decoupled client-side deployment on GitHub Pages and contains no active backend environment compatibility or live database integration layer hooks. All storage states, review submissions, and cart interactions are fully mocked on the client side using analytical schema simulations to comprehensively demonstrate production-ready user interface capabilities.
