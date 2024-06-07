import { Injectable } from '@angular/core';
import * as jsonTranslations from '../../assets/lang/translate.json';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  translations: any = jsonTranslations;

  private language: string = localStorage.getItem('language') || 'en'

  getLanguage(): string {
    return this.language;
  }

  switchLanguage(lang: string) {
    this.language = lang
  }

  getTranslation(key: string): string {
    return this.translations[this.language][key] || key;
  }

}