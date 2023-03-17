const btnDescriptions = [
    { file: 'sound1.mp3', hue: 120 },
    { file: 'sound2.mp3', hue: 0 },
    { file: 'sound3.mp3', hue: 60 },
    { file: 'sound4.mp3', hue: 240 },
]

class Button {
    constructor(desc, el) {
        this.el = el;
        this.hue = desc.hue;
        this.sound = loadSound(desc.file);
        this.paint(25);
    }

    paint(level) {
        const bg = `hsl(${this.hue}), 100%, ${level}%`;
        this.el.style.backgroundColor = bg;
    }

    async press(volume) {
        this.paint(50);
        await this.play(volume);
        this.paint(25);
    }

    async play(volume = 1.0) {
        this.sound.volume = volume;
        await new Promise((resolve) => {
            this.sound.onended = resolve;
            this.sound.play();
        });
    }
}

class Game {
    buttons;
    allowPlayer;
    sequence;
    playerPlaybackPos;
    mistakeSound;

    constructor() {
        this.buttons = new Map();
        this.allowPlayer = false;
        this.sequence = [];
        this.playerPlaybackPos = 0;
        this.mistakeSound = loadSound('error.mp3');

        document.querySelectorAll('.game-button').forEach((el, i) => {
            if (i < btnDescriptions.length) {
                this.buttons.set(el.id, new Button(btnDescriptions[i], el));
            }
        });

        const playerNameEl = document.querySelector('.player-name');
        playerNameEl.textContent = this.getPlayerName();
    }

    async pressButton(button) {
        // console.log(button.id);
        if(this.allowPlayer) {
            this.allowPlayer = false;
            await this.buttons.get(button.id).press(1.0);
        }
    }

    async reset() {
        this.allowPlayer = false;
        this.playerPlaybackPos = 0;
        this.sequence = [];
        this.updateScore('--');
        await this.buttonDance(1);
        this.addButton();
        await this.playSequence();
        this.allowPlayer = true;
    }

    getPlayerName() {
        return localStorage.getItem('userName') ?? 'Mystery Player';
    }

    async playSequence() {

    }

    addButton() {

    }

    updateScore(score) {

    }

    async buttonDance(laps = 1) {
        for(let step = 0; step < laps; step++) {
            for(const btn of this.buttons.values()) {
                await btn.press(0.0);
            }
        }
    }

    getRandomButton() {

    }

    saveScore(score) {

    }

    updateScores(userName, score, scores) {

    }
}

const game = new Game();

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
}

function loadSound(filename) {
    return new Audio('assets/' + filename);
}