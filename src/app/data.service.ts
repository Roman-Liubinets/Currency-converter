import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getAmout(currencys) {
    return this.http.get(
      `https://api.exchangeratesapi.io/latest?symbols=${
        currencys.haveCurrency
      },${currencys.wantCurrency}&base=${currencys.haveCurrency}`
    );
  }

  getHistorical(data) {
    return this.http.get(
      `https://api.exchangeratesapi.io/history?start_at=${
        data.startDate
      }&end_at=${data.endDate}&symbols=${data.haveCurrency},${
        data.wantCurrency
      }&base=${data.haveCurrency}`
    );
  }
}
