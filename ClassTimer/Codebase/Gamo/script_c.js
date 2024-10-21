console.log("script_c.js loaded");
// Effect per time
class CardScript {
    constructor(masterScriptString='') {
        if (!masterScriptString) return;
        this.scripts = [];
        for (const scriptString of masterScriptString.split(';')) {
            if (!scriptString) continue;
            this.scripts.push(new CardExecutable(scriptString));
        }
    }

    execute() {
        for (const line of this.scripts) line.execute();
    }
}

class CardExecutable {
    constructor(scriptString='') {
        if (!scriptString) return;
        this.script = scriptString;
        this.functionName = '';
        this.parameters = [ ];
    }

    parse() {
        // First, parse the line for function name and arguments
        const regex = /([a-zA-Z]+)\[([\w, ]+)\]/gm;
        let m;
        while ((m = regex.exec(this.script)) !== null) {
            if (m.index === regex.lastIndex) regex.lastIndex++;
            let i = 0;
            m.forEach((match, groupIndex) => {
                switch (i) {
                    case 1:
                        this.functionName = match;
                    break;
                    case 2:
                        for (const param of match.split(',')) this.parameters.push(param);
                    break;
                }
                i++;
            });
        }
    }

    execute() {
        this.parse();
        EXE(this.functionName, this.parameters);
    }
}

async function EXE(fname, params) {
    console.log("Effect running...");
    MasterGameTime.ProgressionLock = true;
    const attacker = MasterGameTime.player();
    const defender = MasterGameTime.player("opposite");
    // AbsoluteLocation = <playerside[L|R]><proto/entity row[P|E]><index[0-6]>
    try {
        switch (fname) {
            // DestroyCard[player<left|right>, location] : Destroys a card in given location (Opens Questionnaire)
            case "DestroyCard":
                console.log("Destorying...");
                const questions = ["AbsoluteLocation"];
                const answers = await requestInfo(questions);
                console.log("async finished");
            break;
            // DrawCard[amount] : Draw a card from the deck into current player's hand
            case "DrawCard":
                //TODO: Foreach the ....draw() results to work with the variable [amount]
                attacker.Hand.push(attacker.Undrawn.draw(parseInt(params[0]))[0]);
            break;
        }
        MasterGameTime.updateField();
        MasterGameTime.updateStatusBar();
        return true;
    } catch { 
        return false;
    }
}

function requestInfo(questions) {
    return new Promise((resolve) => {
        console.log("Computer <42> answers...", questions);
        //TODO: Add the questions
        document.getElementById("questionnaire").style.display = "block";
        while (document.getElementsByClassName("questionnaire")[0].style.display == "block") { }
        //TODO: prossess the information
        resolve("TODO: Add the values");
    });
}