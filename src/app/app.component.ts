import { Component, OnInit } from "@angular/core";
import { DataService } from "./data.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService, private fb: FormBuilder) {}
  form: FormGroup;
  currency: string[] = [
    "USD",
    "JPY",
    "BGN",
    "CZK",
    "DKK",
    "GBP",
    "HUF",
    "PLN",
    "RON",
    "SEK",
    "CHF",
    "ISK",
    "NOK",
    "HRK",
    "RUB",
    "TRY",
    "AUD",
    "BRL",
    "CAD",
    "CNY",
    "HKD",
    "IDR",
    "ILS",
    "INR",
    "KRW",
    "MXN",
    "MYR",
    "NZD",
    "PHP",
    "SGD",
    "THB",
    "ZAR"
  ];
  ngOnInit() {
    this.initForm();
    this.onChangeCurrency();
  }
  initForm() {
    this.form = this.fb.group({
      CurrencyFrom: [null],
      CurrencyTo: [null],
      AmountFrom: [null],
      AmountTo: [null]
    });
  }

  onChangeCurrency() {
    this.form.valueChanges.subscribe(value => {
      if (
        (this.form.get("CurrencyFrom").value,
        this.form.get("CurrencyTo").value,
        this.form.get("AmountFrom").value)
      ) {
        this.dataService
          .getAmout(
            this.form.get("CurrencyFrom").value,
            this.form.get("CurrencyTo").value
          )
          .subscribe((data: any) => {
            console.log(
              "TCL: AppComponent -> onChangeCurrency -> data",
              data.rates
            );
            this.form
              .get("AmountTo")
              .patchValue(
                data.rates[Object.keys(data.rates)[0]] *
                  this.form.get("AmountFrom").value,
                { emitEvent: false }
              );
          });
      }
    });
  }
}
