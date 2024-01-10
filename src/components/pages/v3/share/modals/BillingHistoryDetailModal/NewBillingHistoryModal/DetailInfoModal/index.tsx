import React, {ChangeEvent, memo} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {
    billingHistoryIdState,
    createBillingHistoryAtom,
    detailInfoModalState,
    finishModalState,
    isDomesticState,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {FormControl} from '^components/util/form-control';
import {TextInput} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/share/TextInput';
import {ButtonGroupRadio} from '^components/util/form-control/inputs';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {CreateMoneyRequestDto, CurrencyCode} from '^models/Money';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {selectedCurrencyState} from '^v3/share/modals/BillingHistoryDetailModal/atom';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {appIdState, useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';
import {useForm} from 'react-hook-form';
import {CreateBillingHistoryRequestDto} from '^models/BillingHistory/type';
import {useAlert} from '^hooks/useAlert';
import {useNewBillingHistoryModal} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/NewBillingHistoryModalGroup/hook';
import {SkipButton} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/share/SkipButton';
import {NextButtonUI} from '^v3/share/NextButtonUI';
import {debounce} from 'lodash';

/*
사용하지 않고 있습니다.
 */
export const DetailInfoModal = memo(() => {
    const {Modal, close} = useModal(detailInfoModalState);
    const {open: OpenFinishModal} = useModal(finishModalState);
    const [createBillingHistory, setCreateBillingHistory] = useRecoilState(createBillingHistoryAtom);
    const selectedCurrency = useRecoilValue(selectedCurrencyState);
    const isDomestic = useRecoilValue(isDomesticState);
    const form = useForm<CreateBillingHistoryRequestDto>();
    const appId = useRecoilValue(appIdState);
    const setBillingHistoryId = useSetRecoilState(billingHistoryIdState);
    const {alert} = useAlert();
    const {modalGroupClose} = useNewBillingHistoryModal();
    const {currentSubscription} = useCurrentSubscription();

    const onVATChange = (e: ChangeEvent<HTMLInputElement>) => {
        const moneyLike: CreateMoneyRequestDto = {
            text: `${e.target.value}원`,
            amount: Number(e.target.value),
            code: CurrencyCode.KRW,
            exchangeRate: 1,
            exchangedCurrency: isDomestic ? CurrencyCode.KRW : selectedCurrency.label,
        };
        form.setValue('vatAmount', moneyLike);
    };

    const onClick = debounce(() => {
        if (!appId) return;

        setCreateBillingHistory((prev) => ({
            ...prev,
            uid: form.getValues('uid'),
            vatAmount: form.getValues('vatAmount'),
        }));

        const req = appBillingHistoryApi.createV2(appId, {
            ...createBillingHistory,
            uid: form.getValues('uid'),
            vatAmount: form.getValues('vatAmount'),
        });

        req.then((res) => {
            setBillingHistoryId(res.data.id);
            OpenFinishModal();
        });

        req.catch((e) => alert.error('다시 시도해주세요', e.value).then(() => modalGroupClose()));
    }, 500);

    const skip = () => {
        if (!appId) return;

        const req = appBillingHistoryApi.createV2(appId, createBillingHistory);

        req.then((res) => {
            setBillingHistoryId(res.data.id);
            OpenFinishModal();
        });

        req.catch((e) => alert.error('다시 시도해주세요', e.value).then(() => modalGroupClose()));
    };

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar
                backBtnOnClick={close}
                topbarPosition="sticky"
                title={currentSubscription?.product.nameKo || '결제 내역 추가'}
                rightButtons={[() => <SkipButton onClick={skip} />]}
            />
            <MobileSection.Padding>
                <h2 className="h1 leading-tight mb-10 whitespace-pre-line">
                    결제된 금액을 <br /> 입력해주세요.
                </h2>
                <section className="flex flex-col gap-5">
                    <FormControl topLeftLabel="결제 승인 번호를 입력해주세요">
                        <TextInput type="number" onChange={(e) => form.setValue('uid', e.target.value)} />
                    </FormControl>

                    <FormControl topLeftLabel="국내 또는 해외 결제 여부를 선택해주세요">
                        <ButtonGroupRadio
                            options={[
                                {label: '공제', value: true},
                                {label: '불공제', value: false},
                            ]}
                            onChange={(e) => setCreateBillingHistory((prev) => ({...prev, isVATDeductible: e.value}))}
                            defaultValue={createBillingHistory.isVATDeductible}
                        />
                    </FormControl>

                    <FormControl topLeftLabel="부가세를 입력해주세요">
                        <TextInput
                            type="number"
                            onChange={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onVATChange(e);
                            }}
                        />
                    </FormControl>
                </section>
            </MobileSection.Padding>

            <ModalLikeBottomBar className="left-0">
                <NextButtonUI isActive={true} onClick={() => onClick()}>
                    등록하기
                </NextButtonUI>
            </ModalLikeBottomBar>
        </Modal>
    );
});
