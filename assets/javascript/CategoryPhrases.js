"use strict";

class CategoryPhrases {

    constructor() {

        this._History = [];
        this._CategoryPhrasesList = [];

        this.addHardwarePhrase("CPU");
        this.addHardwarePhrase("Memory");
        this.addHardwarePhrase("Processor");
        this.addHardwarePhrase("Firewall");
        this.addHardwarePhrase("Ethernet");
        this.addHardwarePhrase("Motherboard");
        this.addHardwarePhrase("Graphics Card");
        this.addHardwarePhrase("Fiber Adapter");
        this.addHardwarePhrase("File Server");
        this.addHardwarePhrase("Terminal Server");

        this.addSoftwareDevelopmentPhrase("Inheritance");
        this.addSoftwareDevelopmentPhrase("Overloading");
        this.addSoftwareDevelopmentPhrase("Constructor");
        this.addSoftwareDevelopmentPhrase("Polymorphism");
        this.addSoftwareDevelopmentPhrase("Interpreter");
        this.addSoftwareDevelopmentPhrase("Database Connector");
        this.addSoftwareDevelopmentPhrase("Private Member");
        this.addSoftwareDevelopmentPhrase("Just In Time Compilation");
        this.addSoftwareDevelopmentPhrase("Tokenization");
        this.addSoftwareDevelopmentPhrase("Regular Expression");

        this.addApplicationPhrase("Text Editor");
        this.addApplicationPhrase("PDF Reader");
        this.addApplicationPhrase("Adobe Photoshop");
        this.addApplicationPhrase("Microsoft Excel");
        this.addApplicationPhrase("Filezilla FTP Client");
        this.addApplicationPhrase("Apple Final Cut Pro");
        this.addApplicationPhrase("Google Chrome");
        this.addApplicationPhrase("Mozilla Firefox");
        this.addApplicationPhrase("Microsoft Visual Studio");
        this.addApplicationPhrase("Adobe Illustrator");

        this.addOperatingSystemPhrase("Windows Vista");
        this.addOperatingSystemPhrase("Windows Server");
        this.addOperatingSystemPhrase("Sun Solaris");
        this.addOperatingSystemPhrase("macOS High Sierra");
        this.addOperatingSystemPhrase("CentOS Linux");
        this.addOperatingSystemPhrase("Ubuntu Linux");
        this.addOperatingSystemPhrase("Debian Linux");
        this.addOperatingSystemPhrase("Red Hat Linux");
        this.addOperatingSystemPhrase("Apple iOS");
        this.addOperatingSystemPhrase("Google Android");

        this.addMiscellaneousPhrase("Ctrl Alt Delete");
        this.addMiscellaneousPhrase("Blind Carbon Copy");
        this.addMiscellaneousPhrase("Remote Desktop Session");
        this.addMiscellaneousPhrase("Reply All");
        this.addMiscellaneousPhrase("Concatenate");
        this.addMiscellaneousPhrase("Contiguous");
        this.addMiscellaneousPhrase("Copy Paste");
        this.addMiscellaneousPhrase("Telnet Session");
        this.addMiscellaneousPhrase("SSH Certificate");
        this.addMiscellaneousPhrase("IP Address");
    }

    addHardwarePhrase(phrase) {

        this._CategoryPhrasesList.push(new CategoryPhrase("Hardware", phrase));
    }

    addSoftwareDevelopmentPhrase(phrase) {

        this._CategoryPhrasesList.push(new CategoryPhrase("Software Development", phrase));
    }

    addApplicationPhrase(phrase) {

        this._CategoryPhrasesList.push(new CategoryPhrase("Application", phrase));
    }

    addOperatingSystemPhrase(phrase) {

        this._CategoryPhrasesList.push(new CategoryPhrase("Operating System", phrase));
    }

    addMiscellaneousPhrase(phrase) {

        this._CategoryPhrasesList.push(new CategoryPhrase("Miscellaneous", phrase));
    }

    getNextPhrase() {

        let nextPhrase;

        do {
            if (this._CategoryPhrasesList.length === this._History.length) {

                console.log("Out Of Phrases, Starting Over Sequence");

                this._History.shift(); //remove first element
            }

            let i = Math.floor(Math.random() * this._CategoryPhrasesList.length);

            nextPhrase = this._CategoryPhrasesList[i];

            if (!this._History.includes(nextPhrase)) {

                this._History.push(nextPhrase);

                break;
            }
        }
        while (this._History.includes(nextPhrase));

        return nextPhrase;
    }

    get categoryPhrasesList() { return this._CategoryPhrasesList; }
    set categoryPhrasesList(value) { throw new Error("Class:CategoryPhrases:categoryPhrasesList is PRIVATE"); }
}


class CategoryPhrase {

    constructor(category, phrase) {

        this._Category      = category;
        this._Phrase        = phrase;
        this._DisplayPhrase = "";
        this._LettersList   = [];

        this.buildLettersList();
        
        this.updateDisplayPhrase();
    }

    buildLettersList() {

        for (let ch of this._Phrase) {

            this._LettersList.push(new Letter(ch.toUpperCase()));
        }
    }

    updateDisplayPhrase() {

        this._DisplayPhrase = "";

        for (let ltr of this._LettersList) {

            if (ltr.hasPicked === true) {
                this._DisplayPhrase += ltr.letter;
            }
            else {
                this._DisplayPhrase += "_";
            }
        }
    }

    updateNewLetterPicked(btnElem) {

        let isPickCorrect = false;
        let newLetterSelected = btnElem.textContent;

        for (let ltr of this._LettersList) {

            if (ltr.letter === newLetterSelected && ltr.hasPicked === false) {

                ltr.markAsPicked();

                isPickCorrect = true;
            }
        }

        this.updateDisplayPhrase();

        return isPickCorrect;
    }

    areAllLettersPicked() {

        if (!this._LettersList.some((ltr) => ltr.hasPicked === false)) {

            return true;
        }

        return false;
    }

    resetLettersList() {

        for (let letter of this._LettersList) {

            letter.resetAsPicked();
        }

        this.updateDisplayPhrase();
    }

    get category() { return this._Category; }
    set category(value) { throw new Error("Class:CategoryPhrase:category is PRIVATE"); }

    get phrase() { return this._Phrase; }
    set phrase(value) { throw new Error("Class:CategoryPhrase:phrase is PRIVATE"); }

    get displayPhrase() { return this._DisplayPhrase; }
    set displayPhrase(value) { throw new Error("Class:CategoryPhrase:displayPhrase is PRIVATE"); }

    get lettersList() { return this._LettersList; }
    set lettersList(value) { throw new Error("Class:CategoryPhrase:lettersList is PRIVATE"); }
}


class Letter {

    constructor(letter) {

        this._Letter = letter;

        if (this._Letter === " ") {
            this._HasPicked = true;
        }
        else {
            this._HasPicked = false;
        }
    }

    markAsPicked() {

        this._HasPicked = true;
    }

    resetAsPicked() {

        if (this._Letter !== " ") {
            this._HasPicked = false;
        }
    }

    get letter() { return this._Letter; }
    set letter(value) { throw new Error("Class:Letter:letter is PRIVATE"); }

    get hasPicked() { return this._HasPicked; }
    set hasPicked(value) { throw new Error("Class:Letter:hasPicked is PRIVATE"); }
}