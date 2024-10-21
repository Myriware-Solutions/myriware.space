let CommandReady = false;
let CommandOpen = false;
let EnvirementLocation = "";
let TakingInput = true;
let TerminalCursorCharacter = '_';
window.addEventListener('keydown', function(event) {
    if (event.key === '\\') {
        CommandReady = true;
    } else if (event.key === '`' && CommandReady) {
        openConsole();
        CommandReady = false;
    } else if (event.key === '`' && CommandOpen) {
        TakingInput = !TakingInput;
        if (TakingInput) {
            Print("Enabled Terminal Input", 2);
        } else {
            Print("Disabled Terminal Input", 2);
        }
    } else if (CommandOpen) {
        doKeyPress(event.key);
    } else {
        CommandReady = false;
    }
});

function openConsole() {
    CommandOpen = true;
    let consoleDiv = document.createElement("div");
        consoleDiv.id = "WindowScriptConsole";
    let consoleHeaderDiv = document.createElement("div");
        consoleHeaderDiv.id = "WindowScriptConsoleHeader";
    let consoleCloseOutButton = document.createElement("button");
        consoleCloseOutButton.innerText = "X";
        consoleCloseOutButton.addEventListener('click', function(e) {
            closeConsole(true);
        });
    consoleHeaderDiv.append(consoleCloseOutButton);
    consoleDiv.append(consoleHeaderDiv);
    let consoleBodyDiv = document.createElement("div");
        consoleBodyDiv.id = "WindowScriptConsoleBody";
        consoleBodyDiv.innerHTML = "<p class='cmdLine normal' id='WindowScriptConsoleInput'>> </p>";
    consoleDiv.append(consoleBodyDiv);
    document.body.append(consoleDiv);
    DragElement(consoleDiv);
    consoleOnLoad();
    Print("Lambda Initalization...");
}

function consoleOnLoad() {
    const oldLog = console.log;
    console.log = function (message) {
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        Print(message, 0, false, true, 0, "\\cns");
        oldLog.apply(console, arguments);
    };

    const oldError = console.error;
    console.error = function (message) {
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        Print(message, 1, false, true, 0, "\\CNS");
        oldError.apply(console, arguments);
    };
    //Setup EnvirementLocation
    const regex = /\/Codebase\/(.*)\//gm;
    let m;
    while ((m = regex.exec(window.location)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            //console.log(`Found match, group ${groupIndex}: ${match}`);
            EnvirementLocation = match.trim();
        });
    }
}

function closeConsole(now=false) {
    Print("Goodbye ^u^");
    setTimeout(function() {
        document.getElementById("WindowScriptConsole").remove();
        CommandReady = false;
        CommandOpen = false;
    }, (now) ? 0 : 2000);
}

const terminalColors = [
    "normal",
    "error",
    "warn"
];
function Print(msg, level=0, usehtml=false, uselocation=true, alternateIndent=0, additionalPath='') {
    let printSpan = document.createElement("p");
    printSpan.classList.add("cmdLine", terminalColors[level], "WindowScriptConsolePrinted");
    if (usehtml) {
        printSpan.innerHTML = msg;
    } else {
        const locationString = `λ:\\${EnvirementLocation}${additionalPath}: `;
        const indent = (alternateIndent!==0) ? alternateIndent : locationString.length;
        printSpan.innerText = ((uselocation) ? locationString : '\u00A0'.repeat(indent)) + msg;
    }
    const div = document.getElementById("WindowScriptConsoleBody");
    //div.append(printSpan);
    div.insertBefore(printSpan, document.getElementById("WindowScriptConsoleInput"));
}

let CommandString = "";
function doKeyPress(key) {
    if (!TakingInput) return;
    function updateOutput() {
        document.getElementById("WindowScriptConsoleInput").innerHTML = `<span class="non-blinking">&gt; ${CommandString}</span><span class='blinking'>${TerminalCursorCharacter}</span>`;
    }
    if (key.length === 1) {
        CommandString += key;
        updateOutput();
    } else if (key === "Enter") {
        executeCommand();
        document.getElementById("WindowScriptConsoleInput").innerHTML = `<span class="non-blinking">^ </span><span class="blinking">${CommandString}</span>`;
        CommandString = "";
    } else if (key === "Backspace") {
        CommandString = CommandString.slice(0, CommandString.length-1);
        updateOutput();
    }
}

const CommandRegistry = [
    ["help", "Brings up the commands."],
    ["cls | clear", "Clears the Terminal output."],
    ["exit [-n]", "Closes the terminal. [-n] disables 2 second delay."],
    ["echo <text...>", "Prints to the terminal."],
    ["log <text...>", "Pushes text to JS 'console.log'."],
    ["valid", "prints out all the valid 'goto' <locations>."],
    ["goto <location>", "Prints a clickable link to the desired Codebase/λ area."]
]

function executeCommand() {
    // Parse the input string
    try {
        const unicodeRegex = /~u([a-fA-F0-9]{4})/gm;
        let m;
        while ((m = unicodeRegex.exec(CommandString)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === unicodeRegex.lastIndex) {
                unicodeRegex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            let toReplace;
            let codePoint;
            m.forEach((match, groupIndex) => {
                //console.log(`Found match, group ${groupIndex}: ${match}`);
                switch (groupIndex) {
                    case 0: 
                        toReplace = match; 
                    break;
                    case 1: 
                        codePoint = match; 
                    break;
                }
            });
            const decimalCodePoint = parseInt(codePoint, 16);
            CommandString = CommandString.replaceAll(toReplace, String.fromCodePoint(decimalCodePoint));
        }
    } catch { }
    // Execute
    const cmdParts = CommandString.split(' ');
    switch (cmdParts[0]) {
        case "echo":
            Print(` "${cmdParts.slice(1).join(" ")}"`);
        break;
        case "log":
            console.log(cmdParts.slice(1).join(" "));
        break;
        case "valid":
            Print("Valid 'goto' <locations>:");
            for (item of Object.keys(itemRegistry)) {
                Print(`${item}=${itemRegistry[item]}`, 0, false, false);
            }
        break;
        case "goto":
            if (cmdParts[1] in itemRegistry) {
                Print(`<a href="${itemRegistry[cmdParts[1]]}">link</a>`, 0, true);
            } else {
                Print("Not found. Try 'valid'.");
            }
        break;
        case "cls":
            const cmdBody = document.getElementById("WindowScriptConsoleBody");
            while (cmdBody.children.length !== 1) {
                for (const child of cmdBody.children) {
                    if (!child.classList.contains("WindowScriptConsolePrinted")) continue;
                    child.remove();
                }
            }
        break;
        case "help":
            Print("Help Menu:");
            for (const pair of CommandRegistry) {
                Print(`${pair[0]}: ${pair[1]}`, 0, false, false, 2);
            }
        break;
        case "exit":
            closeConsole((cmdParts[1] === "-n"));
        break;
        case "cursor":
            TerminalCursorCharacter = cmdParts.slice(1).join(" ");
            Print(`Updated Cursor: ${TerminalCursorCharacter}`);
        break;
        default:
            Print("Invalid Command!", 1);
            Print(`-->${CommandString}<--`, 1, false, false);
        break;
    }
}

const itemRegistry = {
    "gamo": "./Gamo/codebase.html",
    "znsc": "./znScript/main.html", 
    "home": "../main.html"
}

function DragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "Header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }