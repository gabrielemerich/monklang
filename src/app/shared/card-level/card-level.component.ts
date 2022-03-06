import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ml-card-level',
  templateUrl: './card-level.component.html',
  styleUrls: ['./card-level.component.scss']
})
export class CardLevelComponent implements OnInit {

  @Input() lvl: string;
  @Input() lvlImg: string;
  @Input() lvlName: string;
  @Input() lvlDescription: string;
  

  constructor() { }

  ngOnInit(): void {
  }

}
