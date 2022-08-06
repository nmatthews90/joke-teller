const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoicesRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'a6ef75cc544c4a5a8311e699381a07ce',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Joes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
       const response = await fetch(apiUrl);
       const data = await response.json();
       if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
       } else {
        joke = data.joke;
       }
       // Text-to-Speech
       tellMe(joke);
       // Disabled button
       toggleButton();
    } catch (error) {
        //Catch Errors
        console.log("Whoops", error)
    }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener('ended', toggleButton);