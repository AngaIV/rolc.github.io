function search() {
    const input = document.getElementById("dsearch");
    const filter = input.value.toLowerCase();
    const table = document.querySelector(".databaseTable");
    if (!table) return;

    const trs = table.getElementsByTagName("tr");

    //skip the header row 
    for (let i = 1; i < trs.length; i++) {
        let rowText = trs[i].textContent.toLowerCase();
        if (rowText.indexOf(filter) > -1) {
            trs[i].style.display = "";
        } else {
            trs[i].style.display = "none";
        }
    }
}


