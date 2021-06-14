//const player = require('play-sound')(opts = {});

const player = require('play-sound')();
const sound = require("sound-play");

const path = require('path')
const SOUND_DIRECTORY = path.join(__dirname, "..", "sounds");

export const playSuccessSoundAsync = () => {
    //playSoundAsync(`${SOUND_DIRECTORY}/success.wav`);
    sound.play(path.join(SOUND_DIRECTORY, "success.wav"));
};

export const playFailSoundAsync = () => {
    //playSoundAsync(`${SOUND_DIRECTORY}/fail.wav`);
    sound.play(path.join(SOUND_DIRECTORY, "fail.wav"));
};

const playSoundAsync = (soundName: string) => {
    player.play(soundName, function (err: any) {
        if (err) throw err;
    });
};
