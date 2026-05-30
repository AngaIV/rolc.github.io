//breadcrmb fr
const prevLink = document.getElementById("prevPage");
const currLink = document.getElementById("currPage");
const referrer = document.referrer;

if (referrer) {
    const temp = document.createElement("a");
    temp.href = referrer;

    //get last part of URL
    let pageName = temp.pathname.split("/").filter(Boolean).pop() || "Home";

    //remove file extension
    pageName = pageName.replace(/\.[^/.]+$/, "");

    //convert referrer name to an appropriate one
    if (pageName.toLowerCase() === "index") pageName = "Home";
    if (pageName.toLowerCase() === "connectform") pageName = "Connect";
    if (pageName.toLowerCase() === "store_home") pageName = "Shop Home";
    if (pageName.toLowerCase() === "shopping_cart") pageName = "Shopping Cart";
    if (pageName.toLowerCase() === "eventspage") pageName = "Events";
    if (pageName.toLowerCase() === "databasemanagement") pageName = "Database";
    

    //capitalize first letter
    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

    //only show prev page if it’s different from current page
    if (pageName.toLowerCase() === currLink.textContent.toLowerCase()) {
        prevLink.style.display = "none"; 
    } else {
        prevLink.textContent = pageName;
        prevLink.href = referrer;
    }
} else {
    //if no referrer
    prevLink.style.display = "none";
}

