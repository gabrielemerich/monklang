import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightAnswers',
})
export class HighlightAnswerPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    // Substitui todos os "?" por uma tag <span> com a classe css
    return value.replace(
      /\?/g,
      '<span class="highlight-question-mark">?</span>'
    );
  }
}
