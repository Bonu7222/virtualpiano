const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioBuffers = {};
const keys = document.querySelectorAll('.key');
const audioBase = 'https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_grand_piano-mp3/';

keys.forEach(key => {
    const note = key.dataset.note;
    fetch(`${audioBase}${note}.mp3`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.arrayBuffer();
        })
        .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
        .then(buffer => {
            audioBuffers[note] = buffer;
        })
        .catch(err => console.error(`${note} xato:`, err));
});

function playNote(note, keyElement) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    keyElement.classList.add('active');
    setTimeout(() => {
        keyElement.classList.remove('active');
    }, 150);

    if (!audioBuffers[note]) {
        return;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffers[note];
    source.connect(audioCtx.destination);
    source.start(0);
}

document.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    const keyPressed = e.key.toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${keyPressed}"]`);
    if (keyElement) {
        playNote(keyElement.dataset.note, keyElement);
    }
});

keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        playNote(key.dataset.note, key);
    });

    key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(key.dataset.note, key);
    });
});