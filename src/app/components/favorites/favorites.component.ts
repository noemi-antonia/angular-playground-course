import { ShareDataService } from './../../services/share-data.service';
import { CoinInfo } from './../../models/CoinInfo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() coins: CoinInfo[] = [];

  favorites: CoinInfo[] = [];

  favoriteIds: string[] = [
    "bitcoin", "solana", "chainlink"
  ];

  myCoins: { [key: string]: number } = {
    "bitcoin": 2,
    "solana": 3,
    "chainlink": 5
  }

  constructor(private sharedData: ShareDataService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.setFavorites();
  }

  setFavorites() {
    this.sharedData.getCoin().subscribe( coinIds => {
      if(!coinIds) return;
      this.favorites = this.coins.filter((coin: CoinInfo) => coinIds.has(coin.id));
      
      this.favorites.forEach((favorite) => {
        if(this.myCoins.hasOwnProperty(favorite.id)){
          favorite.my_currency = this.myCoins[favorite.id] * favorite.current_price;
        }
        
      })
    });
  }
}
