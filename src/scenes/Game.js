import { Scene } from "phaser";

export class Game extends Scene {
  /* Variavel que guarda a posição atual do player
  position: 0; means in the top
  position: 1; means in the middle
  position: 1; means in the bottom */
  playerPosition = {
    position: 1,
    coords: [
      { x: 150, y: window.innerHeight * 0.2 },
      { x: 150, y: window.innerHeight / 2 },
      { x: 150, y: window.innerHeight * 0.8 },
    ],
  };

  constructor() {
    super("Game");
  }

  init() {
    // Fadein camera quando a começa
    this.cameras.main.fadeIn(500);
  }

  create() {
    this.player = this.physics.add.sprite(
      150,
      window.innerHeight / 2,
      "player"
    );

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1 /* -1 means loop */,
    });

    this.player.anims.play("run");

    this.arrowUp = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );

    this.arrowDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.arrowUp)) {
      if (this.playerPosition.position !== 0) {
        let pos = (this.playerPosition.position -= 1);
        this.player.setPosition(
          this.playerPosition.coords[pos].x,
          this.playerPosition.coords[pos].y
        );
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.arrowDown)) {
      if (this.playerPosition.position !== 2) {
        let pos = (this.playerPosition.position += 1);
        this.player.setPosition(
          this.playerPosition.coords[pos].x,
          this.playerPosition.coords[pos].y
        );
      }
    }
  }
}
