import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { CurrencyListModel } from './currency-list-model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListService {
  currenctListUrl = environment.currencyListURL;
  constructor(
    private httpClient: HttpClient
  ) { }

  getcurrenctList(): Observable<CurrencyListModel[]> {
    return this.httpClient.get<{ countries: { country: CurrencyListModel[] } }>(this.currenctListUrl).pipe(
      map(response => response.countries.country.map(currency => {
        return new CurrencyListModel(currency)
      })),
      catchError(error => { throw new Error("error occunred " + JSON.stringify(error)) })
    )
  }
}
