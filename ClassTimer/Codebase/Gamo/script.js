// Loaded in registry.js
// Classes
class GameTime {
    CurrentPlayer = "";
    ProgressionLock = false;
    constructor(leftPlayerDeckID, rightPlayerDeckID, createEmpty=false) {
        if (createEmpty) return;
        this.leftPlayer = new CardMaster(leftPlayerDeckID);
        this.rightPlayer = new CardMaster(rightPlayerDeckID);
        this.changePlayer("left");
        this.changePhase("draw");
        this.updateField();
        this.updateStatusBar();
    }

    createCardElement(card=EMPTYCARD) {
        if (card==EMPTYCARD) {
            let cardDiv = document.createElement("div");
            cardDiv.innerText = "Empty";
            cardDiv.classList.add("empty-card-structure");
            return cardDiv;
        }
        let cardDiv = document.createElement("div");
        let headerDiv = document.createElement("div");
            headerDiv.classList.add("card-header");
            let atkSpan = document.createElement("span");
                atkSpan.classList.add("card-atk");
                atkSpan.innerText = card.ATK + "atk";
            let defSpan = document.createElement("span");
                defSpan.classList.add("card-def");
                defSpan.innerText = card.DEF + "def";
            let nameSpan = document.createElement("span");
                nameSpan.classList.add("card-name");
                nameSpan.innerText = card.Name;
            headerDiv.append(atkSpan, defSpan, nameSpan);
        let pictureDiv = document.createElement("div");
            pictureDiv.innerText = "Picture";
        let desciptionDiv = document.createElement("div");
            desciptionDiv.innerText = card.Description;
        cardDiv.append(headerDiv, pictureDiv, desciptionDiv);
        cardDiv.classList.add("general-card-structure");
        return cardDiv;
    }

    updateField() {
        for (const playerSide of ["left", "right"]) {
            for (const eCardID of Object.keys(this.player(playerSide).Field.ERow)) {
                const cardSite = document.getElementById(`player-${playerSide}_entity-card_${eCardID[1]}`);
                cardSite.innerHTML = "";
                cardSite.append(this.createCardElement(this.player(playerSide).Field.ERow[eCardID]));
            }
            for (const pCardID of Object.keys(this.player(playerSide).Field.PRow)) {
                const cardSiteProto = document.getElementById(`player-${playerSide}_protocal-card_${pCardID[1]}`);
                cardSiteProto.innerHTML = "";
                cardSiteProto.append(this.createCardElement(this.player(playerSide).Field.PRow[pCardID]));
            }
            document.getElementById(`player-${playerSide}_void-field`).innerHTML = `<span>${this.player(playerSide).Field.VoidField.length} Cards</span>`;
            document.getElementById(`player-${playerSide}_draw-deck`).innerHTML = `<span>${this.player(playerSide).Undrawn.Cards.length} Cards</span>`
        }
    }

    updateStatusBar() {
        document.getElementById("players-health").innerText = this.leftPlayer.Health + " / " + this.rightPlayer.Health;
        document.getElementById("player-hand").innerText = this.player().Hand.length;
    }

    changePlayer(newState) {
        this.CurrentPlayer = newState;
        const gameField = document.getElementById("game-field");
        const playerIndicator = document.getElementById("current-player");
        if (newState === "right") {
            gameField.style.transform = "rotate(0deg)";
            playerIndicator.innerText = "Right";
        } else {
            gameField.style.transform = "rotate(180deg)";
            playerIndicator.innerText = "Left";
        }
    }

    doPlayerTurnOver() {
        this.changePlayer(this.getPlayerSide(true));
        this.changePhase("draw");
        this.updateField();
    }

