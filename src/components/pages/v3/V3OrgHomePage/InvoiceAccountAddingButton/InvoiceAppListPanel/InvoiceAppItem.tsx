import React, {memo, useEffect} from 'react';
import {InvoiceAppDto, UpdateInvoiceAppRequestDto} from '^types/invoiceApp.type';
import {Avatar} from '^components/Avatar';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {selectedInvoiceAccountAtom} from './index';
import {SwitchCheckbox} from '^components/SwitchCheckbox';
import {useForm} from 'react-hook-form';
import {invoiceAppApi} from '^api/invoiceApp.api';
import {currentOrgAtom} from '^atoms/organizations.atom';

interface InvoiceAppItemProps {
    invoiceApp: InvoiceAppDto;
}

export const InvoiceAppItem = memo((props: InvoiceAppItemProps) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const form = useForm<UpdateInvoiceAppRequestDto>();
    const isActiveForm = form.register('isActive');
    const {invoiceApp} = props;

    useEffect(() => {
        form.setValue('isActive', invoiceApp.isActive);
    }, []);

    const onFormChange = () =>
        currentOrg &&
        invoiceAppApi.update(currentOrg.id, invoiceApp.id, form.getValues()).then((res) => window.location.reload());

    const proto = invoiceApp.prototype;

    return (
        <li>
            <div className="flex items-center gap-4 px-6 cursor-default bg-base-100 text-gray-700 border-1 border-b border-b-gray-200">
                <Avatar src={proto.image} className="w-7" />
                <div className="flex-1">
                    <p className="text-sm">{proto.name}</p>
                </div>
                <div className="flex items-center">
                    <SwitchCheckbox
                        className="toggle-sm"
                        {...isActiveForm}
                        onChange={(e) => {
                            isActiveForm.onChange(e);
                            onFormChange();
                        }}
                    />
                </div>
            </div>
        </li>
    );
});
