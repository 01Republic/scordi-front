import {FormControl} from '^clients/private/_components/inputs/FormControl';
import {VendorContractDto} from '^models/vendor/VendorContract/types';
import {VendorManagerDto} from '^models/vendor/VendorManager/type';
import {AlertOctagon, X} from 'lucide-react';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {EmptyValue} from '../../EmptyValue';

interface VendorManagerProps {
    isEditMode?: boolean;
    isError: boolean;
    vendorContract: VendorContractDto | undefined;
    selectedManager: VendorManagerDto | undefined;
    onManagerChange: (vendorManager?: VendorManagerDto) => void;
    onClick: () => void;
}

export const VendorManager = memo((props: VendorManagerProps) => {
    const {t} = useTranslation('subscription');
    const {isEditMode, isError = false, vendorContract, selectedManager, onManagerChange, onClick} = props;

    return (
        <>
            <FormControl label={t('detail.businessInfo.manager')}>
                {isEditMode ? (
                    <>
                        <div
                            className="cursor-pointer input border-gray-200 bg-gray-100 w-full flex items-center justify-between"
                            onClick={onClick}
                        >
                            <div>{selectedManager?.name || <EmptyValue />}</div>
                            {selectedManager && (
                                <X
                                    size={16}
                                    className="cursor-pointer text-gray-400 hover:text-gray-800 transition-all"
                                    onClick={(e) => {
                                        onManagerChange(undefined);
                                        e.stopPropagation();
                                        e.preventDefault();
                                    }}
                                />
                            )}
                        </div>
                        {isError && (
                            <div className="flex items-center gap-[3px] -mb-2 pt-2 w-full">
                                <AlertOctagon className="text-error" />
                                <p className="text-error text-13 ">{t('detail.businessInfo.selectCompanyError')}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex items-center" style={{height: '49.5px'}}>
                        {vendorContract?.vendorManager?.name || <EmptyValue />}
                    </div>
                )}
            </FormControl>
        </>
    );
});
