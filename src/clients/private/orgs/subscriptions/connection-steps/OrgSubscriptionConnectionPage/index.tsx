import React, {memo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {CodefCustomerType, CodefLoginType} from '^models/CodefAccount/type/enums';
import {ByCertificatePage} from '../selectInstitutionsSection/ByCertificatePage';
import {ByAccountPage} from '../selectInstitutionsSection/ByAccountPage';
import {ConnectionMethodSection} from '../SelectMethodSection';

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
