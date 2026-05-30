//handles userAgent
  window.onload = function() {
      let text = "<p>User-agent header: " + navigator.userAgent + "</p>";
      document.getElementById("browserInfo").innerHTML = text;
  }  