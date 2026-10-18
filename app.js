const keys = document.querySelectorAll('.key');

const audioBase = 'https://cdn.jsdelivr.net/gh/fuhton/piano-mp3@master/';
const audioMap = {};

keys.forEach(key =>{
    const note = key.dataset.note;
    audioMapp[note] = new Audio(`${audioBase}${note}.mp3`);
});

function playNote(note, keyElement){
    if (!audioMap[note]) return;

    const sound = audioMap[note].cloneNode();
    sound.volume = 0.6;
    sound.play();

    keyElement.classList.add('active');

    setTimeout(() =>{
        keyElement.classList.remove('active');
    }, 150);
}

document.addEventListener('keydown', (e) =>{
    if (e.repeat) return;

    const keyPressed = e.key.toLowerCase();

    const keyElement = document.querySelector(`.key[dta-key="${keyPressed}"]`);

    if(keyElement){
        playNote(keyElement.dataset.note, keyElement);
    }
});

keys.forEach(key => {
    key.addEventListener('mousedown', ()=>{
        playNote(key.dataset.note, key);
    });

    key.addEventListener('touchstart', (e) => {
        e.preventDefault();
        playNote(key.dataset.note, key);
    });
});