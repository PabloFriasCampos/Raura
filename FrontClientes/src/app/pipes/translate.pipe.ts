import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(private translation: TranslateService) { }

  transform(key: string): string {
    return this.translation.getTranslation(key);
  }

}