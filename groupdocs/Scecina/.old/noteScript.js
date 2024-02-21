// https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API

function log(msg) {
    document.getElementById("Log").innerHTML += `<span>${msg}</span><br>`;
}

function askNotificationPermission() {
    // function to actually ask the permissions
    function handlePermission(permission) {
      // set the button to shown or hidden, depending on what the user answers
      notificationBtn.style.display =
        Notification.permission === "granted" ? "none" : "block";
    }
  
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      log("This browser does not support notifications.");
    } else {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      });
    }

    log("done !")
}

function exampleNotify() {
    /*
    const img = undefined;
    const text = `EXAMPLE`;
    const notification = new Notification("EX", { body: text, icon: img });*/
    log("Try");
    try {
        const note = new Notification("EX", { body: "Hello" });
        log("?done");
        
    }
    catch
    {
        log("No work");
    }
}
