import {useModal} from '^v3/share/modals/useModal';
import {atom} from 'recoil';
import React, {memo} from 'react';
import Image from 'next/image';
import {useForm} from 'react-hook-form';
import {sendSlackNotificationApi} from '^api/utils.api';
import {useRouter} from 'next/router';

type IntroductionInquiryModalFormData = {
    name: string;
    team: string; // 팀/직급
    company: string;
    companyMember: string;
    phone: string; // 휴대폰번호
    email: string; // 회사이메일
};

export const inquiryModalAtom = {
    isShowAtom: atom({
        key: 'homepage2/inquiryModal/isShowAtom',
        default: false,
    }),
    popStateSyncKey: 'inquiryModal',
};

export const InquiryModal = memo(() => {
    const {Modal, CloseButton, close} = useModal(inquiryModalAtom);
    const form = useForm<IntroductionInquiryModalFormData>();

    const onSubmit = (data: IntroductionInquiryModalFormData) => {
        console.log('on submit');
        sendSlackNotificationApi({
            title: '*도입 문의 알림!*',
            fields: [
                {label: '성함', value: data.name},
                {label: '팀/직급', value: data.team},
                {label: '회사명', value: data.company},
                {label: '직원 수', value: data.companyMember},
                {label: '연락처', value: data.phone},
                {label: '이메일', value: data.email},
                {label: '신청일시', value: new Date().toLocaleString()},
            ],
        }).then(() => close());
    };

    return (
        <Modal className="py-12">
            <div className="flex justify-between items-center gap-3 mb-10">
                <span className="font-bold text-lg flex-1">고객님의 정보가 필요해요!</span>
                <CloseButton />
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="form-control mb-3">
                    <label className="label">
                        <span className="label-text">성함</span>
                    </label>
                    <input
                        type="text"
                        placeholder="스코디"
                        className="input input-bordered"
                        {...form.register('name', {required: true})}
                    />
                </div>
                <div className="form-control mb-3">
                    <label className="label">
                        <span className="label-text">팀/직급</span>
                    </label>
                    <input
                        type="text"
                        placeholder="재무팀"
                        className="input input-bordered"
                        {...form.register('team', {required: true})}
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
                        <span className="label-text">직원 수</span>
                    </label>
                    <select
                        placeholder="1~10명"
                        className="select select-bordered"
                        {...form.register('companyMember', {required: true})}
                    >
                        <option value="1~10명">1~10명</option>
                        <option value="11~30명">11~30명</option>
                        <option value="31~50명">31~50명</option>
                        <option value="51~100명">51~100명</option>
                    </select>
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
                    <button type="submit" className="btn btn-scordi-500">
                        제출하기
                    </button>
                </div>
            </form>
            {/*<div className="card flex-shrink-0 w-full bg-base-100">*/}
            {/*    /!*<div className="card-body p-5">*!/*/}
            {/*    /!*   *!/*/}
            {/*    /!*</div>*!/*/}
            {/*</div>*/}
        </Modal>
    );
});
