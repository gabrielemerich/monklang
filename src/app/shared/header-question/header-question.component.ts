import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ml-header-question',
  templateUrl: './header-question.component.html',
  styleUrls: ['./header-question.component.scss'],
})
export class HeaderQuestionComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  faDoorOpen = faDoorOpen;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  gohome() {
    this.router.navigate(['']);
  }
}
