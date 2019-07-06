"use strict";

//-----------------------------------------------------------------------------
//Note:  For this assignment Jason has challenged me to do this WITHOUT using 
//       an object-oriented approach.
//       While I can't "unsee" the benefits of architecting soltutions using an OO approach,
//       the following is an attempt at doing this through a procedural approach.
//       #StayChallenged   :-)
//-----------------------------------------------------------------------------



//Global Variables-------------------------------------------------------------
let waitToInterval;
const startBtn = $("#startLogoWrapper");


//Objects / Listeners----------------------------------------------------------
startBtn.click(startGame);


//Functions--------------------------------------------------------------------
function waitToStartGame() {

    let blurred;

    setTimeout(() => {

        startBtn.addClass("startLogoWrapperBlur");
        blurred = true;
    }, 10);

    waitToInterval = setInterval(() => {

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

    clearInterval(waitToInterval);

    startBtn.removeClass("startLogoWrapperBlur");

    setTimeout(() => {

        startBtn.addClass("startLogoWrapperFade"); 
        
        setTimeout(() => {
            startBtn.attr("class", "startLogoWrapperHide");
        }, 5000);

    }, 1500);
}

//Calls------------------------------------------------------------------------
waitToStartGame();

