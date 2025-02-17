import {Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

import {HttpClient} from "@angular/common/http";
import {Rate, RateC} from "../../rate.model";
import {ApiService} from "../../api/api.service";
import {MatSelectModule} from  '@angular/material/select' ;
import {MatButton} from "@angular/material/button";
import {combineLatest, filter, Subscription} from "rxjs";
import {Api2Service} from "../../api/api2.service";



@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.scss'],
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButton],
})
export class SearchBarComponent implements OnInit, OnDestroy {

  currenciesCodes: { code: string, currency: string }[] = [];
  form=new FormGroup({
    currency:new FormControl(''),
    numberOfDays:new FormControl('')
  });

  private _subs = new Subscription();

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private apiService = inject(ApiService);
  private api2Service = inject(Api2Service)

  ngOnInit() {
    const subscription = this.api2Service.getExchangeRates().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const rates = data[0].rates;
          this.currenciesCodes = rates.map(rate => ({ code: rate.code, currency: rate.currency }));
          console.log(this.currenciesCodes)
        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    const currencyChanges = this.form.controls['currency'].valueChanges.pipe(filter(val => !!val));
    const daysChanges = this.form.controls['numberOfDays'].valueChanges.pipe(filter(no => !!no));

    this._subs.add(combineLatest([currencyChanges,daysChanges]).
    subscribe(([currencyChanges,daysChanges])=> this.makeCall(currencyChanges!,daysChanges!)));


  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

  onSubmit() {
    console.log(this.form.value.currency)
  }

  private makeCall(currency: string,days:string): void {
    const subscription = this.httpClient.get<{rates:Rate[]}>(`https://api.nbp.pl/api/exchangerates/rates/c/${currency}/last/${days}/`).subscribe({
      next: (data) => {
        console.log(data.rates);
        this.apiService.receiveRatesData(data.rates);
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}


