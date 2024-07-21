import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PeriodicElement } from "../periodicElement.model";
import {Rate} from "../rate.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private _ELEMENT_DATA: BehaviorSubject<PeriodicElement[]> = new BehaviorSubject<PeriodicElement[]>([]);
  position = 1;

  get ELEMENT_DATA() {
    return this._ELEMENT_DATA.asObservable();
  }

  receiveRatesData(rates: Rate[]) {
    this.position = 1
    const newData = rates.map(rate => ({
      position: this.position++,
      ask: rate.ask,
      bid: rate.bid,
      date: rate.effectiveDate
    }));
    this._ELEMENT_DATA.next(newData);
    console.log('Received rates:', rates, newData);

  }








}
