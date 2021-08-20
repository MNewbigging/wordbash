import { observable } from 'mobx';
import { Letter } from '../utils/LetterGenerator';

export class GameState {
  @observable public letterPool: Letter[];

  constructor(letters: Letter[]) {
    this.letterPool = letters;
  }
}
