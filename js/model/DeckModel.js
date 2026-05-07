import { CardModel } from './CardModel.js';

const CARDS_DATA = [
  { word: 'Destination',  transcription: 'ˌdestɪˈneɪʃn',  translation: 'Пункт призначення',        example: 'We arrived at our destination tired and hungry.',              exampleTranslation: 'Ми прибули до пункту призначення втомлені та голодні.',                 category: 'Travel'     },
  { word: 'Itinerary',    transcription: 'aɪˈtɪnərəri',    translation: 'Маршрут, план подорожі',    example: 'The agent prepared a detailed itinerary for our trip.',         exampleTranslation: 'Агент підготував детальний маршрут для нашої подорожі.',               category: 'Travel'     },
  { word: 'Accommodation',transcription: 'əˌkɒməˈdeɪʃn',  translation: 'Проживання, житло',         example: 'We booked our accommodation in advance.',                       exampleTranslation: 'Ми забронювали проживання заздалегідь.',                               category: 'Travel'     },
  { word: 'Currency',     transcription: 'ˈkʌrənsi',        translation: 'Валюта',                    example: 'Always exchange currency before travelling abroad.',            exampleTranslation: 'Завжди обмінюйте валюту перед подорожжю за кордон.',                  category: 'Travel'     },
  { word: 'Algorithm',    transcription: 'ˈælɡərɪðəm',     translation: 'Алгоритм',                  example: 'The algorithm sorts the data in ascending order.',              exampleTranslation: 'Алгоритм сортує дані у зростаючому порядку.',                         category: 'Technology' },
  { word: 'Interface',    transcription: 'ˈɪntəfeɪs',      translation: 'Інтерфейс',                 example: 'The new interface is much easier to use.',                      exampleTranslation: 'Новий інтерфейс набагато простіший у використанні.',                   category: 'Technology' },
  { word: 'Breakthrough', transcription: 'ˈbreɪkθruː',     translation: 'Прорив',                    example: 'Scientists made a breakthrough in cancer research.',            exampleTranslation: 'Вчені зробили прорив у дослідженні раку.',                            category: 'Technology' },
  { word: 'Deadline',     transcription: 'ˈdedlaɪn',       translation: 'Кінцевий термін',           example: 'We must finish the project before the deadline.',              exampleTranslation: 'Ми повинні завершити проект до кінцевого терміну.',                    category: 'Work'       },
  { word: 'Negotiate',    transcription: 'nɪˈɡəʊʃieɪt',   translation: 'Вести переговори',          example: 'The companies decided to negotiate a new contract.',           exampleTranslation: 'Компанії вирішили вести переговори про новий контракт.',               category: 'Work'       },
  { word: 'Opportunity',  transcription: 'ˌɒpəˈtjuːnɪti', translation: 'Можливість',                example: 'This offer is a great opportunity for your career.',           exampleTranslation: 'Ця пропозиція — чудова можливість для вашої кар\'єри.',               category: 'Work'       },
  { word: 'Collaborate',  transcription: 'kəˈlæbəreɪt',   translation: 'Співпрацювати',             example: 'The two teams collaborated on the project successfully.',      exampleTranslation: 'Дві команди успішно співпрацювали над проектом.',                      category: 'Work'       },
  { word: 'Fluent',       transcription: 'ˈfluːənt',       translation: 'Вільно говорити, біглий',   example: 'After two years she became fluent in English.',                exampleTranslation: 'Після двох років вона почала вільно говорити англійською.',            category: 'Learning'   },
  { word: 'Vocabulary',   transcription: 'vəˈkæbjələri',   translation: 'Словниковий запас',         example: 'Reading is a great way to expand your vocabulary.',            exampleTranslation: 'Читання — чудовий спосіб розширити свій словниковий запас.',           category: 'Learning'   },
  { word: 'Comprehend',   transcription: 'ˌkɒmprɪˈhend',  translation: 'Розуміти, осягати',         example: 'It was difficult to comprehend the complexity of the problem.', exampleTranslation: 'Було важко осягнути складність проблеми.',                            category: 'Learning'   },
  { word: 'Eloquent',     transcription: 'ˈeləkwənt',      translation: 'Красномовний',              example: 'She gave an eloquent speech that moved the audience.',          exampleTranslation: 'Вона виголосила красномовну промову, що зворушила аудиторію.',         category: 'Daily Life' },
  { word: 'Persistent',   transcription: 'pəˈsɪstənt',    translation: 'Наполегливий',              example: 'Being persistent is the key to achieving your goals.',         exampleTranslation: 'Бути наполегливим — це ключ до досягнення цілей.',                    category: 'Daily Life' },
  { word: 'Acknowledge',  transcription: 'əkˈnɒlɪdʒ',     translation: 'Визнавати, підтверджувати', example: 'She acknowledged the mistake and apologized.',                  exampleTranslation: 'Вона визнала помилку і вибачилась.',                                  category: 'Daily Life' },
  { word: 'Ambitious',    transcription: 'æmˈbɪʃəs',      translation: 'Амбітний',                  example: 'She is ambitious and always strives for the best results.',    exampleTranslation: 'Вона амбітна і завжди прагне найкращих результатів.',                  category: 'Daily Life' },
  { word: 'Perspective',  transcription: 'pəˈspektɪv',    translation: 'Перспектива, погляд',       example: 'Travelling broadens your perspective on life.',                exampleTranslation: 'Подорожі розширюють твій погляд на життя.',                           category: 'Daily Life' },
  { word: 'Resilient',    transcription: 'rɪˈzɪliənt',    translation: 'Стійкий, витривалий',       example: 'Children are often more resilient than we think.',             exampleTranslation: 'Діти часто більш стійкі, ніж ми думаємо.',                           category: 'Daily Life' }
];

