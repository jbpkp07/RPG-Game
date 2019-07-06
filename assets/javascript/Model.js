"use strict";
/* global CategoryPhrases */

class Model {

    constructor() {

        this._CategoryPhrases = new CategoryPhrases();
        this._CurrentPhrase = null;
        this._Status = new PhraseStatus();
        this._LetterElementsSelected = [];

        this._GuessesRemaining = Model.initialGuesses;
        this._Wins = 0;
        this._Score = 0;

        this._BtnElements = [  
            this.A_Btn = document.getElementById("A-btn"),
            this.B_Btn = document.getElementById("B-btn"),
            this.C_Btn = document.getElementById("C-btn"),
            this.D_Btn = document.getElementById("D-btn"),
            this.E_Btn = document.getElementById("E-btn"),
            this.F_Btn = document.getElementById("F-btn"),
            this.G_Btn = document.getElementById("G-btn"),
            this.H_Btn = document.getElementById("H-btn"),
            this.I_Btn = document.getElementById("I-btn"),
            this.J_Btn = document.getElementById("J-btn"),
            this.K_Btn = document.getElementById("K-btn"),
            this.L_Btn = document.getElementById("L-btn"),
            this.M_Btn = document.getElementById("M-btn"),
            this.N_Btn = document.getElementById("N-btn"),
            this.O_Btn = document.getElementById("O-btn"),
            this.P_Btn = document.getElementById("P-btn"),
            this.Q_Btn = document.getElementById("Q-btn"),
            this.R_Btn = document.getElementById("R-btn"),
            this.S_Btn = document.getElementById("S-btn"),
            this.T_Btn = document.getElementById("T-btn"),
            this.U_Btn = document.getElementById("U-btn"),
            this.V_Btn = document.getElementById("V-btn"),
            this.W_Btn = document.getElementById("W-btn"),
            this.X_Btn = document.getElementById("X-btn"),
            this.Y_Btn = document.getElementById("Y-btn"),
            this.Z_Btn = document.getElementById("Z-btn")
        ];
    }

    static get initialGuesses() { return 7; }

    assignNextPhrase() {
    
        if (this._CurrentPhrase !== null) {

            this._LetterElementsSelected = [];

            this._CurrentPhrase.resetLettersList();
    
            this._GuessesRemaining = Model.initialGuesses;
    
            this._Status.resetStatus();
        }

        this._CurrentPhrase = this._CategoryPhrases.getNextPhrase();
    }

    newLetterElementSelected(btnElem) {

        this._LetterElementsSelected.push(btnElem);

        let isPickCorrect = this._CurrentPhrase.updateNewLetterPicked(btnElem);

        this.adjustRemainingGuesses(isPickCorrect);

        this.updateStatus(isPickCorrect);

        this.adjustWinsAndScore();
    }

    adjustRemainingGuesses(isPickCorrect) {

        if (!isPickCorrect && this._GuessesRemaining !== 0) {

            this._GuessesRemaining--;
        }
    }

    updateStatus(isPickCorrect) {

        this._Status.isPickCorrect = isPickCorrect;

        if (this._GuessesRemaining === 0) {

            this._Status.status = PhraseStatus.failed;
        }
        else if (this._CurrentPhrase.areAllLettersPicked()) {

            this._Status.status = PhraseStatus.guessed;
        }
    }

    adjustWinsAndScore() {

        if (this._Status.status !== PhraseStatus.continue) {

            if (this._Status.status === PhraseStatus.guessed) {

                this._Wins++;

                if (this._GuessesRemaining === Model.initialGuesses) {

                    this._Score += 1000;
                }
                else {
                    this._Score += this._GuessesRemaining * 100;
                }
            }
            else if (this._Status.status === PhraseStatus.failed) {
      
                this._Score -= 1000;

                if (this._Score < 0) {

                    this._Score = 0;
                }
            }
        }
    }

    get guessesRemaining() { return this._GuessesRemaining; }
    set guessesRemaining(value) { throw new Error("Class:Model:guessesRemaining is PRIVATE"); }

    get wins() { return this._Wins; }
    set wins(value) { throw new Error("Class:Model:wins is PRIVATE"); }

    get score() { return this._Score; }
    set score(value) { throw new Error("Class:Model:score is PRIVATE"); }

    get btnElements() { return this._BtnElements; }
    set btnElements(value) { throw new Error("Class:Model:btnElements is PRIVATE"); }

    get currentPhrase() { return this._CurrentPhrase; }
    set currentPhrase(value) { throw new Error("Class:Model:currentPhrase is PRIVATE"); }

    get getStatus() { return this._Status; }
    set getStatus(value) { throw new Error("Class:Model:getStatus is PRIVATE"); }

    get letterElementsSelected() { return this._LetterElementsSelected; }
    set letterElementsSelected(value) { throw new Error("Class:Model:letterElementsSelected is PRIVATE"); }
}


class PhraseStatus {

    constructor() {

        this._IsPickCorrect = false;

        this._Status = PhraseStatus.continue;
    }

    static get guessed() { return "GUESSED"; }

    static get failed() { return "FAILED"; }

    static get continue() { return "CONTINUE"; }

    resetStatus() {

        this._IsPickCorrect = false;

        this._Status = PhraseStatus.continue;
    }

    get isPickCorrect() { return this._IsPickCorrect; }
    set isPickCorrect(value) { this._IsPickCorrect = value; }

    get status() { return this._Status; }
    set status(value) { this._Status = value; }
}