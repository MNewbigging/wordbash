import { action, observable } from 'mobx';

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
  @observable public viewMode = ViewMode.DESKTOP;
  private readonly maxMobileWidth = 768;

  constructor() {
    window.addEventListener('resize', this.onResize);
  }

  @action private readonly onResize = () => {
    this.viewMode = window.innerWidth <= this.maxMobileWidth ? ViewMode.MOBILE : ViewMode.DESKTOP;
  };
}
