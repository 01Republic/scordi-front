import {MoneyDto} from './Money.dto';

export type MoneyLike = Pick<MoneyDto, 'text' | 'format' | 'amount' | 'code' | 'symbol' | 'exchangeRate'>;
