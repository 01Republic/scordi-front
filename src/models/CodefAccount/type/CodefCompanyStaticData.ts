import {CodefBankCode, CodefCardCompanyCode, CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {ClassConstructor, plainToInstance} from 'class-transformer';
import {bankAccountsStaticData} from '^models/CodefAccount/bank-account-static-data';
import {cardAccountsStaticData} from '^models/CodefAccount/card-accounts-static-data';

export type CodefCompanyCode = CodefCardCompanyCode | CodefBankCode;

export type ClassType<T> = ClassConstructor<T> & {
    all: <T extends CodefCompanyStaticData = CodefCompanyStaticData>(dataset?: T[]) => T[];
    findOne: <T extends CodefCompanyStaticData = CodefCompanyStaticData>(param?: string) => T | null;
};

export class CodefCompanyStaticData<CompanyCode extends CodefCompanyCode = CodefCompanyCode> {
    displayName: string;
    param: CompanyCode;
    logo: string;
    themeColor: string;
    clientType: CodefCustomerType;
    loginType: CodefLoginType;
    loginPageUrl: string;

    static all<T extends CodefCompanyStaticData = CodefCompanyStaticData>(
        this: ClassType<T>,
        dataset: CodefCompanyStaticData<CodefCompanyCode>[] = [...bankAccountsStaticData, ...cardAccountsStaticData],
    ) {
        return plainToInstance(CodefCompanyStaticData, dataset);
    }

    static clientTypeOf<T extends CodefCompanyStaticData = CodefCompanyStaticData>(
        this: ClassType<T>,
        clientType: CodefCustomerType,
    ) {
        return this.all<T>().filter((data) => data.clientType === clientType);
    }

    static findByPersonal<T extends CodefCompanyStaticData = CodefCompanyStaticData>(
        this: ClassType<T>,
        isPersonal: boolean,
    ) {
        return this.all<T>().filter((data) => {
            return isPersonal
                ? data.clientType === CodefCustomerType.Personal
                : data.clientType != CodefCustomerType.Personal;
        });
    }

    static findByClientType<T extends CodefCompanyStaticData = CodefCompanyStaticData>(
        this: ClassType<T>,
        clientType: CodefCustomerType,
    ) {
        return this.all<T>().filter((data) => data.clientType === clientType);
    }

    static findOne<T extends CodefCompanyStaticData = CodefCompanyStaticData>(this: ClassType<T>, param?: string) {
        return this.all<T>().find((data) => data.param === param);
    }
}
