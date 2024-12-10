import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {FaChevronLeft} from 'react-icons/fa6';
import {orgIdParamState} from '^atoms/common';
import {VendorCompanyDto} from '^models/VendorCompany/type';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LoadableBox} from '^components/util/loading';
import {vendorCompanyApi} from '^models/VendorCompany/api';
import {useVendorCompanyListInCreateSubscription} from '^models/VendorCompany/hook';
import {SearchVendorCompanyInput} from './SearchVendorCompanyInput';
import {VendorCompanyItem} from './VendorCompanyItem';
import {toast} from 'react-hot-toast';

interface VendorCompanySelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    vendorCompanyId?: number | null;
    onSelect: (vendorCompany?: VendorCompanyDto) => any;
}

export const VendorCompanySelectModal = memo((props: VendorCompanySelectModalProps) => {
    const {isOpened, onClose, vendorCompanyId, onSelect = console.log} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, query, isLoading} = useVendorCompanyListInCreateSubscription();

    useEffect(() => {
        if (isOpened) loadCompanies();
    }, [isOpened]);

    const loadCompanies = debounce((keyword?: string) => {
        return search({
            keyword,
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    }, 500);

    const selectedItem = result.items.find((o) => o.id === vendorCompanyId);
    const clickCompany = (vendorCompany?: VendorCompanyDto) => {
        if (vendorCompany) {
            onSelect(vendorCompany);
            onClose();
        } else {
            onSelect();
        }
    };

    const createVendorCompany = debounce((name: string) => {
        vendorCompanyApi.upsert(orgId, {name}).then((res) => {
            toast.success('파트너사 기업 정보를 추가했어요.');
            clickCompany(res.data);
        });
    }, 500);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-[var(--modal-height)]"
            maxHeight="max-h-[var(--modal-height)]"
            modalClassName="rounded-none sm:rounded-t-box [--modal-height:100vh] sm:[--modal-height:90vh]"
        >
            <div>
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                </div>
                <p className="font-medium text-12 text-scordi mb-1">파트너사 설정</p>
                <h3 className="font-bold text-xl leading-tight">
                    파트너사를 새로 추가하거나 <br /> 선택해주세요.
                </h3>
            </div>

            <div className="py-4">
                <SearchVendorCompanyInput onSearch={loadCompanies} />
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                <div className="py-4 flex flex-col">
                    {result.items.map((vendorCompany, i) => {
                        const selected = selectedItem && selectedItem.id === vendorCompany.id;
                        return (
                            <VendorCompanyItem
                                key={i}
                                vendorCompany={vendorCompany}
                                onClick={() => clickCompany(selected ? undefined : vendorCompany)}
                                selected={selected}
                            />
                        );
                    })}
                    {!result.items.length && (
                        <div className="text-center py-4">
                            <div className="text-gray-400 text-12">
                                검색창에 파트너사 이름을 입력해 <br /> 새로 추가 할 수 있어요.
                            </div>
                        </div>
                    )}
                </div>
            </LoadableBox>

            {query.keyword && (
                <div
                    className="p-4 w-full fixed left-0 right-0 bottom-0"
                    style={{
                        background: 'linear-gradient(0, white 0, white 80%, transparent)',
                    }}
                >
                    <button
                        className="btn btn-block btn-scordi"
                        onClick={() => query.keyword && createVendorCompany(query.keyword)}
                    >
                        새로운 파트너사 '{query.keyword}' 추가하기
                    </button>
                </div>
            )}
        </SlideUpModal>
    );
});
VendorCompanySelectModal.displayName = 'VendorCompanySelectModal';
