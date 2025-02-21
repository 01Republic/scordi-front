import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {TabPaneProps} from '^components/util/tabs';
import {GmailListFinder} from '^components/lib/gmail/gmail-finder';
import {selectedInvoiceAccountAtom} from '../atoms';

export const DraftInboxContent = memo((props: TabPaneProps) => {
    const {moveTab = console.log} = props;
    const [selectedInvoiceAccount, setSelectedInvoiceAccount] = useRecoilState(selectedInvoiceAccountAtom);

    return (
        <GmailListFinder
            invoiceAccount={selectedInvoiceAccount}
            unSelectHandler={() => {
                setSelectedInvoiceAccount(undefined);
                moveTab(0);
            }}
        />
    );
});
