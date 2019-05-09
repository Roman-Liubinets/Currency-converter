import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getAmout(from, to) {
    return this.http.get(
      `https://api.exchangeratesapi.io/latest?symbols=${from},${to}&base=${from}`
    );
  }

  getHistorical(start_date, end_date, from, to) {
    console.log('TCL: DataService', start_date, end_date);
    return this.http.get(
      `https://api.exchangeratesapi.io/history?start_at=${start_date}&end_at=${end_date}&symbols=${from},${to}&base=${from}`
    );
  }
}
