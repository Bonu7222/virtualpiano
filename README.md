# qwerty virtual peiano 

built this virtual piano bcs i wanted to make smth that actually plays sound. the idea was to map the keys exactly to a computer keyboard so you dont have to click with the mouse if u dont wanna

## features

-- qwerty layout: the white keys are a s d f g h j k l ; and the black keys are w e y u o p. it literally matches your keyboard.
-- 3d css design: the keys have shadows and they actually press down visually when you hit them.
-- real piano sounds: i used the web audio api so theres zero delay when u presss key and you can press multiple keys at once without the sounds cutting each other off. 
-- mobile support: works on touch screens too if you tap the keys.

## how to run

no setup needed. just open index.html in your browser and start playing.

## what i learned (and the bugs i fought)

this one was kinda painful at fisrt ngl

-- css math: getting the black keys to sit perfectly between the white keys using bosition: absolute and manual left picels took waaaayy longer than i thought.
-- audio hell: at first i just used `new Audio()` and tried to fetch mp3s from some random cdn. it gave me 404 errors and encoding errors. after googling for a while, i found out about the `AudioContext` and `decodeAudioData` from the web audio api. it's much more reliable and fixes the issue where sounds overlap and glitch out.

overall, it woorks pretty well now. i can actually play a few tunes on it. 