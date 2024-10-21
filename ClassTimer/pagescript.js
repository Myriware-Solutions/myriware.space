window.onload = function () {
    document.getElementById("infopane").style.display = "block";
    document.getElementById("chatpane").style.display = "none";
}

function openPane(paneID) {
    for (const ele of document.getElementsByClassName("pane")) {
        if (ele.id !== paneID) {
            ele.style.display = "none";
        } else {
            ele.style.display = "block";
        }
    }
}