    updateSetSelections() {
        const setFromDiv = document.getElementById("set-from-list");
        setFromDiv.innerHTML = '';
        const setToDiv = document.getElementById("set-to-list");
        setToDiv.innerHTML = '';
        const setFromDivProtocal = document.getElementById("set-protocal-from-list");
        setFromDivProtocal.innerHTML = '';
        const setToDivProtocal = document.getElementById("set-protocal-to-list");
        setToDivProtocal.innerHTML = '';
        let i = 0;
        for (const card of this.player().Hand) {
            let fromPart = document.createElement("dd");
            fromPart.innerText = card.Name;
            fromPart.id = `set-from-${i}`;
            if (card.Type === "Entity") {
                fromPart.addEventListener("click", function (e) {
                    const className = "set-selected-from-list";
                    for (const ele of document.getElementsByClassName(className)) ele.classList.remove(className);
                    this.classList.add(className);
                });
            } else if (card.Type === "Protocal") {
                fromPart.addEventListener("click", function (e) {
                    const className = "set-selected-from-list-protocal";
                    for (const ele of document.getElementsByClassName(className)) ele.classList.remove(className);
                    this.classList.add(className);
                });
            }
            setFromDiv.append(fromPart);
            if (card.Type !== "Protocal") setFromDiv.append(fromPart);
            if (card.Type !== "Entity") setFromDivProtocal.append(fromPart);
            i++;
        }
        let j = 0;
        const toDivs = [setToDiv, setToDivProtocal];
        const fieldObjs = [this.player().Field.ERow, this.player().Field.PRow];
        const fields = [ Object.keys(fieldObjs[0]), Object.keys(fieldObjs[1]) ];
        for (const field of fields) {
            i = 0;
            for (const fieldID of field) {
                if (fieldObjs[j][fieldID] !== EMPTYCARD) continue;
                let toPart = document.createElement("dd");
                toPart.innerText = fieldID;
                toPart.id = `set-to-${j}_${i}`;
                function selectEntity(e) {
                    for (const ele of document.getElementsByClassName("set-selected-to-list")) {
                        ele.classList.remove("set-selected-to-list");
                    }
                    this.classList.add("set-selected-to-list");
                }
                function selectProtocal(e) {
                    for (const ele of document.getElementsByClassName("set-selected-to-list-protocal")) {
                        ele.classList.remove("set-selected-to-list-protocal");
                    }
                    this.classList.add("set-selected-to-list-protocal");
                }
                toPart.addEventListener("click", (j === 0) ? selectEntity : selectProtocal);
                toDivs[j].append(toPart);
                i++;
            }
            j++;
        }
    }

    updateEffectOptions(phase) {
        const optionDiv = document.getElementById(`${phase}-phase-options`);
        optionDiv.innerHTML = "";
        for (const field of [this.player().Field.ERow, this.player().Field.PRow]) {
            const fieldCardIDs = Object.keys(field);
            for (const cardFieldID of fieldCardIDs) {
                const card = field[cardFieldID];
                if (Object.keys(card.Effects).length === 0) continue;
                console.log("Effect card with ", Object.keys(card.Effects));
                let section = document.createElement("dl");
                    let sectionHead = document.createElement("dt");
                    sectionHead.innerText = `[@${cardFieldID}] ${card.Name}`;
                    section.append(sectionHead);
                for (const effectKey of Object.keys(card.Effects)) {
                    let button = document.createElement("button");
                    button.innerText = "Activate Effect";
                    button.id = `doEffectButton-${cardFieldID}-${effectKey}-${this.CurrentPlayer}`;
                    button.addEventListener("click", function (e) {
                        const idParts = this.id.split('-');
                        MasterGameTime.doEffect(idParts[3], idParts[1], "MainUse")
                    });
                    section.append(button);
                }
                optionDiv.append(section);
            }
        }
    }

