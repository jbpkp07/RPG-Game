"use strict";


//=================================================================================================
//Note:  For this assignment Jason has challenged me to do this WITHOUT using 
//       an object-oriented approach (Mostly, no classes used, just a few static defined objects).
//       While I can't "unsee" the benefits of architecting solutions using an OO'd-heavy approach,
//       the following is an attempt at doing this through a mostly procedural approach.
//       #StayChallenged   :-)
//=================================================================================================



//Global Variables-------------------------------------------------------------
let bgImg;
let startBtn;
let selectPlayerText;
let selectOpponentText;
let attackBtn;
let opponentDefeated;

let humanPlayer;
let activeOpponent;
let players = [];

let intervalID;

let attackPowerGain;

let areSelectListenersActive = false;


//Global Objects --------------------------------------------------------------
let yoda = {
    name: "Yoda",
    element: null,
    healthPoints: null,
    attackPower: null,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#yodaIMG",
    imgLeft: "./assets/images/yoda-left.png",
    imgRight: "./assets/images/yoda-right.png",
    imgUsed: "./assets/images/yoda-left.png",

    initialize: function () {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100;
        this.attackPower = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
        this.isDefeated = false;
        this.isHumanPlayer = false;
        this.isActiveOpponent = false;
    }
};

let leia = {
    name: "Leia",
    element: null,
    healthPoints: null,
    attackPower: null,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#leiaIMG",
    imgLeft: "./assets/images/leia-left.png",
    imgRight: "./assets/images/leia-right.png",
    imgUsed: "./assets/images/leia-left.png",

    initialize: function () {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100;
        this.attackPower = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
        this.isDefeated = false;
        this.isHumanPlayer = false;
        this.isActiveOpponent = false;
    }
};

let vader = {
    name: "Vader",
    element: null,
    healthPoints: null,
    attackPower: null,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#vaderIMG",
    imgLeft: "./assets/images/vader-left.png",
    imgRight: "./assets/images/vader-right.png",
    imgUsed: "./assets/images/vader-left.png",

    initialize: function () {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100;
        this.attackPower = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
        this.isDefeated = false;
        this.isHumanPlayer = false;
        this.isActiveOpponent = false;
    }
};

let luke = {
    name: "Luke",
    element: null,
    healthPoints: null,
    attackPower: null,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#lukeIMG",
    imgLeft: "./assets/images/luke-left.png",
    imgRight: "./assets/images/luke-right.png",
    imgUsed: "./assets/images/luke-left.png",

    initialize: function () {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100;
        this.attackPower = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
        this.isDefeated = false;
        this.isHumanPlayer = false;
        this.isActiveOpponent = false;
    }
};

let background = {
    imgStart: "url(./assets/images/starsWarsBG.jpg)",
    imgMatches: ["url(./assets/images/match1.jpg)", "url(./assets/images/match2.jpg)", "url(./assets/images/match3.jpg)"],
    imgHistory: [],

    getNewImg() {

        if (this.imgHistory.length === 3) {

            this.imgHistory = [];
        }

        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * this.imgMatches.length);
        }
        while (this.imgHistory.includes(randomIndex));

        this.imgHistory.push(randomIndex);

        return this.imgMatches[randomIndex];
    }
};


//Functions--------------------------------------------------------------------
function initialize() {

    bgImg = $("#bgImg");
    bgImg.css("background-image", background.imgStart);

    startBtn = $("#startLogoWrapper");
    selectPlayerText = $("#selectPlayer");
    selectOpponentText = $("#selectOpponent");
    attackBtn = $("#attack");
    opponentDefeated = $("#opponentDefeated");

    startBtn.addClass("startLogoWrapper");
    startBtn.removeClass("startLogoWrapperFade");
    startBtn.show(0);
    startBtn.off("click");
    startBtn.click(startGame);

    selectPlayerText.removeClass("hidden");
    selectOpponentText.removeClass("hidden");
    attackBtn.removeClass("hidden");
    opponentDefeated.removeClass("hidden");

    selectPlayerText.hide(0);
    selectOpponentText.hide(0);
    attackBtn.hide(0);
    opponentDefeated.hide(0);

    yoda.element = $("#yodaWrapper");
    leia.element = $("#leiaWrapper");
    vader.element = $("#vaderWrapper");
    luke.element = $("#lukeWrapper");

    players = [yoda, leia, vader, luke];

    for (let player of players) {

        player.initialize();

        player.element.removeAttr("style");

        player.element.hide(0);

        player.element.find("#player").text("");
    }

    updateViewAllPlayers();

    attackPowerGain = Math.floor(Math.random() * (12 - 6)) + 6;

    assignSelectListeners();

    waitToStartGame();
}


