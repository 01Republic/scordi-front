import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {FaChevronLeft} from 'react-icons/fa6';
import {LoadableBox} from '^components/util/loading';
import {orgIdParamState} from '^atoms/common';
import {VendorManagerDto} from '^models/VendorManager/type';
import {useVendorManagerListInCreateSubscription} from '^models/VendorManager/hook';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {swalHTML} from '^components/util/dialog';
import {SearchVendorManagerInput} from './SearchVendorManagerInput';
import {VendorManagerItem} from './VendorManagerItem';
import {VendorCompanyDto} from '^models/VendorCompany/type';
import {VendorManagerUpsertSwalForm} from './VendorManagerUpsertSwalForm';

interface VendorManagerSelectModalProps {
    isOpened: boolean;
    onClose: () => any;
    selectedCompany?: VendorCompanyDto;
    vendorManagerId?: number | null;
    onSelect: (vendorManager?: VendorManagerDto) => any;
}

export const VendorManagerSelectModal = memo((props: VendorManagerSelectModalProps) => {
    const {isOpened, onClose, selectedCompany, vendorManagerId, onSelect} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, query, reload, isLoading} = useVendorManagerListInCreateSubscription();

    useEffect(() => {
        if (isOpened) loadManagers();
    }, [isOpened, selectedCompany?.id]);

    const loadManagers = debounce((keyword?: string) => {
        return search({
            keyword,
            where: {vendorCompanyId: selectedCompany?.id || 0},
            itemsPerPage: 0,
            order: {id: 'DESC'},
        });
    }, 500);

    const selectedManager = result.items.find((o) => o.id === vendorManagerId);
    const clickManager = (vendorManager?: VendorManagerDto) => {
        onSelect(vendorManager);
        onClose();
    };

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
                <p className="font-medium text-12 text-scordi mb-1">파트너사 담당자 설정</p>
                <h3 className="font-bold text-xl leading-tight">
                    <span className="text-scordi">{selectedCompany?.name}</span>의 담당자를 <br /> 새로 추가하거나
                    선택해주세요
                </h3>
            </div>

            <div className="py-4">
                <SearchVendorManagerInput onSearch={loadManagers} />
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                <div className="py-4 flex flex-col">
                    {result.items.map((vendorManager, i) => {
                        const selected = selectedManager && selectedManager.id === vendorManager.id;
                        return (
                            <VendorManagerItem
                                key={i}
                                vendorManager={vendorManager}
                                onClick={() => clickManager(selected ? undefined : vendorManager)}
                                selected={selected}
                            />
                        );
                    })}
                    {!result.items.length && (
                        <div className="text-center py-4">
                            <div className="text-gray-400 text-12">
                                검색창에 담당자의 이름을 입력하면 <br /> 새로 추가 할 수 있어요.
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
                        onClick={() => {
                            if (!query.keyword) return;
                            if (!selectedCompany) return;
                            swalHTML(
                                <VendorManagerUpsertSwalForm
                                    orgId={orgId}
                                    vendorCompany={selectedCompany}
                                    name={query.keyword}
                                    onSave={clickManager}
                                />,
                            );
                        }}
                    >
                        새로운 담당자 '{query.keyword}' 추가하기
                    </button>
                </div>
            )}
        </SlideUpModal>
    );
});
VendorManagerSelectModal.displayName = 'VendorManagerSelectModal';
