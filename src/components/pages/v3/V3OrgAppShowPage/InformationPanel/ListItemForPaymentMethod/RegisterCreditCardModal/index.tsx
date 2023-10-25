import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {addCreditCardModal} from '^v3/V3OrgAppShowPage/InformationPanel/ListItemForPaymentMethod/RegisterCreditCardModal/atom';
import {ModalTopbar} from '^v3/share/modals/ModalTopbar';
import {creditCardListAtom} from '^v3/V3OrgCardShowPage/atom';
import {DefaultButton} from '^components/Button';
import {subscriptionApi} from '^api/subscription.api';
import {SubscriptionDto, UpdateSubscriptionRequestDto} from '^types/subscription.type';
import {useForm} from 'react-hook-form';

interface RegisterCreditCardModalProps {
    subscription: SubscriptionDto;
}
export const RegisterCreditCardModal = memo((props: RegisterCreditCardModalProps) => {
    const {subscription} = props;
    const form = useForm<UpdateSubscriptionRequestDto>();
    const {Modal, close} = useModal(addCreditCardModal);
    const creditCardList = useRecoilValue(creditCardListAtom);
    const selectOptions = creditCardList.map((card, i) => (
        <option key={i} value={card.id}>
            {card.name}
        </option>
    ));
    const onSubmit = (data: UpdateSubscriptionRequestDto) => subscriptionApi.update(subscription.id, data);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem] z-50">
            <ModalTopbar backBtnOnClick={close} topbarPosition="sticky" />
            <div className="px-5 flex flex-col justify-start gap-10">
                <div className="py-5 pt-20">
                    <p className="mb-4">결제 수단 등록하기</p>
                    <h2 className="h1 leading-tight">결제 카드를 선택해주세요</h2>
                </div>
                <div>
                    <select
                        className="select-underline input-underline"
                        placeholder="카드 목록"
                        {...form.register('creditCardId')}
                    >
                        {selectOptions}
                    </select>
                    <span></span>
                </div>

                <DefaultButton onClick={form.handleSubmit(onSubmit)} text="등록" type={'button'} />
            </div>
        </Modal>
    );
});
