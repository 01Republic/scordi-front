import React, {memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {useModal} from '^v3/share/modals/useModal';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {useRouter} from 'next/router';
import {draftAccountAtom} from '../pageAtoms';
import {ModalTopbar} from './ModalTopbar';
import {PrototypeAvatar} from './PrototypeAvatar';
import {HeadingPrice} from './HeadingPrice';
import {HeadingContent} from './HeadingContent';
import {BodySummary} from './BodySummary';
import {BodyList} from './BodyList';
import {BillingHistoryDto} from '^models/BillingHistory/type';

const isShowTastingItemDetailModalState = atom<boolean>({
    key: 'isShowTastingItemDetailModalState',
    default: false,
});

const tastingItemDetailModalItemState = atom<BillingHistoryDto | null>({
    key: 'tastingItemDetailModalItemState',
    default: null,
});

export const useTastingItemDetailModal = () => {
    const [modalItem, setDetailModalItem] = useRecoilState(tastingItemDetailModalItemState);
    const [modalIsShow, setDetailModalIsShow] = useRecoilState(isShowTastingItemDetailModalState);

    const setModal = (billingHistory: BillingHistoryDto | null) => {
        const isModalOpened = window.history.state === 'modal-opened';
        if (!modalIsShow && !isModalOpened) {
            window.history.pushState('modal-opened', '');
        }
        console.log(billingHistory);
        setDetailModalItem(billingHistory);
        setDetailModalIsShow(!!billingHistory);
    };

    return {modalItem, modalIsShow, setModal};
};

export const TastingItemDetailModal = memo(() => {
    const router = useRouter();
    const {close, Modal} = useModal({isShowAtom: isShowTastingItemDetailModalState});
    const [billingHistory, setItem] = useRecoilState(tastingItemDetailModalItemState);
    const draftAccount = useRecoilValue(draftAccountAtom);
    const [currentInvoiceApp, setCurrentInvoiceApp] = useState<InvoiceAppDto | null>(null);

    useEffect(() => {
        if (!billingHistory || !draftAccount) return;

        const invoiceApp = (draftAccount.invoiceApps || []).find((app) => {
            return app.billingHistories.find((history) => {
                return history.emailContent?.id === billingHistory.emailContent?.id;
            });
        });
        if (invoiceApp) setCurrentInvoiceApp(invoiceApp);
    }, [billingHistory, draftAccount]);

    useEffect(() => {
        if (!router.isReady) return;

        window.onpopstate = function () {
            const isModalOpened = window.history.state === 'modal-opened';
            console.log('isModalOpened', isModalOpened);
            if (!isModalOpened) close();
        };
    }, [router.isReady]);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar backBtnOnClick={close} />

            {billingHistory && currentInvoiceApp && (
                <TastingItemDetailModalBody billingHistory={billingHistory} invoiceApp={currentInvoiceApp} />
            )}
        </Modal>
    );
});

interface TastingItemDetailModalBodyProps {
    billingHistory: BillingHistoryDto;
    invoiceApp: InvoiceAppDto;
}

export const TastingItemDetailModalBody = memo((props: TastingItemDetailModalBodyProps) => {
    const {billingHistory, invoiceApp} = props;
    const {product: proto, billingHistories} = invoiceApp;

    const item = billingHistory.emailContent!;

    return (
        <div className="bg-gray-200 flex flex-col gap-4">
            <div className="container p-4 bg-white">
                <div className="pt-10">
                    <br />
                </div>
                <PrototypeAvatar proto={proto} />
                <HeadingPrice price={billingHistory.payAmount} />
                <HeadingContent item={item} />
            </div>

            <div className="container px-4 pb-4 pt-6 bg-white">
                <BodySummary billingHistories={billingHistories} />
                <BodyList billingHistories={billingHistories} />
            </div>

            <div className="modal-action hidden" />
        </div>
    );
});
