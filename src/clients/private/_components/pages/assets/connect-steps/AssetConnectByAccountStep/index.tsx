import {memo} from 'react';
import {useFormContext} from 'react-hook-form';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';
import {PureLayout} from '^clients/private/_layouts/PureLayout';
import {StatusHeader} from '../common/StatusHeader';
import {BusinessTypeSelector} from '../common/BusinessTypeSelector';
import {CardCompanySelector} from '../common/CardCompanySelector';

export const AssetConnectByAccountStep = memo(() => {
    const {reset} = useFormContext<CreateAccountRequestDto>();

    return (
        <PureLayout>
            <article className="w-full flex flex-col gap-20">
                <div className="flex flex-col gap-10">
                    <StatusHeader
                        title="어떤 자산을 연결할까요?"
                        subTitle="개인사업자의 경우 금융사마다 정의가 달라요. 두 항목 모두 시도해보세요."
                        onClick={() => reset({loginType: undefined})}
                    />
                    <BusinessTypeSelector />
                </div>

                <CardCompanySelector />
            </article>
        </PureLayout>
    );
});
