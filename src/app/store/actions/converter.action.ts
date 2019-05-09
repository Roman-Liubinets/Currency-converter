import { Action } from '@ngrx/store';
import * as model from '../../model/chart.model';

export const GET_AMOUNT = '[AMOUNT] Get Amount reuqest';
export const GET_AMOUNT_SUCCESS = '[AMOUNT] Get Amount request Succeed';
export const GET_AMOUNT_FAILURE = '[AMOUNT] Get Amount request Failed';

export const SWITCH_AMOUNT = '[AMOUNT] Switch Amount';
export const SWITCH_AMOUNT_SUCCESS = '[AMOUNT] Switch Amount Succeed';

// ******************************** GET AMOUNT ********************************
export class GetAmountRequest implements Action {
  readonly type = GET_AMOUNT;
  constructor(public payload: model.Currency) {}
}
export class GetAmountSuccess implements Action {
  readonly type = GET_AMOUNT_SUCCESS;
  constructor(public payload: string, public switchCase: boolean) {}
}

export class GetAmountFailure implements Action {
  readonly type = GET_AMOUNT_FAILURE;
  constructor(public payload: any) {}
}
// ******************************** SWITCH AMOUNT ********************************
export class SwitchAmount implements Action {
  readonly type = SWITCH_AMOUNT;
  constructor(public payload: boolean) {}
}
export class SwitchAmountSuccess implements Action {
  readonly type = SWITCH_AMOUNT_SUCCESS;
  constructor(public payload: boolean) {}
}

export type Action =
  | GetAmountRequest
  | GetAmountSuccess
  | GetAmountFailure
  | SwitchAmount
  | SwitchAmountSuccess;
