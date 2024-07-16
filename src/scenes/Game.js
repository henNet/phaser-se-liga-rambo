import { Scene } from "phaser";

export class Game extends Scene {
  /* Variavel que guarda a posição atual do player
  position: 0; means in the top
  position: 1; means in the middle
  position: 1; means in the bottom */
  playerPosition = {
    position: 1,
    coords: [
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.2 },
      { x: window.innerWidth * 0.1, y: window.innerHeight / 2 },
      { x: window.innerWidth * 0.1, y: window.innerHeight * 0.8 },
    ],
  };

  constructor() {
    super("Game");
  }

  init() {
    // Fadein camera quando a começa
    this.cameras.main.fadeIn(500);
    this.scale.startFullscreen();
  }

  create() {
    /* Carregamento da vida */
    this.lifes = this.physics.add.group({
      key: "life",
      repeat: 2,
      // setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.anims.create({
      key: "bounce",
      frames: this.anims.generateFrameNumbers("life", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1 /* -1 means loop */,
    });

    this.lifes.children.iterate(function (child) {
      let pos = Math.floor(Phaser.Math.FloatBetween(0, 3));
      let coords = [
        window.innerHeight * 0.2,
        window.innerHeight / 2,
        window.innerHeight * 0.8,
      ];
      console.log(pos);
      child.setPosition(
        window.innerWidth + Phaser.Math.FloatBetween(0, 100),
        coords[pos]
      );
      child.anims.play("bounce");
    });

    /* Carregamento do Player */
    this.player = this.physics.add.sprite(
      window.innerWidth * 0.1,
      window.innerHeight / 2,
      "player"
    );

    if (window.innerHeight < 500) {
      this.player.setScale(0.8).refreshBody();
    }

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1 /* -1 means loop */,
    });

    this.player.anims.play("run");

    /* Movimentação do Player */
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

    this.lifes.children.iterate(function (child) {
      child.setVelocityX(-100);
    });
  }
}
