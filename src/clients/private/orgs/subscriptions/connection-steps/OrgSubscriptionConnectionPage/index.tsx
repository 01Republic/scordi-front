import React, {memo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {ConnectionMethodSection} from 'src/clients/private/orgs/subscriptions/connection-steps/SelectMethodSection';
import {ByCertificatePage} from '../selectInstitutionsSection/ByCertificatePage';
import {ByAccountPage} from '^clients/private/orgs/subscriptions/connection-steps/selectInstitutionsSection/ByAccountPage';

export const OrgSubscriptionConnectionPage = memo(() => {
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
        <FormProvider {...methods}>
            <form>
                {!loginType && <ConnectionMethodSection />}

                {loginType === CodefLoginType.Certificate && <ByCertificatePage />}

                {loginType === CodefLoginType.IdAccount && <ByAccountPage />}
            </form>
        </FormProvider>
    );
});
