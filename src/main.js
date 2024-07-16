import { MainMenu } from "./scenes/MainMenu";
import { Game as MainGame } from "./scenes/Game";
import { AUTO, Scale, Game } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
  type: AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: "game-container",
  backgroundColor: "#fff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
    orientation: "landscape",
  },
  scene: [MainMenu, MainGame],
};

export default new Game(config);
