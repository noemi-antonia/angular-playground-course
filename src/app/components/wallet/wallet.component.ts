import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  public lastFavorite: string;

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
    this.sharedData.getCoin().subscribe(coinIds => {
      if(coinIds)
        this.lastFavorite = Array.from(coinIds).pop();
    })
  }

}
