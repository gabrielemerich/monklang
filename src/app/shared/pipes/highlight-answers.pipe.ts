import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightAnswers',
  standalone: false
})
export class HighlightAnswerPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.replace(
      /\{\*\}/g,
      '<span class="highlight-question-mark">?</span>'
    );
  }
}

@Pipe({
  name: 'highlightCurlyWords',
  standalone: false
})
export class HighlightCurlyWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove apenas as chaves, mantendo o conteúdo dentro delas
    return value.replace(/\{([^\{\}]+)\}/g, '$1');
  }
}

@Pipe({
  name: 'highlightSelectedWords',
  standalone: false
})
export class HighlightSelectedWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove apenas as chaves, mantendo o conteúdo dentro delas
    return value.replace(/\{([^\{\}]+)\}/g, '<span class="highlight-question-mark">$1</span>');

  }
}