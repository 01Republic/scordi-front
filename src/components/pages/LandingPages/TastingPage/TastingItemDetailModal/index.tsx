import React, {memo, useEffect, useState} from 'react';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {GmailItem} from '^api/tasting.api';
import {useModal} from '^v3/share/modals/useModal';
import {IoChevronBack} from '@react-icons/all-files/io5/IoChevronBack';
import {Avatar} from '^components/Avatar';
import {displayCurrencyAtom, draftAccountAtom} from '^components/pages/LandingPages/TastingPage/pageAtoms';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {changePriceCurrency, currencyFormat, getCurrencySymbol} from '^api/tasting.api/gmail/agent/parse-email-price';
import {MobileInfoListItem} from '^components/pages/LandingPages/TastingPage/MobileInfoListItem';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {EmailParsedTableGroupByDay, groupByDate} from '^components/pages/LandingPages/TastingPage/EmailParsedTableRow';
import {dateSortBy} from '^components/util/date';
import {sumBy} from 'lodash';

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
        console.log(item);
        setDetailModalItem(item);
        setDetailModalIsShow(!!item);
    };

    return {modalItem, modalIsShow, setModal};
};

export const TastingItemDetailModal = memo(() => {
    const {close, Modal} = useModal({isShowAtom: isShowTastingItemDetailModalState});
    const [item, setItem] = useRecoilState(tastingItemDetailModalItemState);
    const [modalIsShow, setDetailModalIsShow] = useRecoilState(isShowTastingItemDetailModalState);
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

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <div className="flex container items-center justify-between sticky top-0 h-[50px] bg-white z-10">
                <div className="text-sm h-full flex items-center">
                    <div className="px-4 h-full flex items-center cursor-pointer" onClick={close}>
                        <IoChevronBack />
                    </div>
                </div>
                <p className="h-full flex items-center font-bold text-16" />
                <div className="text-sm px-4 h-full flex items-center">
                    <br />
                </div>
            </div>

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
    const displayCurrency = useRecoilValue(displayCurrencyAtom);

    const {prototype: proto, billingHistories} = invoiceApp;
    const date = item.metadata.date;
    const serviceName = item.provider;
    const title = item.title;
    const attachments = item.attachments;
    const sender = item.metadata.sender || item.metadata.from?.replace(/.*<(.+)>/, '$1');
    const price = item.price;

    const symbol = getCurrencySymbol(displayCurrency);
    const amount = changePriceCurrency(price.amount, price.currency, displayCurrency);

    const items = billingHistories.map((history) => history.emailContent).filter((e) => !!e) as GmailItem[];
    const sortedItems = [...items].sort(dateSortBy('DESC', (item) => new Date(item.metadata.date)));
    const groupedItems = groupByDate(sortedItems);

    const getTotalBalance = (gmailItems: GmailItem[]) => {
        if (gmailItems.length === 0) return 0;
        let amount = 0;
        gmailItems.forEach((item) => {
            const {price} = item;
            if (price.hide) return;
            if (!isNaN(price.amount)) {
                // console.log('priceAmount', price.amount);
                // console.log('item', item);
                amount += changePriceCurrency(price.amount, price.currency, displayCurrency);
            }
        });
        return amount;
    };

    return (
        <div className="bg-gray-200 flex flex-col gap-4">
            <div className="container p-4 bg-white">
                <div className="pt-10">
                    <br />
                </div>
                {/*<h3 className="font-bold text-2xl w-[60vw] mb-4">{item.title}</h3>*/}

                <div className="flex items-center space-x-2 mb-2">
                    <Avatar src={proto.image} className="w-6 h-6" />
                    <p className="text-sm">{proto.name}</p>
                </div>

                <p className="text-3xl font-bold mb-12">
                    {price.hide ? (
                        <span className="text-gray-500">-</span>
                    ) : (
                        <>
                            <small className="mr-1">{symbol}</small>
                            <span>{currencyFormat(amount || 0, displayCurrency)}</span>
                        </>
                    )}
                </p>

                <ul className="py-0">
                    <MobileInfoListItem label="제목" className="!items-start">
                        <div className="font-light mb-4">{title}</div>
                    </MobileInfoListItem>
                    <MobileInfoListItem label="발신" className="!items-start">
                        <div className="font-light mb-4">{item.metadata.from}</div>
                    </MobileInfoListItem>
                    <MobileInfoListItem
                        label="발신일시"
                        className="!items-start"
                        value={yyyy_mm_dd_hh_mm(item.metadata.date)}
                    />
                    {attachments.length > 0 && (
                        <MobileInfoListItem label="첨부파일" className="!items-start">
                            <div className="w-full overflow-auto">
                                {attachments.map((attachment, i) => (
                                    <div
                                        key={i}
                                        className="font-light text-xs badge overflow-hidden justify-start whitespace-nowrap mb-4"
                                    >
                                        {attachment.fileName}
                                    </div>
                                ))}
                            </div>
                        </MobileInfoListItem>
                    )}
                </ul>
            </div>

            <div className="container px-4 pb-4 pt-0 bg-white">
                <div className="flex items-center justify-around py-6">
                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">건수</p>
                        <p className="font-semibold text-18">
                            <span className="">{billingHistories.length}건</span>
                            {/*<small >&nbsp;</small>*/}
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">총 금액</p>
                        <p className="font-semibold text-18">
                            <small className="mr-1">{getCurrencySymbol(displayCurrency)}</small>
                            <span className="">{getTotalBalance(items).toLocaleString()}</span>
                            {/*<small className={!isLoaded ? 'invisible' : ''}>&nbsp;{t('summary_stat.invoice.unit')}</small>*/}
                        </p>
                    </div>
                </div>

                <ul className="w-full text-left">
                    {Object.entries(groupedItems).map(([date, items], i) => (
                        <EmailParsedTableGroupByDay key={i} date={new Date(date)} items={items} />
                    ))}
                </ul>
            </div>

            <div className="modal-action hidden">
                {/*<a className="btn" onClick={close}>*/}
                {/*    Yay!*/}
                {/*</a>*/}
            </div>
        </div>
    );
});
