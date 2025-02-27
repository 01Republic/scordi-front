import React, {memo, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryFromGmailItemDto} from '^models/InvoiceAccount/type/invoiceAccountGmailTextApi.type';
import {ReactNodeElement, WithChildren} from '^types/global.type';
import {SelectProduct} from '^components/lib/gmail/gmail-finder/common/billing-history/CreateBillingHistoryByGmailSection/SelectProduct';
import {SelectSubscription} from '^components/lib/gmail/gmail-finder/common/billing-history/CreateBillingHistoryByGmailSection/SelectSubscription';
import {PlainSelect} from '^components/lib/gmail/gmail-finder/common/billing-history/CreateBillingHistoryByGmailSection/PlainSelect';
import {
    SubscriptionUsingStatus,
    SubscriptionUsingStatusValues,
    t_SubscriptionUsingStatus,
} from '^models/Subscription/types';
import {
    BillingCycleOptions,
    SubscriptionBillingCycleTypeValues,
    t_SubscriptionBillingCycleType,
} from '^models/Subscription/types/BillingCycleOptions';
import {
    PricingModelOptions,
    PricingModelValues,
    t_SubscriptionPricingModel,
} from '^models/Subscription/types/PricingModelOptions';
import {GmailContentReadableDto} from '^models/InvoiceAccount/type';
import {yyyy_mm_dd} from '^utils/dateTime';
import {RadioSelect} from '^components/lib/gmail/gmail-finder/common/billing-history/CreateBillingHistoryByGmailSection/RadioSelect';

interface CreateBillingHistoryByGmailSectionProps {
    isOpened: boolean;
    onClose: () => any;
    orgId: number;
    invoiceAccountId: number;
    messageId: string;
    email: GmailContentReadableDto;
}

export const CreateBillingHistoryByGmailSection = memo((props: CreateBillingHistoryByGmailSectionProps) => {
    const {isOpened, onClose, orgId, invoiceAccountId, email, messageId} = props;
    const form = useForm<CreateBillingHistoryFromGmailItemDto>({
        defaultValues: {
            pricingModel: PricingModelOptions.PER_SEAT,
            billingCycleType: BillingCycleOptions.Monthly,
            usingStatus: SubscriptionUsingStatus.PAID,
            issuedAt: yyyy_mm_dd(email.date),
            // paidAt
            isDomestic: true,
        },
    });

    const onSubmit = (data: CreateBillingHistoryFromGmailItemDto) => {
        console.log('data', data);
    };

    form.register('productId');
    form.register('subscriptionId');

    return (
        <div className={`${isOpened ? '' : 'hidden'}`}>
            <div>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className={`w-full bg-gray-50 rounded-lg p-4 flex flex-col gap-6`}>
                        <div>
                            <h4 className="text-16 font-semibold">결제내역 직접등록</h4>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Section name="앱 선택" desc="" required>
                                <SelectProduct
                                    onChange={(productId) => {
                                        productId
                                            ? form.setValue('productId', productId)
                                            : form.resetField('productId');
                                    }}
                                />
                            </Section>
                            <Section
                                name="구독"
                                desc="조직에 이미 등록된 구독일 때에만 선택."
                                disabled={!form.watch('productId')}
                            >
                                <SelectSubscription
                                    organizationId={orgId}
                                    productId={form.watch('productId')}
                                    onChange={(subscriptionId) => {
                                        subscriptionId
                                            ? form.setValue('subscriptionId', subscriptionId)
                                            : form.resetField('subscriptionId');
                                    }}
                                />
                            </Section>
                            <Section name="결제 수단" desc="생성은 아직 지원되지 않아요.">
                                <input type="date" className="input input-bordered input-sm w-full" />
                            </Section>

                            <hr />

                            <Section name="과금방식" desc="기본값: 인원당" required>
                                <PlainSelect
                                    values={PricingModelValues}
                                    toLabel={t_SubscriptionPricingModel}
                                    defaultValue={form.getValues('pricingModel')}
                                    onChange={(value) => form.setValue('pricingModel', value)}
                                />
                            </Section>
                            <Section name="결제주기" desc="기본값: 월결제" required>
                                <PlainSelect
                                    values={SubscriptionBillingCycleTypeValues}
                                    toLabel={t_SubscriptionBillingCycleType}
                                    defaultValue={form.getValues('billingCycleType')}
                                    onChange={(value) => form.setValue('billingCycleType', value)}
                                />
                            </Section>
                            <Section name="반영할 구독상태" desc="기본값: 유료" required>
                                <PlainSelect
                                    values={SubscriptionUsingStatusValues}
                                    toLabel={t_SubscriptionUsingStatus}
                                    defaultValue={form.getValues('usingStatus')}
                                    onChange={(value) => form.setValue('usingStatus', value)}
                                />
                            </Section>

                            <hr />

                            <Section name="결제된 날" desc="애매하면 이메일 수신일로 기입" required>
                                <input
                                    type="date"
                                    className="input input-bordered input-sm w-full"
                                    {...form.register('paidAt', {required: true})}
                                />
                            </Section>
                            <Section name="해외결제여부" desc="기본값: 국내" required>
                                <RadioSelect
                                    name="isDomestic"
                                    defaultValue={form.getValues('isDomestic')}
                                    values={[true, false]}
                                    toLabel={(isDomestic) => (isDomestic ? '국내' : '해외')}
                                    onChange={(value) => form.setValue('isDomestic', value)}
                                />
                            </Section>
                            <Section name="결제금액 + 화폐" desc="금액이 없는 결제내역은 등록할 수 없어요." required>
                                <input type="date" className="input input-bordered input-sm w-full" />
                            </Section>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" onClick={onClose} className={`btn btn-block btn-gray`}>
                                취소하기
                            </button>

                            <button
                                type="submit"
                                className={`btn btn-block btn-scordi ${
                                    false ? 'loading' : ''
                                } disabled:bg-gray-100 disabled:text-gray-300 disabled:border-gray-100`}
                            >
                                저장하기
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});

interface Props extends WithChildren {
    name: ReactNodeElement;
    desc?: ReactNodeElement;
    required?: boolean;
    disabled?: boolean;
}

const Section = (props: Props) => {
    const {name, desc, required = false, disabled = false, children} = props;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[2px]">
                <div className="leading-none flex items-center gap-2">
                    <div className="text-13 font-medium">{name}</div>
                    <div className={`text-10 ${required ? 'text-red-500' : 'text-gray-400'}`}>
                        {required ? '(필수)' : '(선택)'}
                    </div>
                </div>
                {desc && <div className="text-10 leading-none">{desc}</div>}
            </div>
            <div className={disabled ? 'pointer-events-none opacity-40' : ''}>{children}</div>
        </div>
    );
};
