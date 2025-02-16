import React, {FormEventHandler, memo, useState} from 'react';
import {SwalForm} from '^components/util/dialog/swal-form';
import {useForm} from 'react-hook-form';
import {RangeQueryDto} from '^models/CodefCard/type/range.query.dto';
import Swal from 'sweetalert2';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

interface RangeDateSwalFormProps {
    className?: string;
    codefCard?: CodefCardDto;
    onSubmit: (dto: RangeQueryDto) => any;
}

export const RangeDateSwalForm = memo((props: RangeDateSwalFormProps) => {
    const {codefCard, onSubmit, className = ''} = props;
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<RangeQueryDto>({
        defaultValues: codefCard?.nextFetchHistoriesRange(),
    });

    const submitHandler = async (dto: RangeQueryDto) => {
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
            </section>
        </SwalForm>
    );
});
