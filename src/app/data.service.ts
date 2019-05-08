import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getCurrency() {
    return (
      this.http
        .get(`https://api.exchangeratesapi.io/latest?symbols=RUB,USD&base=USD`)
        // .get(`https://api.exchangeratesapi.io/latest?symbols=GBP,USD`)
        .subscribe((res: any) => {
          console.log("TCL: DataService -> getCurrency -> res", res);
        })
    );
  }
}
