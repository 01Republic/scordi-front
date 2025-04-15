import React, {memo} from 'react';
import {ShieldCheck, ChevronRight} from 'lucide-react';
import {useFormContext} from 'react-hook-form';
import {CodefLoginType} from '^models/CodefAccount/type/enums';
import {CreateAccountRequestDto} from '^models/CodefAccount/type/create-account.request.dto';

export const AssetCreateMethodSelect = memo(() => {
    const {setValue} = useFormContext<CreateAccountRequestDto>();

    return (
        <article className="w-full flex flex-col">
            <div className="flex flex-col gap-10">
                <section className="flex gap-3 items-center">
                    <ShieldCheck className="text-white fill-orange-400 size-16 stroke-1" />
                    <div className="text-14 font-normal text-neutral-500">
                        데이터 암호와 통신 <br />
                        KISA 보안점검
                    </div>
                </section>
                <section className="flex flex-col gap-5">
                    <span className="text-28 text-neutral-900 font-semibold">자산을 연동해 볼까요?</span>
                    <span className="text-15 text-neutral-600 font-normal whitespace-pre-line">
                        공동인증서를 연동해 사업용으로 쓰고있는 카드의 입출금 내역을 자동으로 조회할 수 있어요.
                    </span>
                </section>

                <section className="flex flex-col gap-10">
                    <section className="flex flex-col gap-4 text-16 text-neutral-900 font-normal">
                        <div className="flex items-center gap-2">
                            <input
                                id="all-agree" //
                                type="checkbox"
                                className="checkbox checkbox-primary w-5 h-5 rounded"
                            />
                            <label htmlFor="all-agree">전체 동의</label>
                        </div>
                        <div className="flex flex-col gap-4 pl-5">
                            <div className="flex items-center gap-2">
                                <input
                                    id="personal-info-agree"
                                    type="checkbox"
                                    className="checkbox checkbox-primary w-5 h-5 rounded"
                                />
                                <label
                                    htmlFor="personal-info-agree"
                                    className="w-full flex items-center justify-between"
                                >
                                    <span>개인정보 수집 및 이용 동의 (필수)</span> <ChevronRight className="size-6" />
                                </label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    id="terms-agree"
                                    type="checkbox"
                                    className="checkbox checkbox-primary w-5 h-5 rounded"
                                />
                                <label htmlFor="terms-agree" className="w-full flex items-center justify-between">
                                    <span>이용약관동의 (필수)</span> <ChevronRight className="size-6" />
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-4 w-full">
                        <button
                            type="button"
                            className="btn btn-block btn-scordi"
                            onClick={() => setValue('loginType', CodefLoginType.Certificate)}
                        >
                            공동인증서로 한번에 연동
                        </button>
                        <button
                            type="button"
                            className="btn btn-block bg-gray-200 text-gray-500"
                            onClick={() => setValue('loginType', CodefLoginType.IdAccount)}
                        >
                            홈페이지 로그인으로 개별 연동
                        </button>
                    </section>
                </section>
            </div>
        </article>
    );
});
