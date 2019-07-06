"use strict";

class View {

    constructor() {
        this._IsStartSequenceFinished = false;
    }

    startSequence() {

        this.hideStartBtn(2000);

        this.showInstructions(2000);

        this.hideInstructions(7000);

        this.hideGameTitle(7000);

        this.unZoomBackground(7000);

        this.hideStartGame(11000);

        this.showLettersGrid(11000);

        this.showCategoryStats(11000);

        this.showPhrase(11000);

        window.setTimeout(() => {
            this._IsStartSequenceFinished = true;
        }, 11000);
    }

    hideStartBtn(mSec) {

        document.getElementById("startBtn").className = "hideStartBtn";

        window.setTimeout(() => {
            document.getElementById("startBtn").style.visibility = "hidden";
        }, mSec);
    }

    showInstructions(mSec) {

        window.setTimeout(() => {
            document.getElementById("instructions").className = "showInstructions";
        }, mSec);
    }

    hideInstructions(mSec) {

        window.setTimeout(() => {
            document.getElementById("instructions").className = "fadeInstructions";
        }, mSec);
    }

    hideGameTitle(mSec) {

        window.setTimeout(() => {
            document.getElementById("gameTitle").className = "fadeGameTitle";
        }, mSec);
    }

    hideStartGame(mSec) {
        
        window.setTimeout(() => {
            document.getElementById("startGame").className = "hideStartGame";
        }, mSec);
    }

    unZoomBackground(mSec) {

        window.setTimeout(() => {
            document.getElementById("bg").className = "backgroundIMG";
        }, mSec);
    }

    showLettersGrid(mSec) {

        window.setTimeout(() => {
            document.getElementById("lettersContainer").className = "container-fluid lettersContainer";
        }, mSec);
    }

    showCategoryStats(mSec) {

        window.setTimeout(() => {
            document.getElementById("categoryStats").className = "fadeCategoryStats";
            window.setTimeout(() => { document.getElementById("categoryStats").className = "showCategoryStats"; }, 100);
        }, mSec);
    }

    showPhrase(mSec) {

        window.setTimeout(() => {
            document.getElementById("phrase").className = "fadePhrase";
            window.setTimeout(() => { document.getElementById("phrase").className = "showPhrase"; }, 100);
        }, mSec);
    }

    updateCategory(category) {
        document.getElementById("categoryText").textContent = category;
    }

    updatePhrase(phrase, isLoss) {

        let phraseElement = document.getElementById("phrase");

        if (isLoss) {

            phraseElement.className += " loss";

            window.setTimeout(() => {
                phraseElement.className = "showPhrase";
            }, 3000);
        }

        phraseElement.textContent = phrase;
    }

    updateGuessesRemaining(value, isCorrect) {

        let guessesRemainingElement = document.getElementById("guessesRemaining");

        if (!isCorrect) {

            guessesRemainingElement.className = "incorrect";

            window.setTimeout(() => {
                guessesRemainingElement.className = "correct";
            }, 1000);
        }

        document.getElementById("guessesRemaining").innerHTML = "Guesses Remaining : &nbsp;&nbsp;&nbsp;" + value.toString().padStart(6, "0");
    }

    updateWinsScore(wins, score, isLoss) {

        let winsScoreElement = document.getElementById("winsScore");

        if (isLoss) {

            winsScoreElement.className = "loss";

            window.setTimeout(() => {
                winsScoreElement.className = "win";
            }, 3000);
        }

        let update = "Wins : &nbsp;&nbsp;&nbsp;" + wins.toString().padStart(6, "0") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Score : &nbsp;&nbsp;&nbsp;" + score.toString().padStart(6, "0");

        winsScoreElement.innerHTML = update;
    }

    selectButton(btnElem, isPickCorrect) {
        
        if (isPickCorrect) {
            btnElem.className = "letter-selected-correct";
        }
        else {
            btnElem.className = "letter-selected-wrong";
        }
    }

    unSelectButton(btnElem) {
        btnElem.className = "letter";
    }

    get isStartSequenceFinished() { return this._IsStartSequenceFinished; }
    set isStartSequenceFinished(value) { throw new Error("Class:View:isStartSequenceFinished is PRIVATE"); }
}