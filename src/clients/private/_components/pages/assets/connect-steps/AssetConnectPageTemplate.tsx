import React, {memo, createContext} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {AssetConnectMethodSelectStep} from './AssetConnectMethodSelectStep';
import {AssetConnectByCertificateStep} from './AssetConnectByCertificateStep';
import {AssetConnectByAccountStep} from './AssetConnectByAccountStep';

interface AssetConnectOption {
    ConnectMethodAltActionButton?: () => JSX.Element;
    onSuccessfullyCreatedByAccount: (codefCards: CodefCardDto[]) => any;
}

export const AssetConnectOptionContext = createContext<AssetConnectOption>({
    onSuccessfullyCreatedByAccount: console.log,
});

export const AssetConnectPageTemplate = memo((props: AssetConnectOption) => {
    const methods = useForm<CreateAccountRequestDto>({
        mode: 'all',
        defaultValues: {
            clientType: CodefCustomerType.Business,
        },
    });

    const {
        watch,
        formState: {isValid},
    } = methods;

    const loginType = watch('loginType');

    return (
        <AssetConnectOptionContext.Provider value={props}>
            <FormProvider {...methods}>
                <form>
                    {!loginType && <AssetConnectMethodSelectStep />}

                    {loginType === CodefLoginType.Certificate && <AssetConnectByCertificateStep />}

                    {loginType === CodefLoginType.IdAccount && <AssetConnectByAccountStep />}
                </form>
            </FormProvider>
        </AssetConnectOptionContext.Provider>
    );
});
