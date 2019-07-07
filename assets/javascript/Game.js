"use strict";

//-----------------------------------------------------------------------------
//Note:  For this assignment Jason has challenged me to do this WITHOUT using 
//       an object-oriented approach.
//       While I can't "unsee" the benefits of architecting solutions using an OO approach,
//       the following is an attempt at doing this through a procedural approach.
//       #StayChallenged   :-)
//-----------------------------------------------------------------------------

//Global Variables-------------------------------------------------------------
let startBtn;

let yoda;
let leia;
let vader;
let luke;
let players = [];

let intervalID;


//Objects ---------------------------------------------------------------------



//Functions--------------------------------------------------------------------
function initialize() {

    yoda = $("#yodaWrapper");
    leia = $("#leiaWrapper");
    vader = $("#vaderWrapper");
    luke = $("#lukeWrapper");

    players = [yoda, leia, vader, luke];

    startBtn = $("#startLogoWrapper");
    startBtn.click(startGame);

    waitToStartGame();
}

function waitToStartGame() {

    let blurred;

    setTimeout( () => {

        startBtn.addClass("startLogoWrapperBlur");
        blurred = true;
    }, 10);

    intervalID = setInterval( () => {

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

    setTimeout( () => {

        startBtn.addClass("startLogoWrapperFade");

        setTimeout( () => {

            startBtn.attr("class", "hidden");

            selectPlayer();
        }, 5000);

    }, 1500);
}

function selectPlayer() {

    let durationMS = 2000;
    let delayMs = 0;

    for (let player of players) {

        player.removeClass("hidden");

        setTimeout( () => {

            if (player === players[players.length - 1]) {

                player.animate({ top: '50%' }, durationMS).promise().done( () => {
                        assignSelectListeners();
                    });
            }
            else {

                player.animate({ top: '50%' }, durationMS);
            }

        }, delayMs);

        delayMs += 333;   
    }
}

function assignSelectListeners() {

    for (let player of players) {

        player.click( () => {
            alert(player.attr("value"));
        });

        player.hover(
            () => {
                
                player.removeClass("playerBorder");
                
                player.addClass("playerSelect");
    
                for (let otherPlayer of players) {
    
                    if (otherPlayer !== player) {
    
                        otherPlayer.addClass("playerBlur");
                    }
                }
            },
            () => {
                
                player.removeClass("playerSelect");
                
                player.addClass("playerBorder");
    
                for (let otherPlayer of players) {
    
                    if (otherPlayer !== player) {
    
                        otherPlayer.removeClass("playerBlur");
                    }
                }
            }
        );
    }
}

//Calls------------------------------------------------------------------------
$(document).ready(initialize);

