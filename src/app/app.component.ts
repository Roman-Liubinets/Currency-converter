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
  switch: boolean = false;

  cases = {
    labels: [],
    datasets: [{ label: "First Datase", data: [] }]
  };
  ngOnInit() {
    this.initForm();
    this.onChangeCurrency();
    this.toDayDate();
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
            this.form
              .get("AmountTo")
              .patchValue(
                data.rates[Object.keys(data.rates)[!this.switch ? 0 : 1]] *
                  this.form.get("AmountFrom").value,
                { emitEvent: false }
              );
          });
        this.getHistoricalData(
          this.toDayDate(),
          this.form.get("CurrencyFrom").value,
          this.form.get("CurrencyTo").value
        );
      }
    });
  }
  changeCurrency() {
    const old_value = Object.assign({}, this.form.value);
    this.form.patchValue({
      CurrencyFrom: old_value.CurrencyTo,
      CurrencyTo: old_value.CurrencyFrom,
      AmountFrom: old_value.AmountTo
    });
  }

  toDayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const date = yyyy + "-" + mm + "-" + dd;
    return date;
  }
  getHistoricalData(date, from, to) {
    this.dataService.getHistorical(date, from, to).subscribe((data: any) => {
      console.log("TCL: AppComponent -> getHistoricalData -> data", data.rates);
      // console.log(Object.keys(data.rates));
      this.cases.labels = Object.keys(data.rates);
      console.log(Object.values(data.rates[0]));
      // this.cases.push(data.rates);
      // console.log(
      //   "TCL: AppComponent -> getHistoricalData -> this.cases",
      //   this.cases
      // );
      // data.rates.forEach(element => {
      //   console.log(
      //     "TCL: AppComponent -> getHistoricalData -> element",
      //     element
      //   );
      // });
    });
  }
}
