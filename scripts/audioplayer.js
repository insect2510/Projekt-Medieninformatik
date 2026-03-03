// call audioplayer 

audioPlayer();




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
            let htmlAudioPlayer = "";

            // chech if array has no entries
            // if so, write a message into html

            if (myArr.length == 0) {
                htmlAudioPlayer += "<p>audio files yet. Want to upload some?</p>"
            }
            else

                // if arrays has entries, construct html from array

                for (x = 0; x < myArr.length; x++) {

                    htmlAudioPlayer += "<li>";
                    htmlAudioPlayer += "<audio src='assets/audio/" + myArr[x].filename + "'></audio>";
                    htmlAudioPlayer += "<p>" + (x+1) + ". " + myArr[x].trackname + "</p>";
                    htmlAudioPlayer += "<button class='toggle'>Play</button>";
                    htmlAudioPlayer += "</li>";
                }


            // write constructed html into DOM

            document.getElementById("audioplayer").innerHTML = htmlAudioPlayer;

            document.querySelectorAll(".grid-audio-player li").forEach(li => {
                const audio = li.querySelector("audio");

                li.querySelector(".toggle").addEventListener("click", () => {
                    if (audio.paused) {
                        audio.play();
                        li.querySelector(".toggle").textContent = "Stop";
                        li.style.backgroundColor = "silver";
                    } else {
                        audio.pause();
                        li.querySelector(".toggle").textContent = "Play";
                        li.style.backgroundColor = "#333";
                    }
                });
            });

        };
    }
}