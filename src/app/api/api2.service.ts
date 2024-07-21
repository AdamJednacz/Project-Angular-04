import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RateC} from "../rate.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Api2Service {

  http = inject(HttpClient);

  getExchangeRates(): Observable<{rates:RateC[]}[]> {
    return this.http.get<{rates:RateC[]}[]>(`https://api.nbp.pl/api/exchangerates/tables/c/`);  }


}
