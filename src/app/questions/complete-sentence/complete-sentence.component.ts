import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-complete-sentence',
  templateUrl: './complete-sentence.component.html',
  styleUrls: ['./complete-sentence.component.scss'],
})
export class CompleteSentenceComponent implements OnInit {
  faCheck = faCheckCircle;
  faExit = faDoorOpen;
  constructor() {}

  ngOnInit(): void {}
}
