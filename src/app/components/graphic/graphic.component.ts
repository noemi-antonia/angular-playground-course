import { ShareDataService } from './../../services/share-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {

  idOfCoin: string;

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.sharedData.getGraphicCoin().subscribe((coinId) => {
      this.idOfCoin = coinId;
    });
  }

}
