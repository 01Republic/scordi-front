import React, {memo, useEffect, useRef, useState} from 'react';
import {ModalTopbar, useModal} from '^v3/share/modals';
import {MobileSection} from '^v3/share/sections/MobileSection';
import {ModalLikeBottomBar} from '^v3/layouts/V3ModalLikeLayout.mobile/ModalLikeBottomBar';
import {newFormForGeneralInfoModalAtom} from '../atom';
import {ModalTitle} from './ModalTitle';
import {ProductSelectSection} from './ProductSelectSection';
import {HiddenSection} from './HiddenSection';
import {AliasInput} from './AliasInput';
import {IsFreeTierRadio} from './IsFreeTierRadio';
import {NextButton} from './NextButton';

export const FormForGeneralInfoModal = memo(function FormForGeneralInfoModal() {
    const {Modal, close, isShow} = useModal(newFormForGeneralInfoModalAtom);
    const aliasRef = useRef<HTMLInputElement>(null);

    return (
        <Modal wrapperClassName="modal-right" className="p-0 max-w-none sm:max-w-[32rem]">
            <ModalTopbar title="새로운 구독 추가" backBtnOnClick={close} topbarPosition="sticky" />

            <MobileSection.Padding>
                <div>
                    <ModalTitle />

                    <div className="w-full flex flex-col gap-4">
                        <ProductSelectSection
                            afterChange={() => {
                                setTimeout(() => {
                                    if (aliasRef.current) aliasRef.current.focus();
                                }, 250);
                            }}
                        />

                        <HiddenSection>
                            <AliasInput aliasRef={aliasRef} />
                            <IsFreeTierRadio />
                        </HiddenSection>
                    </div>
                </div>
            </MobileSection.Padding>

            <ModalLikeBottomBar>
                <NextButton />
            </ModalLikeBottomBar>
        </Modal>
    );
});
