import {CreditCardSecretInfo} from './CreditCardSecretInfo';

export type CreditCardNumber = Pick<CreditCardSecretInfo, 'number1' | 'number2' | 'number3' | 'number4'>;
