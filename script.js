// script.js

const wordInput = document.getElementById('wordInput');
const displayWordsButton = document.getElementById('displayWordsButton');
const output = document.getElementById('output');

// Display words from input
displayWordsButton.addEventListener('click', () => {
    const text = wordInput.value;
    displayWords(text);
});

// Display recognized words
function displayWords(text) {
    output.innerHTML = ''; // Clear previous output
    const words = text.split(/\s+/); // Split text into words
    words.forEach(word => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        output.appendChild(span);
    });

    const words_to_sound = document.querySelectorAll('.word');

    words_to_sound.forEach(word => {
        word.addEventListener('click', function() {
            const text = this.textContent;

            // Use a TTS API to convert text to speech
            const speech = new SpeechSynthesisUtterance(text);
            speech.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English'); // Adjust voice as needed
            speech.pitch = 1; // Set pitch for child-friendly voice
            speech.rate = 1; // Set rate for normal speed

            window.speechSynthesis.speak(speech);
        });
    });
}