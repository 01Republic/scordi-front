import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useForm} from 'react-hook-form';
import {FaChevronLeft} from 'react-icons/fa6';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {CreateTeamMemberDto, teamMemberApi} from '^models/TeamMember';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {BulkCreateFormContainer} from './BulkCreateFormContainer';

interface TeamMemberCreateManualModalProps {
    isOpened: boolean;
    onClose: () => any;
    onCreate: () => any;
}

export const TeamMemberCreateManualModal = memo((props: TeamMemberCreateManualModalProps) => {
    const {isOpened, onClose, onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const form = useForm<CreateTeamMemberDto>();
    const [isBulkMode, setIsBulkMode] = useState(true);

    const onSubmit = debounce((dto: CreateTeamMemberDto) => {
        teamMemberApi.create(orgId, dto).then(() => {
            onCreate();
        });
    }, 500);

    return (
        <SlideUpModal
            open={isOpened}
            onClose={onClose}
            size="md"
            minHeight="min-h-screen sm:min-h-[90%]"
            maxHeight="max-h-screen sm:max-h-[90%]"
            modalClassName="rounded-none sm:rounded-t-box"
        >
            <header className="mb-4">
                <div className="mb-4">
                    <FaChevronLeft className="text-gray-400 cursor-pointer" onClick={onClose} />
                </div>
                <p className="font-medium text-12 text-scordi">직접 추가하기</p>
                <h3 className="font-bold text-xl">추가할 구성원 정보를 입력해주세요.</h3>
            </header>

            {/*<ButtonGroupRadio*/}
            {/*    onChange={(option) => setIsBulkMode(option.value)}*/}
            {/*    defaultValue={isBulkMode}*/}
            {/*    options={[*/}
            {/*        {label: '한 명만', value: false},*/}
            {/*        {label: '여러 명', value: true},*/}
            {/*    ]}*/}
            {/*/>*/}

            {isBulkMode ? (
                <BulkCreateFormContainer onCreate={onCreate} />
            ) : (
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="py-4 flex flex-col gap-4 items-stretch">
                        <div>
                            <label>
                                <p className="text-12 text-gray-500 mb-1.5">이름</p>
                                <input
                                    type="text"
                                    placeholder="김스코디"
                                    className="input border-gray-200 bg-gray-100 text-16 w-full"
                                    {...form.register('name', {
                                        required: true,
                                    })}
                                    required
                                />
                            </label>
                        </div>

                        <div>
                            <label>
                                <p className="text-12 text-gray-500 mb-1.5">이메일</p>
                                <input
                                    type="email"
                                    placeholder="tech@01republic.io"
                                    className="input border-gray-200 bg-gray-100 text-16 w-full"
                                    {...form.register('email', {
                                        required: true,
                                    })}
                                    required
                                />
                            </label>
                        </div>
                    </div>

                    <section className="fixed p-4 bottom-0 left-0 right-0">
                        <button type="submit" className="btn btn-lg sm:btn-md btn-scordi btn-block">
                            확인
                        </button>
                    </section>
                </form>
            )}
        </SlideUpModal>
    );
});
TeamMemberCreateManualModal.displayName = 'TeamMemberCreateManualModal';
