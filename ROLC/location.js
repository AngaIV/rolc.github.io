/* function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("demo").innerHTML =
        "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    document.getElementById("demo").innerHTML =
      "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
  } */

  // Grab the button
const locationBtn = document.getElementById('getLocationBtn');

//add click event and executes get location function
locationBtn.addEventListener('click', getLocation);

//gets the users location if available and displays an error if not supported by the browser
function getLocation() { 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("locationDisplay").innerHTML =
      "Geolocation is not supported by this browser.";
  }
}
//shows the users location based on longitude and latitude then displays/ replaces the text in p tag with an id of locationDisplay
function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  document.getElementById("locationDisplay").innerHTML =
    "Latitude: " + lat + "<br> Longitude: " + lng;
}
//error checking against the code given
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("locationDisplay").innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("locationDisplay").innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("locationDisplay").innerHTML = "The request to get user location timed out.";
      break;
    default:
      document.getElementById("locationDisplay").innerHTML = "An unknown error occurred.";
  }
}

