import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    this.load.setPath("assets");
    this.load.image("logo", "title.png");
    this.load.spritesheet("life", "life.png", {
      frameWidth: 82,
      frameHeight: 82,
    });
    this.load.spritesheet("player", "player.png", {
      frameWidth: 150,
      frameHeight: 144,
    });
  }

  create() {
    /* Carrega o titulo do jogo */
    const logo = this.add
      .image(window.innerWidth / 2, -window.innerHeight * 0.2, "logo")
      .setDepth(100);

    /* Gera uma animação caindo para o titulo do jogo */
    this.tweens.add({
      targets: logo,
      y: window.innerHeight * 0.2,
      duration: 1000,
      ease: "Bounce",
    });

    /* Carrega o player do jogo */
    this.player = this.physics.add.sprite(
      window.innerWidth / 2,
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

    this.add
      .text(
        window.innerWidth / 2,
        window.innerHeight * 0.8,
        "Clique para começar!",
        {
          fontFamily: "Arial Black",
          fontSize: 28,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
        }
      )
      .setAlign("center")
      .setOrigin(0.5);

    /* Inicia  */
    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
