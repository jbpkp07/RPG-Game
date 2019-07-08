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

let players = [];

let intervalID;

let areSelectListenersActive = false;


//Global Objects --------------------------------------------------------------
let yoda = {
    name: "Yoda",
    element: null,
    healthPoints: 100,
    attackPower: 8,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#yodaIMG",
    imgLeft: "./assets/images/yoda-left.png",
    imgRight: "./assets/images/yoda-right.png",
    imgUsed: "./assets/images/yoda-left.png"
};

let leia = {
    name: "Leia",
    element: null,
    healthPoints: 120,
    attackPower: 5,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#leiaIMG",
    imgLeft: "./assets/images/leia-left.png",
    imgRight: "./assets/images/leia-right.png",
    imgUsed: "./assets/images/leia-left.png"
};

let vader = {
    name: "Vader",
    element: null,
    healthPoints: 150,
    attackPower: 20,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#vaderIMG",
    imgLeft: "./assets/images/vader-left.png",
    imgRight: "./assets/images/vader-right.png",
    imgUsed: "./assets/images/vader-left.png"
};

let luke = {
    name: "Luke",
    element: null,
    healthPoints: 180,
    attackPower: 25,
    isDefeated: false,
    isHumanPlayer: false,
    isActiveOpponent: false,
    imgElement: "#lukeIMG",
    imgLeft: "./assets/images/luke-left.png",
    imgRight: "./assets/images/luke-right.png",
    imgUsed: "./assets/images/luke-left.png"
};


//Functions--------------------------------------------------------------------
function initialize() {

    yoda.element = $("#yodaWrapper");
    leia.element = $("#leiaWrapper");
    vader.element = $("#vaderWrapper");
    luke.element = $("#lukeWrapper");

    players = [yoda, leia, vader, luke];

    assignSelectListeners();

    startBtn = $("#startLogoWrapper");
    startBtn.click(startGame);

    selectPlayerText = $("#selectPlayer");
    selectOpponentText = $("#selectOpponent");

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
                        console.log("Your Player Selected : " + player.name);
                        console.log(player);
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
            
                                startMatch();

                                console.log("Opponent Selected : " + opponent.name);
                                console.log(opponent);
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


function startMatch() {


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

    player.element.find(player.imgElement).attr("src", player.usedIMG);

    player.element.find(player.imgElement).attr("alt", player.name);

    player.element.find("#hp").text("HP:  " + player.healthPoints);
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

        player.element.hover(
            //Mouse in to
            () => {

                if (areSelectListenersActive) {

                    player.element.removeClass("playerBorder");

                    player.element.addClass("playerSelect");

                    for (let otherPlayer of players) {

                        if (otherPlayer !== player) {

                            otherPlayer.element.addClass("playerBlur");
                        }
                    }
                }
            },
            //Mouse out of
            () => {

                if (areSelectListenersActive) {

                    player.element.removeClass("playerSelect");

                    player.element.addClass("playerBorder");

                    for (let otherPlayer of players) {

                        if (otherPlayer !== player) {

                            otherPlayer.element.removeClass("playerBlur");
                        }
                    }
                }
            }
        );
    }
}

//Calls------------------------------------------------------------------------
$(document).ready(initialize);

