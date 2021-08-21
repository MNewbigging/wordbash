import { action, observable } from 'mobx';
import { LetterGenerator } from '../utils/LetterGenerator';
import { GameState } from './GameState';

export enum WordBashScreen {
  HOME = 'home',
  GAME = 'game',
}

export enum ViewMode {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export class WordBashState {
  @observable public screen = WordBashScreen.HOME;
  @observable public homeScreenExiting = false;

  @observable public viewMode = ViewMode.DESKTOP;
  public gameState?: GameState;

  private readonly maxMobileWidth = 768;

  constructor() {
    window.addEventListener('resize', this.onResize);
  }

  @action public playGame() {
    // Setup the game, with a fixed size for now
    const gameSize = 40;
    const letterGenerator = new LetterGenerator();
    const letters = letterGenerator.generateLetters(gameSize);

    this.gameState = new GameState(letters);

    // Once setup, start home screen exit animation
    this.homeScreenExiting = true;

    // Then show game screen after a delay to allow for above exit anim
    setTimeout(() => (this.screen = WordBashScreen.GAME), 1000);
  }

  @action private readonly onResize = () => {
    this.viewMode = window.innerWidth < this.maxMobileWidth ? ViewMode.MOBILE : ViewMode.DESKTOP;
  };
}
