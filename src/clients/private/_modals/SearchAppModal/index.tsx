import React, {memo} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SearchAppModalInput} from './SearchAppModalInput';
import {SearchResultSection} from './SearchResultSection';
import {SelectedProductSection} from './SelectedProductSection';
import {FaTimes} from 'react-icons/fa';

interface SearchAppModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const SearchAppModal = memo((props: SearchAppModalProps) => {
    const {isOpened, onClose} = props;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="sm:max-w-lg mx-auto w-full self-start sm:mt-20">
                <div className="w-full"></div>

                <div className="modal-box max-w-screen-sm sm:max-w-[32rem] w-full scale-100 p-0 rounded-none sm:rounded-box min-h-screen max-h-screen sm:min-h-min relative">
                    <button
                        onClick={onClose}
                        className="sm:hidden btn btn-square !bg-transparent !border-none text-gray-400 hover:text-gray-500 transition-all absolute top-0 right-0 z-[1]"
                    >
                        <FaTimes size={20} />
                        {/*닫기*/}
                    </button>
                    <SearchAppModalInput />
                    <SearchResultSection />
                    <SelectedProductSection />
                </div>
            </div>
        </AnimatedModal>
    );
});
SearchAppModal.displayName = 'SearchAppModal';
