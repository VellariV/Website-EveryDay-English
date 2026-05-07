export class CardModel {
  constructor({ word, transcription, translation, example, exampleTranslation, category }) {
    this.word = word;
    this.transcription = transcription;
    this.translation = translation;
    this.example = example;
    this.exampleTranslation = exampleTranslation;
    this.category = category;
  }
}
