import { CoinInfo } from './../models/CoinInfo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TransactionInfo } from '../models/TransactionInfo';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  public coin$ = new BehaviorSubject<string[]>(undefined);

  public selectedCoin$ = new Subject<string>();
  private storageBudget = +localStorage.getItem('budget');
  private budget$ = new BehaviorSubject<number>(this.storageBudget);

  private transactionList= localStorage.getItem('transactions');
  private transactions$ = new BehaviorSubject<string>(this.transactionList);
  public  numberOfTransactions:number = +localStorage.getItem('numberOfTransactions') ;

  constructor() {}

  public getCoin(): Observable<string[]> {
    return this.coin$.asObservable();
  }

  public getSelectedCoin(): Observable<string> {
    return this.selectedCoin$.asObservable();
  }

  public addBudget(value: number) {
    const currentBudget = (this.storageBudget += value);
    this.storageBudget = currentBudget;
    localStorage.setItem('budget', currentBudget.toString());
    this.budget$.next(currentBudget);
  }

  public getBudget(): Observable<number> {
    return this.budget$.asObservable();
  }

  public subtractFromBudget(sum:number){
    this.storageBudget -= sum;
    localStorage.setItem("budget", this.storageBudget.toString());
    this.budget$.next(this.storageBudget);
  }

  public addTransaction(transaction: TransactionInfo) {
    let currentTransactionList = new Array();

    if (this.transactionList){
      currentTransactionList = JSON.parse(this.transactionList);
    }

    currentTransactionList.push(transaction);
    console.log(currentTransactionList);

    localStorage.setItem('numberOfTransactions', currentTransactionList.length.toString());

    this.transactionList = JSON.stringify(currentTransactionList);

    localStorage.setItem('transactions', this.transactionList);
  }

  public getNumberOfTransactions(){
    return +localStorage.getItem('numberOfTransactions');
  }

  public getTransactions(): Observable<string> {
    return this.transactions$.asObservable();
  }
}
