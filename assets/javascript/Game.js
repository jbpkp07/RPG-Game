"use strict";


//=================================================================================================
//Note:  For this assignment Jason has challenged me to do this WITHOUT using 
//       an object-oriented approach (Mostly, no classes used, just a few static defined objects).
//       While I can't "unsee" the benefits of architecting solutions using an OO'd-heavy approach,
//       the following is an attempt at doing this through a mostly procedural approach.
//       #StayChallenged   :-)
//=================================================================================================



//Global Variables-------------------------------------------------------------
let startBtn;
let selectPlayerText;
let selectOpponentText;
let attackBtn;

let humanPlayer;
let activeOpponent;
let players = [];

let intervalID;

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

    initialize: function() {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100; 
        this.attackPower  = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
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

    initialize: function() {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100; 
        this.attackPower  = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
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

    initialize: function() {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100; 
        this.attackPower  = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
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

    initialize: function() {

        this.healthPoints = Math.floor(Math.random() * (180 - 100)) + 100; 
        this.attackPower  = Math.ceil((1 - ((this.healthPoints - 100) / 80)) * 20 + 5);
    }
};

let background = {
    imgStart: "url(./assets/images/match1.jpg)",
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

    yoda.element = $("#yodaWrapper");
    leia.element = $("#leiaWrapper");
    vader.element = $("#vaderWrapper");
    luke.element = $("#lukeWrapper");

    players = [yoda, leia, vader, luke];

    for (let player of players) {

        player.initialize();

        console.log(player);
    }

    assignSelectListeners();

    startBtn = $("#startLogoWrapper");
    startBtn.click(startGame);

    selectPlayerText = $("#selectPlayer");
    selectOpponentText = $("#selectOpponent");
    attackBtn = $("#attack");

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

            startBtn.attr("class", "hidden");

            selectPlayer();
        }, 5000);

    }, 1500);
}


function selectPlayer() {

    let durationMS = 2000;
    let delayMs = 0;

    updateViewAllPlayers();

    for (let player of players) {

        setTimeout(() => {

            if (player === players[players.length - 1]) {

                player.element.animate({ top: '50%' }, durationMS).promise().done(() => {

                    areSelectListenersActive = true;

                    selectPlayerText.removeClass("hidden").hide(0).fadeIn(1000);
                });
            }
            else {

                player.element.animate({ top: '50%' }, durationMS);
            }

        }, delayMs);

        delayMs += 333;

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

                    selectOpponentText.removeClass("hidden").hide(0).fadeIn(1000).promise().done(() => {

                        areSelectListenersActive = true;
                    });
                });

                selectOpponent();
            }
        });
    }
}


function selectOpponent() {

    for (let opponent of players) {

        opponent.element.off("click");

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

    $("#bgImg").css("background-image", background.getNewImg());

    attackBtn.removeClass("hidden").hide(0).fadeIn(durationMS).promise().done(() => {

        attackBtn.click(() => {
            alert("attacked");
        });
    });

    humanPlayer.element.animate({ top: '50%' }, durationMS).promise().done(() => {

       
    });

    activeOpponent.element.animate({ top: '50%' }, durationMS).promise().done(() => {

       
    });
}


function updateViewAllPlayers() {

    for (let player of players) {

        updateViewForPlayer(player);
    }
}


function updateViewForPlayer(player) {

    player.element.removeClass("hidden playerSelect playerBlur");

    player.element.addClass("playerBorder");

    setPlayerIMGOrientation(player);

    player.element.find("#name").text(player.name);

    if (player.isHumanPlayer) {

        player.element.find("#player").text("(Player)");
    }
    else if (player.isActiveOpponent) {

        player.element.find("#player").text("(Opponent)");
    }

    player.element.find(player.imgElement).attr("src", player.usedIMG);

    player.element.find(player.imgElement).attr("alt", player.name);

    player.element.find("#hp").text("HP: " + player.healthPoints);
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

