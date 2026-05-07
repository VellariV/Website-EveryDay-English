import { CardView } from '../view/CardView.js';

export class AppController {
  constructor(deckModel) {
    this.deck = deckModel;
    this.view = new CardView();
    this.deck.onChangeCallback = () => this._render();
    this._bindEvents();
    this._render();
  }

  _render() {
    this.view.renderCard(this.deck.getCurrentCard(), this.deck.isFlipped, this.deck.mode);
    this.view.renderProgress(this.deck.getProgress());
  }

  _bindEvents() {
    this.view.bindGotIt(()        => this.deck.gotIt());
    this.view.bindNeedsReview(()  => this.deck.needsReview());
    this.view.bindFlip(()         => this.deck.flip());
    this.view.bindLearningMode(() => this.deck.setMode('learning'));
    this.view.bindControlMode(()  => this.deck.setMode('control'));
  }
}
