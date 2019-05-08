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

  getHistorical(date, from, to) {
    console.log("", from, to);
    return this.http
      .get(
        `https://api.exchangeratesapi.io/history?start_at=2015-01-01&end_at=${date}&symbols=${from},${to}&base=${from}`
      )
      .subscribe((res: any) => {
        console.log("TCL: DataService -> getHistorical -> res", res);
      });
  }
}
