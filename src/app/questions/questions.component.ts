import { Component, OnInit } from '@angular/core';
import { faCheckCircle, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ml-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  faCheck = faCheckCircle;
  faExit = faDoorOpen;
  constructor() {}

  ngOnInit(): void {}
}
