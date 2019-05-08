import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getAmout(from, to) {
    return this.http.get(
      `https://api.exchangeratesapi.io/latest?symbols=${from},${to}&base=${from}`
    );
  }
}
