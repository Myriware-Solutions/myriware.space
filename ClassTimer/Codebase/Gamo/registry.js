const DeckRegistry = {
    "debugone": {
        "001": 10,
        "003": 10,
        "004": 10,
        "005": 10
    },
    "debugtwo": {
        "002": 10,
        "004": 10
    }
}
// Card Registry
const CardDictionary = {
    "000": {
        "Name": "Empty",
        "Type": "Dualality",
        "Description": "There is nothing here.",
        "ATK": 0,
        "DEF": 0,
        "Effects": { }
    },
    "001": {
        "Name": "Soldier MKI",
        "Type": "Entity",
        "Description": "The Soldier is loyal to his cause.",
        "ATK": 100,
        "DEF": 100,
        "Effects": { }
    },
    "002": {
        "Name": "Soldier MKII",
        "Type": "Entity",
        "Description": "An experience Soldier.",
        "ATK": 200,
        "DEF": 200,
        "Effects": { }
    },
    "003": {
        "Name": "Soldier MKIII",
        "Type": "Entity",
        "Description": "A powerful Soldier.",
        "ATK": 300,
        "DEF": 300,
        "Effects": { }
    },
    "004": {
        "Name": "Call to Arms",
        "Type": "Protocal",
        "Description": "The Soldier calls to arms. [Effect] Draw 1 Card from the top of the Deck.",
        "ATK": 0,
        "DEF": 0,
        "Effects": {
            "MainUse": "DrawCard[1];"
        }
    },
    "005": {
        "Name": "Beam of the Sun",
        "Type": "Protocal",
        "Description": "The Sun's powerful ray. [Effect] Destroy any card on the field.",
        "ATK": 0,
        "DEF": 0,
        "Effects": {
            "MainUse": "DestroyCard[_];"
        }
    }
}