import React, {memo} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SearchAppModalInput} from './SearchAppModalInput';
import {SearchResultSection} from './SearchResultSection';
import {SelectedProductSection} from './SelectedProductSection';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {X} from 'lucide-react';

interface SearchAppModalProps extends ModalProps {}

export const SearchAppModal = memo((props: SearchAppModalProps) => {
    const {isOpened, onClose} = props;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="sm:max-w-lg mx-auto w-full self-start sm:mt-20">
                <div className="w-full"></div>

                <div className="modal-box max-w-screen-sm sm:max-w-[32rem] w-full scale-100 p-0 rounded-none sm:rounded-box min-h-screen max-h-screen sm:min-h-min sm:max-h-[initial] relative">
                    <SearchAppModalInput>
                        <button
                            onClick={onClose}
                            className="sm:hidden btn btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all absolute top-0 right-0 z-[1]"
                        >
                            <X size={20} />
                            {/*닫기*/}
                        </button>
                    </SearchAppModalInput>
                    <SearchResultSection />
                    <SelectedProductSection />
                </div>
            </div>
        </AnimatedModal>
    );
});
SearchAppModal.displayName = 'SearchAppModal';
