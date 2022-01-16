import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinInfo } from 'src/app/models/CoinInfo';
import { TransactionInfo } from 'src/app/models/TransactionInfo';
import { CoinsService } from 'src/app/services/coins.service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent implements OnInit {
  public status: number;
  public budget: number;
  public coins$: Observable<CoinInfo[]>;
  public selectedCoin: CoinInfo;
  public totalCost: number = 0;
  public overPrice: boolean = false;
  public amount: any;

  constructor(
    private sharedData: ShareDataService,
    private coinService: CoinsService
  ) {}

  ngOnInit(): void {
    this.sharedData.getBudget().subscribe((currentBudget) => {
      this.status = currentBudget;
      this.budget = currentBudget;
    });
    this.coins$ = this.coinService.getCoins();
  }

  calculateTotalPrice(evt: any) {
    this.amount = +evt.value;
    this.totalCost = this.selectedCoin.current_price * +this.amount;
    this.overPrice = this.totalCost > this.budget;
  }

  resetValues() {
    this.totalCost = 0;
    this.overPrice = false;
    this.amount = '';
  }

  makeTheTransaction(transactionType: string){

    

      const transactionDetails:TransactionInfo =
      {
        nr: this.sharedData.getNumberOfTransactions() + 1,
        date: new Date(),
        type: transactionType,
        symbol: this.selectedCoin.symbol,
        price: this.selectedCoin.current_price,
        amount: this.amount
      }

      this.sharedData.addTransaction(transactionDetails);
  }

  buy(){
    this.makeTheTransaction("BUY");
    this.sharedData.subtractFromBudget(this.totalCost);
  }

  sell(){
    this.makeTheTransaction("SELL");
    this.sharedData.addBudget(this.totalCost);
  }
}
