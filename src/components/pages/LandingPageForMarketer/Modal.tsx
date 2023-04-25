import React, {memo} from 'react';
import {useForm} from 'react-hook-form';
import {sendSlackNotificationApi} from '^api/utils.api';
import {toast} from 'react-toastify';
import {atom, useRecoilState} from 'recoil';

type LandingPageForMarketerFormData = {
    name: string;
    company: string;
    phone: string;
    email: string;
};

export const landingPageForMarketerModalShowAtom = atom({
    key: 'landingPageForMarketerModalShowAtom',
    default: false,
});

export const LandingPageForMarketerModal = memo(() => {
    const [isModalOpen, setModalOpen] = useRecoilState(landingPageForMarketerModalShowAtom);
    const form = useForm<LandingPageForMarketerFormData>();

    const onSubmit = (data: LandingPageForMarketerFormData) => {
        sendSlackNotificationApi({
            title: '*[마케터 타겟실험-1] 사전알림 신청이 접수되었습니다!*',
            fields: [
                {label: '성함', value: data.name},
                {label: '회사명', value: data.company},
                {label: '연락처', value: data.phone},
                {label: '이메일', value: data.email},
                {label: '신청일시', value: new Date().toLocaleString()},
            ],
        }).then(() => {
            toast('신청해주셔서 감사합니다.');
            setModalOpen(false);
        });
    };

    return (
        <>
            {/* Put this part before </body> tag */}
            <label
                htmlFor="my-modal-4"
                className={`modal cursor-pointer ${isModalOpen ? 'modal-open' : ''}`}
                onClick={() => setModalOpen(false)}
            >
                <label
                    className="modal-box relative"
                    htmlFor=""
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <div className="card flex-shrink-0 w-full bg-base-100">
                        <div className="card-body p-5">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">성함</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="홍길동"
                                        className="input input-bordered"
                                        {...form.register('name', {required: true})}
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">회사명</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="제로원리퍼블릭"
                                        className="input input-bordered"
                                        {...form.register('company', {required: true})}
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">연락처</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="010-1234-5678"
                                        className="input input-bordered"
                                        {...form.register('phone', {required: true})}
                                    />
                                </div>
                                <div className="form-control mb-3">
                                    <label className="label">
                                        <span className="label-text">이메일</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="hello@01republic.io"
                                        className="input input-bordered"
                                        {...form.register('email', {required: true})}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">제출하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </label>
            </label>
        </>
    );
});
