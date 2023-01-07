import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ml-card-level',
  templateUrl: './card-level.component.html',
  styleUrls: ['./card-level.component.scss'],
})
export class CardLevelComponent implements OnInit {
  @Input() lvl: string;
  @Input() lvlImg: string;
  @Input() lvlName: string;
  @Input() lvlDescription: string;
  @Input() lvlColor: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateQuestion() {
    this.router.navigate(['/complete-sentence']);
  }
}
