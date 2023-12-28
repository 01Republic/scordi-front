import {memo, useEffect} from 'react';
import {useModal} from '^v3/share/modals/useModal';
import {connectCreditCardModal} from '^v3/share/modals/ConnectCreditCardModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {DefaultButton} from '^components/Button';
import {subscriptionApi} from '^models/Subscription/api';
import {UpdateSubscriptionRequestDto} from 'src/models/Subscription/types';
import {useForm} from 'react-hook-form';
import {SelectCreditCard} from '^v3/share/modals/ConnectCreditCardModal/SelectCreditCard';
import {useCurrentSubscription} from '^v3/V3OrgAppShowPage/atom';

export const RegisterCreditCardModal = memo(() => {
    const {currentSubscription, loadCurrentSubscription} = useCurrentSubscription();
    const form = useForm<UpdateSubscriptionRequestDto>();
    const {Modal, close, isShow} = useModal(connectCreditCardModal);

    useEffect(() => {
        if (!currentSubscription?.creditCardId) return;
        form.setValue('creditCardId', currentSubscription.creditCardId);
    }, [currentSubscription]);

    const onSubmit = (data: UpdateSubscriptionRequestDto) => {
        if (!currentSubscription) return;
        subscriptionApi.update(currentSubscription.id, data).then(() => {
            close();
            loadCurrentSubscription(currentSubscription.organizationId, currentSubscription.id);
        });
    };

    if (!currentSubscription) return <></>;

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">결제 수단 등록하기</p>
                    <h2 className="h1 leading-tight">결제 카드를 선택해주세요</h2>
                </div>
                <SelectCreditCard form={form} isModalShow={isShow} />

                <DefaultButton onClick={form.handleSubmit(onSubmit)} text="등록" type={'button'} />
            </div>
        </Modal>
    );
});
