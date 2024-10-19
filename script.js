// script.js

const wordInput = document.getElementById('wordInput');
const displayWordsButton = document.getElementById('displayWordsButton');
const processDrawingButton = document.getElementById('processDrawingButton');
const output = document.getElementById('output');
const handwritingCanvas = document.getElementById('handwritingCanvas');
const ctx = handwritingCanvas.getContext('2d');
let drawing = false;

// Function to handle displaying words and clearing input
function handleDisplayWords() {
    const text = wordInput.value;
    displayWords(text);
    wordInput.value = ''; // Clear input
}

// Display words from input when button is clicked
displayWordsButton.addEventListener('click', handleDisplayWords);

// Display words from input when Enter key is pressed
wordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleDisplayWords();
        event.preventDefault(); // Prevent the default action of the Enter key (e.g., form submission)
    }
});

// Handwriting input handling
handwritingCanvas.addEventListener('mousedown', startDrawing);
handwritingCanvas.addEventListener('mousemove', draw);
handwritingCanvas.addEventListener('mouseup', stopDrawing);
handwritingCanvas.addEventListener('mouseout', stopDrawing);
handwritingCanvas.addEventListener('touchstart', startDrawing);
handwritingCanvas.addEventListener('touchmove', draw);
handwritingCanvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX || e.touches[0].clientX - handwritingCanvas.offsetLeft, e.offsetY || e.touches[0].clientY - handwritingCanvas.offsetTop);
    e.preventDefault();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineTo(e.offsetX || e.touches[0].clientX - handwritingCanvas.offsetLeft, e.offsetY || e.touches[0].clientY - handwritingCanvas.offsetTop);
    ctx.stroke();
    e.preventDefault();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

// Function to process the drawing and convert it to text using Tesseract.js
function processDrawing() {
    const dataUrl = handwritingCanvas.toDataURL('image/png');
    
    Tesseract.recognize(
        dataUrl,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        displayWords(text);
    }).catch(err => {
        console.error("Error during OCR: ", err);
    });
    //clear the canvas
    ctx.clearRect(0, 0, handwritingCanvas.width, handwritingCanvas.height);
}

// Add event listener for the process drawing button
processDrawingButton.addEventListener('click', processDrawing);

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