    changePhase(newPhase) {
        if (this.ProgressionLock) return;
        function updatePhaseIndicatior(name) {
            document.getElementById("current-phase").innerText = name;
        }
        function unlockPhaseOptions(phaseName) {
            for (const phaseControl of document.getElementsByClassName("phase-control")) {
                phaseControl.style.display = "none"
            }
            document.getElementById(phaseName + "-phase-control").style.display = "block";
        }
        let i = 0;
        switch(newPhase) {
            case "draw":
                this.player().Hand.push(this.player().Undrawn.draw(1)[0]);
                updatePhaseIndicatior("Draw");
                unlockPhaseOptions("draw");
            break;
            case "set":
                this.updateSetSelections();
                updatePhaseIndicatior("Set");
                unlockPhaseOptions("set");
            break;
            case "main":
            case "secondary":
                if (newPhase === "main") {
                    updatePhaseIndicatior("Main");
                    unlockPhaseOptions("main");
                } else {
                    updatePhaseIndicatior("Secondary");
                    unlockPhaseOptions("secondary");
                }
                this.update();
            break;
            case "attack":
                updatePhaseIndicatior("Attack");
                unlockPhaseOptions("attack");
                const attackerList = document.getElementById("attack-list-attacker");
                const defenderList = document.getElementById("attack-list-defender");
                attackerList.innerHTML = '';
                defenderList.innerHTML = '';
                MasterGameTime.updateAttackDifference();
                i = 0;
                for (const attackerFieldID of Object.keys(this.player().Field.ERow)) {
                    if (this.player().Field.ERow[attackerFieldID] === EMPTYCARD) continue;
                    const card = this.player().Field.ERow[attackerFieldID];
                    let attackerPart = document.createElement("dd");
                    attackerPart.innerText = card.Name;
                    attackerPart.id = `attack-attacker-${i}-${attackerFieldID}`;
                    attackerPart.addEventListener("click", function (e) {
                        for (const ele of document.getElementsByClassName("attack-selected-attacker")) {
                            ele.classList.remove("attack-selected-attacker");
                        }
                        this.classList.add("attack-selected-attacker");
                        MasterGameTime.updateAttackDifference();
                    });
                    attackerList.append(attackerPart);
                    i++;
                } 
                i = 0;
                for (const defenderFieldID of Object.keys(this.player('opposite').Field.ERow)) {
                    if (this.player('opposite').Field.ERow[defenderFieldID] === EMPTYCARD) continue;
                    const card = this.player('opposite').Field.ERow[defenderFieldID];
                    let defenderPart = document.createElement("dd");
                    defenderPart.innerText = card.Name;
                    defenderPart.id = `attack-defender-${i}-${defenderFieldID}`;
                    defenderPart.addEventListener("click", function (e) {
                        for (const ele of document.getElementsByClassName("attack-selected-defender")) {
                            ele.classList.remove("attack-selected-defender");
                        }
                        this.classList.add("attack-selected-defender");
                        MasterGameTime.updateAttackDifference();
                    });
                    defenderList.append(defenderPart);
                    i++;
                }
            break;
            case "end":
                updatePhaseIndicatior("End");
                unlockPhaseOptions("end");
        }
        this.updateField();
        this.updateStatusBar();
    }

    updateAttackDifference() {
        try {
            const attackerFieldID = document.getElementsByClassName("attack-selected-attacker")[0].id.split("-")[3];
            const defenderFieldID = document.getElementsByClassName("attack-selected-defender")[0].id.split("-")[3];
            const attackerCard = this.player().Field.ERow[attackerFieldID];
            const defenderCard = this.player('opposite').Field.ERow[defenderFieldID];
            document.getElementById("attack-difference").innerText = (attackerCard.ATK - defenderCard.DEF).toString();
            if (attackerCard.ATK - defenderCard.DEF < 0) {
                document.getElementById("attack-difference").classList.add("not-advisable");
            }
        } catch {
            document.getElementById("attack-difference").innerText = "N/A";
        }
    }

    doAttack() {
        try {
            const attackerFieldID = document.getElementsByClassName("attack-selected-attacker")[0].id.split("-")[3];
            const defenderFieldID = document.getElementsByClassName("attack-selected-defender")[0].id.split("-")[3];
            const attackerCard = this.player().Field.ERow[attackerFieldID];
            const defenderCard = this.player('opposite').Field.ERow[defenderFieldID];
            const difference = attackerCard.ATK - defenderCard.DEF;
            if (difference < 0 || difference === 0) {
                this.player().Field.moveFieldToVoid(attackerFieldID);
                this.player().takeDamage(difference);
            } else if (attackerCard.ATK - defenderCard.DEF > 0) {
                this.player('opposite').Field.moveFieldToVoid(defenderFieldID);
                this.player('opposite').takeDamage(difference);
            }
        } catch {

        }
        this.updateField();
        this.changePhase('secondary');
    }

    doEffect(player, cardFieldID, effectID) {
        MasterGameTime.player(player).Field.getRowFromID(cardFieldID)[cardFieldID].Effects[effectID].execute();
        MasterGameTime.player(player).Field.moveFieldToVoid(cardFieldID);
        this.update();
    }

    player(playerSide="none") {
        const playerSider = (playerSide==="none") ? this.CurrentPlayer : playerSide;
        if (playerSider === "left") {
            return this.leftPlayer;
        } else if (playerSide==="opposite") {
            return (this.CurrentPlayer === "left") ? this.rightPlayer : this.leftPlayer;
        } else {
            return this.rightPlayer;
        }
    }

    getPlayerSide(nextPlayer=false) {
        if (nextPlayer) {
            return (this.CurrentPlayer === "left") ? "right" : "left";
        } else {
            return this.CurrentPlayer;
        }
    }