function waitToStartGame() {

    let blurred;

    setTimeout(() => {

        startBtn.addClass("startLogoWrapperBlur");
        blurred = true;
    }, 10);

    intervalID = setInterval(() => {

        if (!blurred) {

            startBtn.addClass("startLogoWrapperBlur");

            blurred = true;
        }
        else {

            startBtn.removeClass("startLogoWrapperBlur");

            blurred = false;
        }

    }, 1500);
}


function startGame() {

    clearInterval(intervalID);

    startBtn.removeClass("startLogoWrapperBlur");

    setTimeout(() => {

        startBtn.addClass("startLogoWrapperFade");

        setTimeout(() => {

            startBtn.hide(0);

            selectPlayer();
        }, 5000);

    }, 1500);
}


function selectPlayer() {

    let durationMS = 2000;
    let delayMs = 333;

    for (let player of players) {

        player.element.show(0);

        setTimeout(() => {

            updateViewForPlayer(player);

            if (player === players[players.length - 1]) {

                player.element.animate({ top: '50%' }, durationMS).promise().done(() => {

                    areSelectListenersActive = true;

                    selectPlayerText.fadeIn(1000);
                });
            }
            else {

                player.element.animate({ top: '50%' }, durationMS);
            }

        }, delayMs);

        delayMs += 333;

        player.element.off("click");

        player.element.click(() => {

            if (areSelectListenersActive) {

                areSelectListenersActive = false;

                updateViewAllPlayers();

                player.isHumanPlayer = true;

                player.element.fadeOut(1000).promise().done(() => {

                    player.element.hide(0);
                });

                selectPlayerText.fadeOut(1000).promise().done(() => {

                    selectPlayerText.hide(0);

                    selectOpponent();
                });
            }
        });
    }
}


function selectOpponent() {

    setTimeout(() => {

        selectOpponentText.fadeIn(1000).promise().done(() => {

            areSelectListenersActive = true;
        });
    }, 3000);

    for (let opponent of players) {

        opponent.element.off("click");

        if (!opponent.isDefeated && !opponent.isHumanPlayer) {

            opponent.element.fadeOut(1000).promise().done(() => {

                opponent.element.css("top", "-50%");

                opponent.element.show(0);

                updateViewForPlayer(opponent);

                setTimeout(() => {

                    opponent.element.animate({ top: '50%' }, 2000);
                });
            });
        }

        if (opponent.isHumanPlayer || opponent.isDefeated) {

            opponent.element.fadeOut(1000);
        }

        opponent.element.click(() => {

            if (areSelectListenersActive) {

                areSelectListenersActive = false;

                updateViewAllPlayers();

                opponent.isActiveOpponent = true;

                for (let player of players) {

                    if (player === opponent) {

                        setTimeout(() => {

                            player.element.fadeOut(1000).promise().done(() => {

                                player.element.hide(0);
                            });

                            selectOpponentText.fadeOut(1000).promise().done(() => {

                                selectOpponentText.hide(0);

                                beginMatches();
                            });

                        }, 1000);
                    }
                    else {

                        player.element.fadeOut(1000).promise().done(() => {

                            player.element.hide(0);
                        });
                    }
                }
            }
        });
    }
}


function beginMatches() {

    for (let player of players) {

        if (player.isHumanPlayer) {

            humanPlayer = player;

            humanPlayer.element.css("left", "25%");

            humanPlayer.element.css("top", "-50%");

            humanPlayer.element.show(0);
        }
        else if (player.isActiveOpponent) {

            activeOpponent = player;

            activeOpponent.element.css("left", "65%");

            activeOpponent.element.css("top", "-50%");

            activeOpponent.element.show(0);
        }
    }

    if (!humanPlayer.isDefeated) {

        setTimeout(() => {

            updateViewForPlayer(humanPlayer);

            updateViewForPlayer(activeOpponent);

            startMatch();

        }, 500); //allow elements to have established position to determine image orientation
    }
}


