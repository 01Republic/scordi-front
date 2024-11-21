import {FormControl} from '^clients/private/_components/inputs/FormControl';
import React, {memo, useState} from 'react';
import {useForm} from 'react-hook-form';

type updateSubscriptionBasicInfo = {
    name: string;
    team: string;
    man: string;
    text: string;
};

export const SubscriptionBusinessInfoSection = memo(() => {
    const form = useForm<updateSubscriptionBasicInfo>();
    const [isEditMode, setIsEditMode] = useState(false);

    const onSubmit = (dto: updateSubscriptionBasicInfo) => {
        console.log(dto);
    };

    return (
        <section>
            <div className="card card-bordered bg-white rounded-md relative">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="absolute right-0 top-0 px-8 py-8 flex items-center gap-4">
                        <a className="link text-14" onClick={() => setIsEditMode((v) => !v)}>
                            {isEditMode ? '취소' : '수정'}
                        </a>

                        {isEditMode && <button className="btn btn-sm btn-scordi">저장</button>}
                    </div>

                    <div className="px-8 py-8 border-b">
                        <div className="max-w-md flex flex-col gap-4">
                            <h2 className="leading-none text-xl font-semibold pb-4">거래처 정보</h2>

                            <FormControl label="거래처" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        베스핀글로벌
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="담당자" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        심혜림
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="이메일" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        hrim@baespin.io
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="전화번호" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        010-2482-4541
                                    </div>
                                )}
                                <span />
                            </FormControl>

                            <FormControl label="비고" required={isEditMode}>
                                {isEditMode ? (
                                    <input
                                        className="input input-underline !bg-slate-100 w-full"
                                        {...form.register('name')}
                                        required
                                    />
                                ) : (
                                    <div className="flex items-center" style={{height: '49.5px'}}>
                                        다음 달 매니저님 퇴사 예정중
                                    </div>
                                )}
                                <span />
                            </FormControl>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
});
