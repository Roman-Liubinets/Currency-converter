import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromStore from './store';

import { GlobalShareService } from './share/share.service';
import { Chart, HistoricalRequest, Currency } from './model/chart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    public shareService: GlobalShareService,
    private store: Store<fromStore.State>
  ) {}
  form: FormGroup;
  switch: boolean = false;
  showChart: boolean = false;

  cases: Chart = {
    labels: [],
    datasets: [{ label: 'Amout', data: [] }]
  };

  startDate = new Date('2015-01-01');
  endDate = new Date();

  ngOnInit() {
    this.initForm();
    this.onChangeCurrency();
    this.getChartData();
  }
  initForm() {
    this.form = this.fb.group({
      CurrencyFrom: [null, [Validators.required]],
      CurrencyTo: [null, [Validators.required]],
      AmountFrom: [null, [Validators.required]],
      AmountTo: [null],
      StartDate: [this.convertDate(this.startDate)],
      EndDate: [this.convertDate()],
      switch: [false]
    });
  }

  onChangeCurrency() {
    this.form.valueChanges.subscribe(() => {
      const currencys: Currency = {
        haveCurrency: this.form.controls['CurrencyFrom'].value,
        wantCurrency: this.form.controls['CurrencyTo'].value,
        switchCase: this.switch
      };
      if (this.form.valid) {
        this.store.dispatch(new fromStore.GetAmountRequest(currencys));
        const subscription = this.store
          .select<any>(fromStore.getAmountTo)
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            map((amountTo: number) => {
              this.form
                .get('AmountTo')
                .patchValue(amountTo * this.form.get('AmountFrom').value, {
                  emitEvent: false
                });
              subscription.unsubscribe();
            })
          )
          .subscribe();
        this.getHistoricalData(
          this.form.get('StartDate').value,
          this.form.get('EndDate').value,
          this.form.get('CurrencyFrom').value,
          this.form.get('CurrencyTo').value
        );
      }
    });
  }
  changeCurrency() {
    if (this.form.valid) {
      this.switch = !this.switch;
      this.showChart = false;
      const old_value = Object.assign({}, this.form.value);
      this.form.patchValue({
        CurrencyFrom: old_value.CurrencyTo,
        CurrencyTo: old_value.CurrencyFrom,
        AmountFrom: old_value.AmountTo
      });
      this.getHistoricalData(
        this.form.get('StartDate').value,
        this.form.get('EndDate').value,
        this.form.get('CurrencyFrom').value,
        this.form.get('CurrencyTo').value
      );
    }
  }

  convertDate(date_value?): string {
    const today = date_value ? new Date(date_value) : new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const date = yyyy + '-' + mm + '-' + dd;
    return date;
  }
  getHistoricalData(start_date, end_date, from, to) {
    const historicalRequest: HistoricalRequest = {
      startDate: start_date,
      endDate: end_date,
      haveCurrency: from,
      wantCurrency: to,
      switchCase: this.switch
    };
    this.store.dispatch(
      new fromStore.GetHistoricalDataReques(historicalRequest)
    );
  }
  changeRange() {
    this.showChart = false;
    this.form.patchValue({
      StartDate: this.convertDate(this.startDate),
      EndDate: this.convertDate(this.endDate)
    });
    this.getHistoricalData(
      this.form.get('StartDate').value,
      this.form.get('EndDate').value,
      this.form.get('CurrencyFrom').value,
      this.form.get('CurrencyTo').value
    );
  }

  getChartData() {
    this.store
      .select<any>(fromStore.chartData)
      .pipe(
        distinctUntilChanged(),
        map((data: any) => {
          if (data.labels) {
            this.cases = data;
            this.showChart = true;
          }
        })
      )
      .subscribe();
  }
}
