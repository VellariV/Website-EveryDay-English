export class CardView {
  constructor() {
    this.elWord         = document.getElementById('card-word');
    this.elTranscript   = document.getElementById('card-transcription');
    this.elTranslation  = document.getElementById('card-translation');
    this.elCategory     = document.getElementById('card-category');
    this.elExample      = document.getElementById('card-example');
    this.elExTrans      = document.getElementById('card-example-translation');
    this.elFlipHint     = document.getElementById('card-flip-hint');
    this.elHideable     = document.getElementById('card-hideable');
    this.elCardBody     = document.getElementById('card-body');
    this.elBtnGotIt     = document.getElementById('btn-got-it');
    this.elBtnReview    = document.getElementById('btn-needs-review');
    this.elBtnLearn     = document.getElementById('btn-learning');
    this.elBtnControl   = document.getElementById('btn-control');
    this.elProgressBar  = document.getElementById('progress-bar');
    this.elProgressText = document.getElementById('progress-text');
  }

  renderCard(card, isFlipped, mode) {
    if (!card) return;
    this.elWord.textContent        = card.word;
    this.elTranscript.textContent  = `[${card.transcription}]`;
    this.elTranslation.textContent = card.translation;
    this.elCategory.textContent    = card.category;

    const regex = new RegExp(`(${card.word})`, 'gi');
    this.elExample.innerHTML  = card.example.replace(regex,
      '<span class="font-bold text-cyan-700">$1</span>');
    this.elExTrans.textContent = card.exampleTranslation;

    mode === 'learning' ? this._showLearningMode() : this._showControlMode(isFlipped);
  }

  _showLearningMode() {
    this.elHideable.classList.remove('hidden');
    this.elFlipHint.classList.add('hidden');
    this.elBtnGotIt.classList.remove('hidden');
    this.elBtnReview.classList.remove('hidden');
    this.elCardBody.style.cursor = 'default';
    this.elBtnLearn.classList.add('bg-white', 'shadow-sm', 'text-cyan-700');
    this.elBtnLearn.classList.remove('text-cyan-600');
    this.elBtnControl.classList.remove('bg-white', 'shadow-sm', 'text-cyan-700');
    this.elBtnControl.classList.add('text-cyan-600');
  }

  _showControlMode(isFlipped) {
    this.elBtnControl.classList.add('bg-white', 'shadow-sm', 'text-cyan-700');
    this.elBtnControl.classList.remove('text-cyan-600');
    this.elBtnLearn.classList.remove('bg-white', 'shadow-sm', 'text-cyan-700');
    this.elBtnLearn.classList.add('text-cyan-600');

    if (isFlipped) {
      this.elHideable.classList.remove('hidden');
      this.elFlipHint.classList.add('hidden');
      this.elBtnGotIt.classList.remove('hidden');
      this.elBtnReview.classList.remove('hidden');
      this.elCardBody.style.cursor = 'default';
    } else {
      this.elHideable.classList.add('hidden');
      this.elFlipHint.classList.remove('hidden');
      this.elBtnGotIt.classList.add('hidden');
      this.elBtnReview.classList.add('hidden');
      this.elCardBody.style.cursor = 'pointer';
    }
  }

  renderProgress(progress) {
    this.elProgressBar.style.width  = `${progress.percent}%`;
    this.elProgressText.textContent = `${progress.learned} / ${progress.total} Words`;
  }

  bindGotIt(handler)      { this.elBtnGotIt.addEventListener('click', handler); }
  bindNeedsReview(handler){ this.elBtnReview.addEventListener('click', handler); }
  bindFlip(handler)       { this.elCardBody.addEventListener('click', handler); }
  bindLearningMode(handler){ this.elBtnLearn.addEventListener('click', handler); }
  bindControlMode(handler) { this.elBtnControl.addEventListener('click', handler); }
}