export class DeckModel {
  constructor(userId = null) {
    this.userId       = userId;
    this.cards        = CARDS_DATA.map(c => new CardModel(c));
    this.currentIndex = 0;
    this.mode         = 'learning';
    this.isFlipped    = false;
    this.reviewQueue  = [];
    this.dailyGoal    = 20;
    this.learned      = 0;         
    this.onChangeCallback = null;
    this._loadProgress();
  }

  // Persistence 
  _storageKey() {
    return this.userId ? `deck_progress_${this.userId}` : 'deck_progress_guest';
  }

  _loadProgress() {
    try {
      const saved = localStorage.getItem(this._storageKey());
      if (saved) {
        const d = JSON.parse(saved);
        this.currentIndex = Math.min(d.currentIndex || 0, this.cards.length - 1);
        this.learned      = d.learned || 0;
      }
    } catch (e) { console.error('Error loading progress:', e); }
  }

  _saveProgress() {
    try {
      localStorage.setItem(this._storageKey(), JSON.stringify({
        currentIndex: this.currentIndex,
        learned:      this.learned
      }));
    } catch (e) { console.error('Error saving progress:', e); }
  }

  getCurrentCard() { return this.cards[this.currentIndex]; }

  setMode(mode) {
    this.mode      = mode;
    this.isFlipped = false;
    if (this.onChangeCallback) this.onChangeCallback(this);
  }

  flip() {
    if (this.mode === 'control') {
      this.isFlipped = !this.isFlipped;
      if (this.onChangeCallback) this.onChangeCallback(this);
    }
  }

  gotIt() {

    if (this.learned < this.dailyGoal) {
      this.learned++;
    }
    this._advance();
  }

  needsReview() {
    this.reviewQueue.push(this.currentIndex);
    this._advance();
  }

  _advance() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
    } else if (this.reviewQueue.length > 0) {
      this.currentIndex = this.reviewQueue.shift();
    } else {

      this.currentIndex = 0;
      this.reviewQueue  = [];
    }
    this.isFlipped = false;
    this._saveProgress();
    if (this.onChangeCallback) this.onChangeCallback(this);
  }

  getProgress() {
    const shown   = Math.min(this.learned, this.dailyGoal);
    const percent = Math.round((shown / this.dailyGoal) * 100);
    return { learned: shown, total: this.dailyGoal, percent };
  }

  initOnModelChange(callback) {
    this.onChangeCallback = callback;
    const handler = {
      set: (obj, prop, val) => {
        obj[prop] = val;
        if (prop !== 'onChangeCallback' && this.onChangeCallback) {
          this.onChangeCallback(this);
        }
        return true;
      }
    };
    return new Proxy(this, handler);
  }
}
