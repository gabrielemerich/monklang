import { Component, OnInit } from '@angular/core';
import { CardLevel } from '../shared/card-level/card-level';

@Component({
  selector: 'ml-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cardLevellist: CardLevel[] = [];
  constructor() {}

  ngOnInit(): void {
    this.cardLevellist = [
      {
        level: 'Básico',
        levelDescription:
          'Lorem Ipsum has been the industry s standard dummy text ever since the 1500s',
        levelName: 'Noviço',
        levelColor: '#4877D8',
        levelImg: './../assets/img/card/mlBasiclvl.png',
      },
      {
        level: 'Médio',

        levelColor: '#000000',
        levelDescription:
          'Lorem Ipsum has been the industry s standard dummy text ever since the 1500s',
        levelName: 'Aprendiz',
        levelImg: './../assets/img/card/mlAprendizlvl.svg',
      },
      {
        level: 'Avançado',
        levelColor: '#103180',
        levelDescription:
          'Lorem Ipsum has been the industry s standard dummy text ever since the 1500s',
        levelName: 'Oshô',
        levelImg: './../assets/img/card/mlOsholvl.svg',
      },
    ];
  }
}
