import React, {memo, ReactElement} from 'react';
import {IoClose} from '@react-icons/all-files/io5/IoClose';
import {confirm2} from '^components/util/dialog';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';

interface SelectPlanModalProps {
    isOpened: boolean;
    onClose: () => void;
    currentPlan: string;
}

export const SelectPlanModal = memo(function SelectPlanModal(props: SelectPlanModalProps) {
    const {isOpened, onClose, currentPlan = 'basic'} = props;

    const planCardStyle = 'flex-1 border rounded-xl p-4 space-y-4 w-72';
    const planTopStyle = 'h-28 flex flex-col justify-between border-b pb-4';
    const planBottomStyle = 'h-72 flex flex-col justify-between';

    const changePlan = (plan: string) => {
        if (plan === currentPlan) return;
        confirm2(`플랜 변경`, `구독중인 플랜을 변경할까요?`, 'warning').then((res) => {
            if (res.isConfirmed) {
                console.log('change plan to', plan);
                toast.success('플랜 변경이 완료되었습니다');
            }
        });
    };

    return (
        <div
            data-modal="TeamMemberSelectModal-for-AppShowModal"
            className={`modal ${isOpened ? 'modal-open' : ''}`}
            onClick={onClose}
        >
            <div className={'bg-white rounded-3xl p-12'}>
                <div className={'flex justify-between items-center mb-6'}>
                    <h3>플랜 선택</h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-stroke-gray text-gray-500 hover:text-gray-900 transition-colors duration-200"
                    >
                        <IoClose size={32} />
                    </button>
                </div>
                <div className={'flex items-stretch space-x-8'}>
                    <div className={planCardStyle}>
                        <div className={planTopStyle}>
                            <div>베이직</div>
                            <div className={'font-bold text-xl'}>무료</div>
                        </div>
                        <div className={planBottomStyle}>
                            <div className={'space-y-2'}>
                                {basicPlanDescription.map((desc, index) => (
                                    <div key={index} className={'text-sm'}>
                                        {desc}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className="btn btn-gray-200 w-full" disabled={true}>
                                    현재플랜
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={planCardStyle}>
                        <div className={planTopStyle}>
                            <div className={'flex justify-between items-start'}>
                                <div>서포터</div>
                                <div className={'btn btn-outline btn-xs btn-scordi-500'}>50% OFF</div>
                            </div>
                            <div className={'font-bold text-xl'}>
                                <span className={'text-sm text-gray-300 font-medium line-through'}>100,000</span>
                                <br />
                                50,000<span className={'text-sm text-gray-500 font-medium'}>/월</span>
                            </div>
                        </div>
                        <div className={planBottomStyle}>
                            <div className={'space-y-2'}>
                                <div className={'text-sm'}>모든 베이직 플랜 기능 포함</div>
                                {supportPlanDescription.map((desc, index) => (
                                    <div key={index} className={'flex items-center space-x-2 text-scordi-500 text-sm'}>
                                        {desc}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className="btn btn-scordi-500 w-full" onClick={() => changePlan('supporter')}>
                                    구독하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={planCardStyle}>
                        <div className={planTopStyle}>
                            <div>커스텀</div>
                            <div className={'font-bold text-xl'}>도입 문의</div>
                        </div>
                        <div className={planBottomStyle}>
                            <div className={'space-y-2'}>
                                <div className={'text-sm'}>모든 서포터 플랜 기능 포함</div>
                                {customPlanDescription.map((desc, index) => (
                                    <div key={index} className={'flex items-center space-x-2 text-sm'}>
                                        {desc}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button
                                    className="btn btn-gray-600 w-full"
                                    onClick={() => window.open('https://scordi.channel.io/home')}
                                >
                                    상담받기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const basicPlanDescription = [
    ' ✓  팀별 이용중인 SaaS 구독 관리',
    ' ✓  결제 관리용 카드 연동 무제한',
    ' ✓  청구서 수신 이메일 연동 무제한',
    ' ✓  구글워크스페이스 구성원 계정 관리',
];

const supportPlanDescription = [
    ' ✓  PG 결제내역 분류',
    ' ✓  SaaS 대량 등록',
    ' ✓  비용변동 알림',
    ' ✓  월간 SaaS 지출 리포트 발행',
];

const customPlanDescription = [' ✓  기업 맞춤형 기능 개발', ' ✓  전담 담당자 배정'];
