import { CoinInfo } from './models/CoinInfo';
import { Component } from '@angular/core';
import { CoinsService } from './services/coins.service';
import { timer } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Virtual Wallet';
  coins: CoinInfo[] = [];

  constructor(private coinsService: CoinsService) {
  }

  ngOnInit(): void {
    this.getCoinsData();
  }

  getCoinsData() {
    timer(0, 20000).subscribe(() => {
      this.coinsService.getCoins().subscribe((response) => {
        this.coins = response;
      })
    }
    )
  }
}
