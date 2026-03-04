// call audioplayer 

audioPlayer();
audioPlayer2();



// --- Audioplayer ---

function audioPlayer() {

    // check if id audioplayer is loaded
    // if so, run function
    if (document.getElementById("audioplayer") != null) {

        let myArr;
        let myObj;
        let myArrLenght;

        // start to load data for audioplayer
        loadData();

        // load json data
        async function loadData() {

            // check if an error occurs while loading

            try {

                // load and parse concert-dates.json

                const response = await fetch("data/music.json");
                const myObj = await response.json();

                // set json data to an array

                myArr = myObj;

            }

            // if an error occured, write error message to html
            catch (error) {
                document.getElementById("audioplayer").innerHTML = "<p>Error loading data. Please try again later.</p>"
                return
            }

            writeHtmlAudioPlayer(myArr)
        }

        // construct html from the loaded date

        function writeHtmlAudioPlayer(myArr) {

            let x = 0;
            let y = 0;
            let htmlAudioPlayer = "";

            // chech if array has no entries
            // if so, write a message into html

            if (myArr.length == 0) {
                htmlAudioPlayer += "<p>audio files yet. Want to upload some?</p>"
            }
            else

                // if arrays has entries, construct html

                // contruct tracklist from array
                htmlAudioPlayer += "<h3>Tracklist</h3>";
            htmlAudioPlayer += "<ul class='tracklist'>";

            for (y = 0; y < myArr.length; y++) {
                htmlAudioPlayer += "<li>" + (y + 1) + ". " + myArr[y].trackname + "</li>";
            }
            htmlAudioPlayer += "</ul>";

            // Contruct Play Buttons
            x = 0;
            htmlAudioPlayer += "<ul class='play-buttons'>";
            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<button id='prev'>";
            htmlAudioPlayer += "PREV";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<audio src='assets/audio/" + myArr[x].filename + "'></audio>";
            htmlAudioPlayer += "<button class='toggle'>" + myArr[x].trackname + "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "<li>";
            htmlAudioPlayer += "<button id='next'>";
            htmlAudioPlayer += "NEXT";
            htmlAudioPlayer += "</button>";
            htmlAudioPlayer += "</li>";
            htmlAudioPlayer += "</ul>";

            // write constructed html into DOM

            document.getElementById("audioplayer").innerHTML = htmlAudioPlayer;

            const container = document.getElementById("audioplayer");
            const button = container.querySelector(".toggle");
            const audio = container.querySelector("audio");


            // add event listener to prev button

            const prev = document.getElementById("prev");

            prev.addEventListener("click", () => {
                if (x > 0) {
                    x--;
                    document.querySelector("audio").src = "assets/audio/" + myArr[x].filename;
                    document.querySelector(".toggle").textContent = myArr[x].trackname;
                    togglePlay();
                } else {
                    prev.classList.remove("active");
                }
            });

            // add event listener to next button

            const next = document.getElementById("next");

            next.addEventListener("click", () => {
                if (x < myArr.length - 1) {
                    x++;
                    document.querySelector("audio").src = "assets/audio/" + myArr[x].filename;
                    document.querySelector(".toggle").textContent = myArr[x].trackname;
                    togglePlay();
                } else {
                    prev.classList.remove("active");
                }
            });

            // add event listener to play button

            button.addEventListener("click", () => {
                togglePlay();
            });

            function togglePlay() {

                if (audio.paused) {
                    audio.play();
                    button.classList.add("active");
                } else {
                    audio.pause();
                    button.classList.remove("active");
                }
            }


        };
    }
}




function audioPlayer2() {

    // check if id audioplayer is loaded
    // if so, run function
    if (document.getElementById("audioplayer-2") != null) {

        let myArr2;
        let myObj2;
        let myArrLenght2;

        // start to load data for audioplayer
        loadData();

        // load json data
        async function loadData() {

            // check if an error occurs while loading

            try {

                // load and parse concert-dates.json

                const response = await fetch("data/music.json");
                const myObj2 = await response.json();

                // set json data to an array

                myArr2 = myObj2;

            }

            // if an error occured, write error message to html
            catch (error) {
                document.getElementById("audioplayer-2").innerHTML = "<p>Error loading data. Please try again later.</p>"
                return
            }

            writeHtmlAudioPlayer(myArr2)
        }

        // construct html from the loaded date

        function writeHtmlAudioPlayer(myArr) {

            let x = 0;
            let htmlAudioPlayer2 = "";

            // chech if array has no entries
            // if so, write a message into html

            if (myArr.length == 0) {
                htmlAudioPlayer2 += "<p>audio files yet. Want to upload some?</p>"
            }
            else

                // if arrays has entries, construct html from array

                for (x = 0; x < myArr.length; x++) {

                    htmlAudioPlayer2 += "<li>";
                    htmlAudioPlayer2 += "<audio src='assets/audio/" + myArr2[x].filename + "'></audio>";
                    // htmlAudioPlayer2 += "<p>" + (x+1) + ". " + myArr[x].trackname + "</p>";
                    htmlAudioPlayer2 += "<button class='toggle'>" + myArr2[x].trackname + "</button>";
                    htmlAudioPlayer2 += "</li>";
                }


            // write constructed html into DOM

            document.getElementById("audioplayer-2").innerHTML = htmlAudioPlayer2;

            document.querySelectorAll(".grid-audio-player-2 li").forEach(li => {
                const audio = li.querySelector("audio");

                li.querySelector(".toggle").addEventListener("click", () => {
                    if (audio.paused) {
                        audio.play();
                        // li.style.backgroundColor = "silver";
                        li.querySelector(".toggle").style.backgroundColor = "silver";
                    } else {
                        audio.pause();
                        // li.style.backgroundColor = "#333";
                        li.querySelector(".toggle").style.backgroundColor = "#333";
                    }
                });
            });

        };
    }
}