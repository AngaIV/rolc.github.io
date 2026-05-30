//checks if cookies are enabled or not on the browser
if(navigator.cookieEnabled){
    	document.getElementById("demo").innerHTML = "Cookies enabled: true" ;
    }else{
    	document.getElementById("demo").innerHTML = "Cookies enabled: false ";
    }