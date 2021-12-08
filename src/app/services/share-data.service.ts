import { CoinInfo } from './../models/CoinInfo';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public coin$ = new BehaviorSubject<Set<string>>(undefined);

  public graphicCoin$ = new BehaviorSubject<string>(undefined);

  constructor() { }

  public getCoin(): Observable<Set<string>> {
    return this.coin$.asObservable();
  }

  public getGraphicCoin(): Observable<string> {
    return this.graphicCoin$.asObservable();
  }
}
