import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/converter.action';

import { DataService } from '../../data.service';

@Injectable()
export class ConverterEffects {
  constructor(private actions$: Actions, private service: DataService) {}

  @Effect()
  getAmountTo$ = this.actions$.pipe(
    ofType(fromActions.GET_AMOUNT),
    map((action: fromActions.GetAmountRequest) => action.payload),
    switchMap((data: any) => {
      return this.service.getAmout(data).pipe(
        map(
          (amount: any) =>
            new fromActions.GetAmountSuccess(amount, data.switchCase)
        ),
        catchError(error => of(new fromActions.GetAmountFailure(error)))
      );
    })
  );

  @Effect()
  switchCase$ = this.actions$.pipe(
    ofType(fromActions.SWITCH_AMOUNT),
    map((action: any) => new fromActions.SwitchAmountSuccess(action.payload))
  );
}
