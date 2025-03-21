import React, {memo} from 'react';
import {useSetRecoilState} from 'recoil';
import {BetaUserApplyModalShowAtom} from './BetaUserApplyModal';
import {useTranslation} from 'next-i18next';
import {ArrowRight} from 'lucide-react';

interface BetaUserApplyCTAButtonProps {
    text?: string;
    reverseColor?: boolean;
    useArrow?: boolean;
    mobileShow?: boolean;
    aos?: boolean;
}

export const BetaUserApplyCTAButton = memo((props: BetaUserApplyCTAButtonProps) => {
    const setIsModalOpen = useSetRecoilState(BetaUserApplyModalShowAtom);
    const {text = '', reverseColor = false, useArrow = false, mobileShow = false, aos = true} = props;
    const {t} = useTranslation('publicMain');

    const dataAos: any = {};
    if (aos) {
        dataAos['data-aos'] = 'fade-up';
        dataAos['data-aos-anchor-placement'] = 'center-bottom';
    }

    return (
        <label
            htmlFor="my-modal-4"
            className={`btn ${
                reverseColor ? 'btn-white bg-white hover:bg-gray-100 border border-gray-300' : 'btn-scordi-500'
            } ${mobileShow ? '' : 'hidden sm:inline-flex'} btn-lg rounded-2xl shadow-2xl`}
            {...dataAos}
            onClick={() => setIsModalOpen(true)}
        >
            <span>{text || t('cta.default')}</span>
            {useArrow && <ArrowRight size={20} className="ml-2" />}
        </label>
    );
});

export const BetaUserApplyCTAButtonMobile = memo((props: BetaUserApplyCTAButtonProps) => {
    const setIsModalOpen = useSetRecoilState(BetaUserApplyModalShowAtom);
    const {reverseColor = false, useArrow = false} = props;
    return (
        <label
            htmlFor="my-modal-4"
            className={`btn ${
                reverseColor ? 'btn-white border border-gray-300' : 'btn-primary'
            } sm:hidden btn-lg btn-block rounded-none fixed bottom-0 shadow-2xl`}
            onClick={() => setIsModalOpen(true)}
        >
            <span>사전알림 신청하기</span>
            <ArrowRight size={20} className="ml-2" />
        </label>
    );
});
