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
  @observable public loading = true;
  public gameState?: GameState;

  private wordsData?: Map<string, Set<string>>;
  private readonly maxMobileWidth = 768;

  constructor() {
    window.addEventListener('resize', this.onResize);

    this.loadWordData();
  }

  @action public playGame() {
    if (!this.wordsData) {
      return;
    }

    // Setup the game, with a fixed size for now
    const gameSize = 40;
    const letterGenerator = new LetterGenerator();
    const letters = letterGenerator.generateLetters(gameSize);

    this.gameState = new GameState(letters, this.wordsData);

    // Once setup, start home screen exit animation
    this.homeScreenExiting = true;

    // Then show game screen after a delay to allow for above exit anim
    setTimeout(() => (this.screen = WordBashScreen.GAME), 1000);
  }

  @action private async loadWordData() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const letters = alphabet.split('');
    const wordsMap = new Map<string, Set<string>>();

    // TODO - allow for published site path
    const basePath = 'dist/word-data/';

    for await (const letter of letters) {
      const filePath = basePath + `${letter}.txt`;
      const dictionary = await (await this.getDictionary(filePath)).split('\r\n');
      const set = new Set<string>(dictionary);
      wordsMap.set(letter, set);
    }

    this.wordsData = wordsMap;
    this.loading = false;
  }

  private async getDictionary(filePath: string) {
    const resp = await fetch(filePath);

    return resp.text();
  }

  @action private readonly onResize = () => {
    this.viewMode = window.innerWidth < this.maxMobileWidth ? ViewMode.MOBILE : ViewMode.DESKTOP;
  };
}
