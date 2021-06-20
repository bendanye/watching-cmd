const sound = require('sound-play');

const path = require('path');
const SOUND_DIRECTORY = path.join(__dirname, '..', 'sounds');

export const playSuccessSoundAsync = () => {
    sound.play(path.join(SOUND_DIRECTORY, 'success.wav'));
};

export const playFailSoundAsync = () => {
    sound.play(path.join(SOUND_DIRECTORY, 'fail.wav'));
};
