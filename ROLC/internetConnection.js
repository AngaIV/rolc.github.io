  // check at page load
  if (!navigator.onLine) {
    document.body.style.background = "#ffeeee";
    alert("⚠ You are currently offline! Some features may not work.");
  }

  // Listen for when connection status changes
  window.addEventListener("offline", () => {
    alert("You just went offline");
    //document.body.style.background = "#ffdddd";
  });

  window.addEventListener("online", () => {
    alert("You are back online");
    //document.body.style.background = "#ddffdd";
  });

