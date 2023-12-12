import {UseFormReturn} from 'react-hook-form';
import {UpdateOrganizationRequestDto} from '^models/Organization/type';
import React, {ForwardedRef, forwardRef, useEffect} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {addressModalIsShow, addressValueAtom} from '^v3/share/modals/AddressModal';
import {useId} from 'react-id-generator';

interface AddressInputProps {
    editable: boolean;
    form: UseFormReturn<UpdateOrganizationRequestDto, any>;
}

export const AddressInput = forwardRef((props: AddressInputProps, ref: ForwardedRef<any>) => {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const postalAddressValue = useRecoilValue(addressValueAtom);
    const setAddressModalIsShow = useSetRecoilState(addressModalIsShow);
    const [id] = useId(1, 'AddressInput');
    const {editable, form} = props;

    useEffect(() => {
        if (postalAddressValue) form.setValue('address', postalAddressValue);
    }, [postalAddressValue]);

    if (!currentOrg) return <></>;

    const address = currentOrg.address;
    const addressDetail = currentOrg.addressDetail;

    const fullAddress = [address, addressDetail].filter((e) => e).join(' ');

    return (
        <>
            <div className="form-control gap-4 flex-row">
                <label htmlFor={id} className="label px-0 cursor-pointer w-[30%]">
                    <span className="label-text font-semibold text-lg">회사 주소</span>
                </label>
                <div className="flex-grow">
                    {editable ? (
                        <input
                            type="text"
                            className="input w-full input-bordered"
                            onClick={() => setAddressModalIsShow(true)}
                            placeholder="주소를 입력해주세요."
                            {...form.register('address')}
                        />
                    ) : fullAddress ? (
                        <div className="h-full flex items-center">{fullAddress}</div>
                    ) : (
                        <div className="h-full flex items-center text-gray-500 text-sm">주소를 입력해주세요.</div>
                    )}
                </div>
            </div>
            {editable && (
                <div className="form-control gap-4 flex-row">
                    <label className="label px-0 cursor-pointer w-[30%]">&nbsp;</label>
                    <div className="flex-grow">
                        <input
                            type="text"
                            className="input w-full input-bordered"
                            placeholder="상세주소를 입력해주세요."
                            {...form.register('addressDetail')}
                        />
                    </div>
                </div>
            )}
        </>
    );
});
