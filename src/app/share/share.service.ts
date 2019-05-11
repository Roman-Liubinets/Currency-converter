import { Injectable } from '@angular/core';

@Injectable()
export class GlobalShareService {
  constructor() {}
  currency: string[] = [
    'USD',
    'BGN',
    'CZK',
    'DKK',
    'RON',
    'CHF',
    'NOK',
    'HRK',
    'RUB',
    'AUD',
    'CAD',
    'KRW',
    'SGD',
  ];
}
