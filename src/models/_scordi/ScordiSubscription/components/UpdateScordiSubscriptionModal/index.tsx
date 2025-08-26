import React, {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {BasicModal} from '^components/modals/_shared/BasicModal';
import {ScordiSubscriptionDto, UpdateScordiSubscriptionRequestDto} from '^models/_scordi/ScordiSubscription/type';
import {FormProvider, useForm} from 'react-hook-form';
import {ScordiPlanSelect, StartAtInput, FinishAtInput, NextSubscriptionSelect} from '../form';
import {lpp, secondAfter} from '^utils/dateTime';
import {scordiSubscriptionsApi} from '^models/_scordi/ScordiSubscription/api';
import {toast} from 'react-hot-toast';
import {errorToast} from '^api/api';

interface Props {
    resource?: ScordiSubscriptionDto;
    close: () => void;
    onSaved?: () => void;
}

const toDateStr = (date: Date | null) => {
    if (!date) return undefined;
    return lpp(date, 'yyyy-MM-dd');
};

const toDate = (dateStr: string | null | undefined) => {
    if (dateStr) return new Date(`${dateStr} `);
    return dateStr === null ? null : undefined;
};

export const UpdateScordiSubscriptionModal = (props: Props) => {
    const {resource: scordiSubscription, close, onSaved} = props;
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<UpdateScordiSubscriptionRequestDto>();

    useEffect(() => {
        if (!scordiSubscription) return;
        form.setValue('organizationId', scordiSubscription.organizationId);
        form.setValue('scordiPlanId', scordiSubscription.scordiPlanId);
        form.setValue('isActive', scordiSubscription.isActive);
        form.setValue('startAtStr', toDateStr(scordiSubscription.startAt));
        form.setValue('finishAtStr', toDateStr(scordiSubscription.finishAt));
        form.setValue('nextSubscriptionId', scordiSubscription.nextSubscriptionId);
    }, [scordiSubscription]);

    const onSubmit = (data: UpdateScordiSubscriptionRequestDto) => {
        const {startAtStr, finishAtStr, isActive, ...dto} = data;
        dto.startAt = toDate(startAtStr);
        dto.finishAt = toDate(finishAtStr);
        console.log(dto);
        if (!scordiSubscription) return;

        const {id, organizationId} = scordiSubscription;
        setIsLoading(true);
        scordiSubscriptionsApi
            .update(organizationId, id, dto)
            .then(() => toast.success('Save Success!'))
            .then(() => onSaved && onSaved())
            .catch(errorToast)
            .finally(() => {
                setIsLoading(false);
                close();
            });
    };

    const {formState} = form;
    const isSubmitDisabled = !formState.isValid || (!!scordiSubscription && !formState.isDirty);

    return (
        <BasicModal open={!!scordiSubscription} onClose={close}>
            <div className="flex flex-col gap-5 justify-between p-8 max-w-2xl modal-box keep-all ">
                <section className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between items-start w-full">
                        <header
                            className="font-semibold text-20"
                            onClick={() => {
                                console.log('scordiSubscription', scordiSubscription);
                                console.log('form.getValues()', form.getValues());
                            }}
                        >
                            구독 수정 (#{scordiSubscription?.id})
                        </header>
                        <X className="cursor-pointer size-6" onClick={close} />
                    </div>
                </section>

                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-10">
                        <div className="grid grid-cols-2 gap-6 gap-x-4 md:gap-x-8">
                            {/* 조직 */}
                            {/* 플랜 */}
                            <ScordiPlanSelect scordiSubscription={scordiSubscription} readOnly />

                            {/* 활성 여부 */}
                            {/*<IsActiveInput />*/}

                            {/* 시작일시 */}
                            <StartAtInput readOnly={scordiSubscription?.isActive === false} />

                            {/* 종료일시 */}
                            <FinishAtInput readOnly={scordiSubscription?.isActive === false} />

                            {/* 다음 구독 */}
                            {/*<NextSubscriptionSelect />*/}
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-block ${isSubmitDisabled ? 'btn-disabled2' : 'btn-scordi'} ${
                                isLoading ? 'link_to-loading' : ''
                            }`}
                        >
                            저장하기
                        </button>
                    </form>
                </FormProvider>
            </div>
        </BasicModal>
    );
};
