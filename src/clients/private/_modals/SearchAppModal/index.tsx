import React, {memo} from 'react';
import {AnimatedModal} from '^components/modals/_shared/AnimatedModal';
import {SearchAppModalInput} from './SearchAppModalInput';
import {SearchResultSection} from './SearchResultSection';

interface SearchAppModalProps {
    isOpened: boolean;
    onClose: () => void;
}

export const SearchAppModal = memo((props: SearchAppModalProps) => {
    const {isOpened, onClose} = props;

    return (
        <AnimatedModal open={isOpened} onClose={onClose}>
            <div className="max-w-lg mx-auto w-full self-start mt-20">
                <div className="w-full"></div>

                <div className="modal-box w-full scale-100 p-0">
                    <SearchAppModalInput />
                    <SearchResultSection />
                </div>
            </div>
        </AnimatedModal>
    );
});
SearchAppModal.displayName = 'SearchAppModal';
