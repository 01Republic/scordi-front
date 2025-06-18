import React, {memo, useState} from 'react';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {PatchHistoriesQueryDto, RangeQueryDto} from '^models/CodefCard/type/range.query.dto';
import Swal from 'sweetalert2';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

interface RangeDateSwalFormProps {
    className?: string;
    codefCard?: CodefCardDto;
    startDate?: string | undefined;
    endDate?: string | undefined;
    onSubmit: (dto: PatchHistoriesQueryDto) => any;
}

export const RangeDateSwalForm = memo((props: RangeDateSwalFormProps) => {
    const {startDate, endDate, onSubmit, className = ''} = props;
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<PatchHistoriesQueryDto>({
        defaultValues: {startDate, endDate, strategy: 'pessimistic'},
    });

    const submitHandler = async (dto: PatchHistoriesQueryDto) => {
        setIsLoading(true);
        try {
            await onSubmit(dto);
            Swal.close();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SwalForm
            onSubmit={form.handleSubmit(submitHandler)}
            confirmBtnText="확인"
            className={`${isLoading ? 'pointer-events-none opacity-70' : ''}`}
            isLoading={isLoading}
        >
            <section className="text-left pt-2">
                <p className="font-medium text-12 text-scordi">결제내역 불러오기 (불러와서 저장만)</p>
                <h3 className="font-bold text-xl sm:text-lg">불러올 기간을 설정할까요?</h3>
            </section>

            <section className="mb-6 py-2 flex flex-col gap-2">
                <div>
                    <label>
                        <div className="text-12 text-gray-500 mb-1.5">
                            <p className="text-12">조회시작일</p>
                        </div>
                        <input
                            autoFocus
                            type="date"
                            className="input input-bordered w-full bg-gray-100"
                            {...form.register('startDate')}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div className="text-12 text-gray-500 mb-1.5">
                            <p className="text-12">조회종료일</p>
                        </div>
                        <input
                            autoFocus
                            type="date"
                            className="input input-bordered w-full bg-gray-100"
                            {...form.register('endDate')}
                            required
                        />
                    </label>
                </div>
                <div>
                    <div className="pt-2">
                        <div className="text-12 text-gray-500 mb-1.5">
                            <p className="text-12">조회 방법</p>
                        </div>
                        <label className="flex items-center gap-2 mb-1.5">
                            <input
                                type="radio"
                                className="radio radio-sm radio-primary"
                                name="strategy"
                                value="pessimistic"
                                defaultChecked={form.watch('strategy') === 'pessimistic'}
                                onChange={(e) => {
                                    form.setValue('strategy', 'pessimistic');
                                }}
                            />
                            <div className="text-14">
                                <div className="font-bold">안전모드</div>
                                <div className="text-12">
                                    안전하게 1개월씩 쪼개서 거슬러올라가며 끝까지 조회. 느림. (5분 정도 소요)
                                </div>
                            </div>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                className="radio radio-sm radio-primary"
                                name="strategy"
                                value="optimistic"
                                defaultChecked={form.watch('strategy') === 'optimistic'}
                                onChange={(e) => {
                                    form.setValue('strategy', 'optimistic');
                                }}
                            />
                            <div className="text-14">
                                <div className="font-bold">일반모드</div>
                                <div className="text-12">
                                    전체범위를 한번에 코드에프에 조회. 빠르지만 기관에 따라 안불러와질때가 있음.
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </section>
        </SwalForm>
    );
});