    getPhaseFromIndex(phaseIndex) {
        switch (phaseIndex) {
            case 1:
                return "draw";
            case 2:
                return "set";
            case 3:
                return "main";
            case 4:
                return "attack";
            default:
                throw new InvalidPhaseProgressionError("Phase number does not exist!");
        }
    }

    update() {
        this.updateEffectOptions("main");
        this.updateEffectOptions("secondary");
        this.updateField();
        this.updateStatusBar();
    }
}

class CardMaster {
    constructor(deckID) {
        this.Undrawn = new DeckObject(deckID);
        this.Undrawn.shuffle();
        this.Hand = this.Undrawn.draw(5);
        this.Field = new FieldObject();
        this.Health = 1200;
    }
    takeDamage(damage=0) {
        this.Health -= damage;
        MasterGameTime.updateStatusBar();
    }
}

class DeckObject {
    constructor(deckID) {
        this.DeckID = deckID;
        this.Cards = [];
        for (const cardID of Object.keys(DeckRegistry[deckID])) {
            for (let i=0; i<DeckRegistry[deckID][cardID]; i++) {
                this.Cards.push(new CardObject(cardID));
            }
        }
    };
    shuffle() {
        //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = this.Cards.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [this.Cards[currentIndex], this.Cards[randomIndex]] = [
            this.Cards[randomIndex], this.Cards[currentIndex]];
        }
    };
    draw(amount) {
        return this.Cards.splice(0, amount);
    };
}

class FieldObject {
    constructor() {
        this.ERow = { 
            "E0": EMPTYCARD,
            "E1": EMPTYCARD,
            "E2": EMPTYCARD,
            "E3": EMPTYCARD,
            "E4": EMPTYCARD,
            "E5": EMPTYCARD,
            "E6": EMPTYCARD
        };
        this.PRow = { 
            "P0": EMPTYCARD,
            "P1": EMPTYCARD,
            "P2": EMPTYCARD,
            "P3": EMPTYCARD,
            "P4": EMPTYCARD,
            "P5": EMPTYCARD,
            "P6": EMPTYCARD
        };
        this.VoidField = [ ];
    }

    moveFieldToVoid(fieldID='') {
        this.VoidField.push(this.getRowFromID(fieldID)[fieldID]);
        this.getRowFromID(fieldID)[fieldID] = EMPTYCARD;
    }

    getRowFromID(id='') {
        if (!id) return;
        if (id[0] === "E") {
            return this.ERow;
        } else {
            return this.PRow;
        }
    }
}

class CardObject {
    constructor(cardID) {
        try {
            const card_ref = CardDictionary[cardID];
            this.cardID = cardID;
            this.Name = card_ref["Name"];
            this.Description = card_ref["Description"];
            this.Type = card_ref["Type"];
    
            this.ATK = card_ref["ATK"] + 0;
            this.DEF = card_ref["DEF"] + 0;
    
            this.Effects = { }
            for (const effectKey of Object.keys(card_ref["Effects"])) {
                this.Effects[effectKey] = new CardScript(card_ref["Effects"][effectKey]);
            }
        } catch {
            console.log("Error parsing CardID: " + cardID);
        }
    }
}
// Functions

let MasterGameTime = new GameTime('','',true);
const EMPTYCARD=new CardObject('000');

window.onload = function () {
    // Setup the field
    CreateField();
}

function StartGame() {
    let lDeck;
    let rDeck;
    if (!VerifyInput) {
        alert("Input not valid");
        return;
    } else {
        console.log("Decks passed Validation.");
        lDeck = document.getElementById("player-left-deck-select").value;
        rDeck = document.getElementById("player-right-deck-select").value;
        document.getElementById("pre-game-action-menu").innerHTML = "";
    }
    // Initalize GameTime object
    MasterGameTime = new GameTime(lDeck, rDeck);
}

function VerifyInput() {
    const validInputs = Object.keys(DeckRegistry);
    for (const side of ["left", "right"]) {
        if (!validInputs.includes(document.getElementById(`player-${side}-deck-select`).value)) {
            return false;
        }
    }
    return true;
}

