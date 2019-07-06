"use strict";
/* global View, Model, PhraseStatus, CategoryPhrase */

class Controller {

    constructor() {

        this._View = new View();
        this._Model = new Model();
        this._PauseInput = false;
    }

    beginStartSequence() {

        document.getElementById("startBtn").addEventListener("click", (event) => {

            this._View.startSequence();
        });

        let hasFinishedPromise = this.createPromise(() => this._View.isStartSequenceFinished === true);

        return hasFinishedPromise;
    }

    createPromise(waitFunction) {

        const poll = (resolve) => {

            if (waitFunction()) {
                resolve();
            }
            else {
                setTimeout(() => poll(resolve), 100);
            }
        };

        return new Promise(poll);
    }

    assignListeners() {

        //Mouse listeners------------------------------------------------------
        for (let element of this._Model.btnElements) {

            element.addEventListener("click", (event) => { this.selectLetter(event.target); });
        }

        //Keyboard listeners---------------------------------------------------
        document.addEventListener("keyup", (event) => {

            let keyPressed = event.key.toUpperCase();

            for (let element of this._Model.btnElements) {

                if (element.textContent === keyPressed) {

                    this.selectLetter(element);
                }
            }
        });
    }

    selectLetter(btnElem) {

        if (!this._Model.letterElementsSelected.includes(btnElem) && !this._PauseInput) {

            this._Model.newLetterElementSelected(btnElem);

            this._View.updatePhrase(this._Model.currentPhrase.displayPhrase, false);

            this._View.updateGuessesRemaining(this._Model.guessesRemaining, this._Model.getStatus.isPickCorrect);

            this._View.updateWinsScore(this._Model.wins, this._Model.score, false);

            this._View.selectButton(btnElem, this._Model.getStatus.isPickCorrect);

            let status = this._Model.getStatus.status;

            if (status !== PhraseStatus.continue) {

                if (status === PhraseStatus.guessed) {
 
                    this.completedPhrase(true);
                }
                else if (status === PhraseStatus.failed) {
          
                    this.completedPhrase(false);
                }
            }
        }
    }

    completedPhrase(isGuessedCorrectly) {

        this._PauseInput = true;

        if (!isGuessedCorrectly) {

            this._View.updatePhrase(this._Model.currentPhrase.phrase, true); //reveal correct answer

            this._View.updateWinsScore(this._Model.wins, this._Model.score, true);
        }

        window.setTimeout(() => { 

            this.beginNextPhrase(); 

            this._PauseInput = false;

        }, 3000);
    }

    beginNextPhrase() {

        this.unSelectAllLetters();

        this._Model.assignNextPhrase();

        this._View.updateCategory(this._Model.currentPhrase.category);

        this._View.updatePhrase(this._Model.currentPhrase.displayPhrase, false);

        this._View.updateGuessesRemaining(this._Model.guessesRemaining, true);

        this._View.updateWinsScore(this._Model.wins, this._Model.score, false);
    }

    unSelectAllLetters() {

        for (let btnElem of this._Model.letterElementsSelected) {

            this._View.unSelectButton(btnElem);
        }
    }
}