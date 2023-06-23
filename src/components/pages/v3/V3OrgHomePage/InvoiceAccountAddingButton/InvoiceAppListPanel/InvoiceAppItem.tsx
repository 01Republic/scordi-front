import React, {memo, useEffect} from 'react';
import {InvoiceAppDto} from '^types/invoiceApp.type';
import {Avatar} from '^components/Avatar';
import {useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from './index';
import {SwitchCheckbox} from '^components/SwitchCheckbox';
import {useForm} from 'react-hook-form';

interface InvoiceAppItemProps {
    invoiceApp: InvoiceAppDto;
}

export const InvoiceAppItem = memo((props: InvoiceAppItemProps) => {
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const form = useForm<any>();
    const {invoiceApp} = props;

    useEffect(() => {
        form.setValue('isActive', invoiceApp.isActive);
    }, []);

    const proto = invoiceApp.prototype;

    return (
        <li>
            <div className="flex items-center gap-4 px-6 cursor-default bg-base-100 text-gray-700 border-1 border-b border-b-gray-200">
                <Avatar src={proto.image} className="w-7" />
                <div className="flex-1">
                    <p className="text-sm">{proto.name}</p>
                </div>
                <div className="flex items-center">
                    <SwitchCheckbox className="toggle-sm" {...form.register('isActive')} />
                </div>
            </div>
        </li>
    );
});