function CreateField() {
    for (const playerDivID of ["player-left", "player-right"]) {
        const playerFieldDiv = document.getElementById(playerDivID);
        // Create first & second row (entities, protocals)
        let entityRowDiv = document.createElement("div");
            entityRowDiv.classList.add("cards-row");
            entityRowDiv.id = "entity-row";
        let protocalRowDiv = document.createElement("div");
            protocalRowDiv.classList.add("cards-row");
            protocalRowDiv.id = "protocal-row";
        for (let i=0; i<7; i++) {
            // Entity divs
            let entityCardDiv = document.createElement("div");
                entityCardDiv.classList.add("entity", "card-holder");
                if (playerDivID==="player-left") entityCardDiv.classList.add("left-player");
                entityCardDiv.id = `${playerDivID}_entity-card_${i}`;
                //entityCardDiv.innerText = entityCardDiv.id;
                entityRowDiv.append(entityCardDiv);
            // Protocal divs
            let protocalCardDiv = document.createElement("div");
                protocalCardDiv.classList.add("protocal", "card-holder");
                if (playerDivID==="player-left") protocalCardDiv.classList.add("left-player");
                protocalCardDiv.id = `${playerDivID}_protocal-card_${i}`;
                //protocalCardDiv.innerText = protocalCardDiv.id;
                protocalRowDiv.append(protocalCardDiv);
        }
        // Add Void Field to first row
        let voidFieldDiv = document.createElement("div");
            voidFieldDiv.classList.add("void", "card-holder");
            if (playerDivID==="player-left") voidFieldDiv.classList.add("left-player");
            voidFieldDiv.id = `${playerDivID}_void-field`;
            entityRowDiv.append(voidFieldDiv);
        playerFieldDiv.append(entityRowDiv);
        // Add Deck Field to bottom row
        let drawDeckDiv = document.createElement("div");
            drawDeckDiv.classList.add("deck", "card-holder");
            if (playerDivID==="player-left") drawDeckDiv.classList.add("left-player");
            drawDeckDiv.id = `${playerDivID}_draw-deck`;
            //drawDeckDiv.innerText = drawDeckDiv.id;
            protocalRowDiv.append(drawDeckDiv);
        playerFieldDiv.append(protocalRowDiv);
    }

    for (const cardHolderDiv of document.getElementsByClassName("card-holder")) {
        FillInEmptyCardHolder(cardHolderDiv.id);
    }
}

function FillInEmptyCardHolder(cardHolderDivID) {
    const div = document.getElementById(cardHolderDivID);
    let emptyCardDiv = document.createElement("div");
        emptyCardDiv.classList.add("card");
        emptyCardDiv.innerText = div.id;
        div.append(emptyCardDiv);
}

function FlipField() {
    const ele = document.getElementById("game-field");
    let cur = ele.style.transform;
    if (cur === "rotate(180deg)") {
        ele.style.transform = "rotate(0deg)";
    } else {
        ele.style.transform = "rotate(180deg)";
    }
}
// Buttons
function DrawCardButton() {
    MasterGameTime.changePhase("set");
}

function MoveEntityFromHandToFieldButton(skipTurn=false) {
    if (!skipTurn) {
        const fromMove = document.getElementsByClassName("set-selected-from-list")[0].innerText;
        const toMove = document.getElementsByClassName("set-selected-to-list")[0].innerText;
        // Edit Master memory
        const playerHand = MasterGameTime.player().Hand;
        MasterGameTime.player().Field.ERow[toMove] = playerHand.splice(playerHand.indexOf(playerHand.find((ele) => ele.Name == fromMove)), 1)[0];
        // Update Field
        MasterGameTime.updateField();
    }
    MasterGameTime.changePhase("main");
}

function MoveProtocalFromHandToFieldButton() {
    try {
        const fromMove = document.getElementsByClassName("set-selected-from-list-protocal")[0].innerText;
        const toMove = document.getElementsByClassName("set-selected-to-list-protocal")[0].innerText;
        // Edit Master memory
        const playerHand = MasterGameTime.player().Hand;
        MasterGameTime.player().Field.PRow[toMove] = playerHand.splice(playerHand.indexOf(playerHand.find((ele) => ele.Name == fromMove)), 1)[0];
        // Update Field
        MasterGameTime.updateField();
    } catch { }
    MasterGameTime.updateSetSelections();
}

function ProgressPhaseButton(phaseName='') {
    if (phaseName) {
        MasterGameTime.changePhase(phaseName);
    } else {
        throw new InvalidPhaseProgressionError("Cannot leave <phaseName> blank!");
    }
}

function EndTurnButton() {
    MasterGameTime.changePhase("end");
}

function AttackCardButton() {
    MasterGameTime.doAttack();
}

function TurnOverButton() {
    MasterGameTime.doPlayerTurnOver();
}

// Error classes
class InvalidPhaseProgressionError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidPhaseProgressionError";
    }
}