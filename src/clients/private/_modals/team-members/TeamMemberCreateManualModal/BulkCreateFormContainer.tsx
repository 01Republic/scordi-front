import React, {memo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {CreateTeamMemberDto, teamMemberApi} from '^models/TeamMember';
import {CreateTeamMemberForm} from './CreateTeamMemberForm';

interface BulkCreateFormContainerProps {
    onCreate: () => any;
}
const order = (list: CreateTeamMemberDto[]) => [...list].reverse();
const orderReverse = (list: CreateTeamMemberDto[]) => [...list].reverse();

export const BulkCreateFormContainer = memo((props: BulkCreateFormContainerProps) => {
    const {onCreate} = props;
    const orgId = useRecoilValue(orgIdParamState);
    const [formDataList, setFormDataList] = useState<CreateTeamMemberDto[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    const onSubmit = debounce(() => {
        setIsCreating(true);
        Promise.allSettled(
            formDataList.map((formData) => {
                return teamMemberApi.create(orgId, formData);
            }),
        )
            .then(() => {
                onCreate();
                setFormDataList([]);
            })
            .finally(() => setIsCreating(false));
    }, 500);

    const orderedList = order(formDataList);

    return (
        <div className="">
            <div className="mb-6">
                <div>
                    <CreateTeamMemberForm
                        onEnter={(dto) => {
                            setFormDataList((list) => {
                                return [...list, dto];
                            });
                        }}
                    />
                </div>
            </div>

            {!!formDataList.length && (
                <div className="">
                    <div className="pb-1.5">
                        <p className="text-12 p-0 text-gray-400 font-medium">등록할 멤버 ({formDataList.length})</p>
                    </div>
                    <div className="border-t border-gray-200">
                        {orderedList.map((formData, i) => (
                            <CreateTeamMemberForm
                                key={i}
                                defaultValues={formData}
                                onEnter={(dto) => {
                                    const updated = orderedList.map((item, j) => {
                                        return i === j ? dto : item;
                                    });
                                    setFormDataList(orderReverse(updated));
                                }}
                                onRemove={() => {
                                    const removed = orderedList.filter((item, j) => {
                                        return i != j;
                                    });
                                    setFormDataList(orderReverse(removed));
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <section className="fixed p-4 bottom-0 left-0 right-0">
                <button
                    type="button"
                    className={`btn btn-lg sm:btn-md btn-scordi btn-block disabled:btn-disabled2 ${
                        isCreating ? 'loading pointer-events-none' : ''
                    }`}
                    onClick={onSubmit}
                    disabled={formDataList.length == 0}
                >
                    {!isCreating && '저장하기'}
                </button>
            </section>
        </div>
    );
});
BulkCreateFormContainer.displayName = 'BulkCreateFormContainer';
