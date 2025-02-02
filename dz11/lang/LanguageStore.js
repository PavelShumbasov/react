import { makeAutoObservable } from "mobx";

class LanguageStore {
  language = 'ru'; 

  constructor() {
    makeAutoObservable(this);  
  }

  toggleLanguage() {
    this.language = this.language === 'ru' ? 'en' : 'ru';  
  }
}

export default new LanguageStore();