function startMatch() {

    let durationMS = 2000;

    bgImg.css("background-image", background.getNewImg());

    setTimeout(() => {

        attackBtn.fadeIn(durationMS).promise().done(() => {

            attackBtn.off("click");

            attackBtn.click(() => {
    
                if (!humanPlayer.isDefeated && !activeOpponent.isDefeated) {
    
                    attack();
                }
            });
        });
    }, 2000);

    humanPlayer.element.animate({ top: '50%' }, durationMS);

    activeOpponent.element.animate({ top: '50%' }, durationMS);
}


function attack() {

    humanPlayer.healthPoints -= activeOpponent.attackPower;

    activeOpponent.healthPoints -= humanPlayer.attackPower;

    humanPlayer.attackPower += attackPowerGain;

    if (humanPlayer.healthPoints <= 0) {

        humanPlayer.healthPoints = 0;

        humanPlayer.isDefeated = true;
    }

    if (activeOpponent.healthPoints <= 0) {

        activeOpponent.healthPoints = 0;

        activeOpponent.isDefeated = true;
    }

    updateViewForPlayer(humanPlayer);

    updateViewForPlayer(activeOpponent);

    if (humanPlayer.isDefeated) {

        attackBtn.fadeOut(1000).promise().done(() => {

            attackBtn.hide(0);
        });

        setTimeout(() => {

            let confirmed = confirm("You Lose...  Click OK to restart game.");

            if (confirmed) {

                initialize();
            }

        }, 2000);
    }
    else if (activeOpponent.isDefeated) {

        activeOpponent.isActiveOpponent = false;

        attackBtn.fadeOut(1000).promise().done(() => {

            attackBtn.hide(0);

            opponentDefeated.fadeIn(1000).promise().done(() => {

                setTimeout(() => {

                    opponentDefeated.fadeOut(1000).promise().done(() => { 

                        opponentDefeated.hide(0); 
                    
                        let hasWon = true;

                        for (let player of players) {

                            if (!player.isHumanPlayer  &&  !player.isDefeated) {

                                hasWon = false;
                            }
                        }

                        if (hasWon) {

                            let confirmed = confirm("You WIN!!!  Click OK to restart game.");

                            if (confirmed) {
                
                                initialize();
                            }
                        }
                        else {

                            selectOpponent();
                        }
                    });

                }, 2000);
            });
        });
    }
}


function updateViewAllPlayers() {

    for (let player of players) {

        updateViewForPlayer(player);
    }
}


function updateViewForPlayer(player) {

    player.element.removeClass("playerSelect playerBlur");

    player.element.addClass("playerBorder");

    setPlayerIMGOrientation(player);

    player.element.find("#name").text(player.name);

    player.element.find(player.imgElement).attr("src", player.usedIMG);

    player.element.find(player.imgElement).attr("alt", player.name);

    player.element.find("#hp").html("Health Points: &nbsp;" + player.healthPoints);

    player.element.find("#ap").html("Attack Power: &nbsp;" + player.attackPower);

    if (player.isHumanPlayer) {

        player.element.find("#player").text("(Player)");
    }
    else if (player.isActiveOpponent) {

        player.element.find("#player").text("(Opponent)");
    }
}


function setPlayerIMGOrientation(player) {

    let middleScreen = $(window).width() / 2;

    if (player.element.offset().left < middleScreen) {

        player.usedIMG = player.imgLeft;
    }
    else {

        player.usedIMG = player.imgRight;
    }
}


function assignSelectListeners() {

    for (let player of players) {

        player.element.off("mousemove");

        player.element.mousemove(() => {

            if (areSelectListenersActive) {

                player.element.removeClass("playerBorder");

                player.element.addClass("playerSelect");

                for (let otherPlayer of players) {

                    if (otherPlayer !== player) {

                        otherPlayer.element.addClass("playerBlur");
                    }
                }
            }
        });

        player.element.off("mouseleave");

        player.element.mouseleave(() => {

            if (areSelectListenersActive) {

                player.element.removeClass("playerSelect");

                player.element.addClass("playerBorder");

                for (let otherPlayer of players) {

                    if (otherPlayer !== player) {

                        otherPlayer.element.removeClass("playerBlur");
                    }
                }
            }
        });
    }
}


//Calls------------------------------------------------------------------------
$(document).ready(initialize);

