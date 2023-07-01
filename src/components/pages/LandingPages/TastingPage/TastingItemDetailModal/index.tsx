import React, {memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import {GmailItem} from '^api/tasting.api';
import {useModal} from '^v3/share/modals/useModal';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {dateSortBy} from '^components/util/date';
import {useRouter} from 'next/router';
import {draftAccountAtom} from '../pageAtoms';
import {ModalTopbar} from './ModalTopbar';
import {PrototypeAvatar} from './PrototypeAvatar';
import {HeadingPrice} from './HeadingPrice';
import {HeadingContent} from './HeadingContent';
import {BodySummary} from './BodySummary';
import {BodyList} from './BodyList';

const isShowTastingItemDetailModalState = atom<boolean>({
    key: 'isShowTastingItemDetailModalState',
    default: false,
});

const tastingItemDetailModalItemState = atom<GmailItem | null>({
    key: 'tastingItemDetailModalItemState',
    default: null,
});

export const useTastingItemDetailModal = () => {
    const [modalItem, setDetailModalItem] = useRecoilState(tastingItemDetailModalItemState);
    const [modalIsShow, setDetailModalIsShow] = useRecoilState(isShowTastingItemDetailModalState);

    const setModal = (item: GmailItem | null) => {
        const isModalOpened = window.history.state === 'modal-opened';
        if (!modalIsShow && !isModalOpened) {
            window.history.pushState('modal-opened', '');
        }
        console.log(item);
        setDetailModalItem(item);
        setDetailModalIsShow(!!item);
    };

    return {modalItem, modalIsShow, setModal};
};

export const TastingItemDetailModal = memo(() => {
    const router = useRouter();
    const {close, Modal} = useModal({isShowAtom: isShowTastingItemDetailModalState});
    const [item, setItem] = useRecoilState(tastingItemDetailModalItemState);
    const draftAccount = useRecoilValue(draftAccountAtom);
    const [currentInvoiceApp, setCurrentInvoiceApp] = useState<InvoiceAppDto | null>(null);

    useEffect(() => {
        if (!item || !draftAccount) return;

        const invoiceApp = draftAccount.invoiceApps.find((app) => {
            return app.billingHistories.find((history) => {
                return history.emailContent?.id === item.id;
            });
        });
        if (invoiceApp) setCurrentInvoiceApp(invoiceApp);
    }, [item, draftAccount]);

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

            {item && currentInvoiceApp && <TastingItemDetailModalBody item={item} invoiceApp={currentInvoiceApp} />}
        </Modal>
    );
});

interface TastingItemDetailModalBodyProps {
    item: GmailItem;
    invoiceApp: InvoiceAppDto;
}

export const TastingItemDetailModalBody = memo((props: TastingItemDetailModalBodyProps) => {
    const {item, invoiceApp} = props;
    const {prototype: proto, billingHistories} = invoiceApp;

    const items = billingHistories.map((history) => history.emailContent).filter((e) => !!e) as GmailItem[];
    const sortedItems = [...items].sort(dateSortBy('DESC', (item) => new Date(item.metadata.date)));

    return (
        <div className="bg-gray-200 flex flex-col gap-4">
            <div className="container p-4 bg-white">
                <div className="pt-10">
                    <br />
                </div>
                <PrototypeAvatar proto={proto} />
                <HeadingPrice price={item.price} />
                <HeadingContent item={item} />
            </div>

            <div className="container px-4 pb-4 pt-6 bg-white">
                <BodySummary sortedItems={sortedItems} />
                <BodyList sortedItems={sortedItems} />
            </div>

            <div className="modal-action hidden" />
        </div>
    );
});
