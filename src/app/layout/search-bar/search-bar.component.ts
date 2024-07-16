import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule} from '@angular/forms';

import {HttpClient} from "@angular/common/http";
import {Rate, RateC} from "../../rate.model";
import {ApiService} from "../../api/api.service";
import {MatSelectModule} from  '@angular/material/select' ;
import {MatButton} from "@angular/material/button";



@Component({
  selector: 'app-search-bar',
  templateUrl: 'search-bar.component.html',
  styleUrls: ['search-bar.component.scss'],
  standalone: true,
  imports: [ MatFormFieldModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, ReactiveFormsModule, MatButton],
})
export class SearchBarComponent implements OnInit{

  currenciesCodes: { code: string, currency: string }[] = [];
  form=new FormGroup({
    currency:new FormControl('')
  });



  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private apiService = inject(ApiService)

  onSubmit() {
    console.log(this.form.value.currency)
    const subscription = this.httpClient.get<{rates:Rate[]}>(`http://api.nbp.pl/api/exchangerates/rates/c/${this.form.value.currency}/last/20/`).subscribe({
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


  ngOnInit() {
    const subscription = this.httpClient.get<{rates:RateC[]}[]>(`https://api.nbp.pl/api/exchangerates/tables/c/today/`).subscribe({
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
  }

}


