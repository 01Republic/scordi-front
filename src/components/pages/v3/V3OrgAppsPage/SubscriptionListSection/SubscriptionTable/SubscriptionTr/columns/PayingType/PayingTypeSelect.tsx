import {memo, useEffect, useState, MouseEvent} from 'react';
import {useForm} from 'react-hook-form';
import {SubscriptionDto} from '^models/Subscription/types';
import {usePayingTypeTags} from '^models/Tag/hook';
import {TagDto} from '^models/Tag/type';

interface PayingTypeSelectProps {
    subscription: SubscriptionDto;
}

export const PayingTypeSelect = memo((props: PayingTypeSelectProps) => {
    const {subscription} = props;
    const billingType = subscription.getRecurringTypeText(true);
    const {search: getTags, result, createByName} = usePayingTypeTags();
    const form = useForm();
    const [tagOptions, setTagOptions] = useState<TagDto[]>();
    const [newTag, setNewTag] = useState<string>('');

    useEffect(() => {
        form.setValue('tagName', billingType);
        getTags({}).then((res) => setTagOptions(res.items));
    }, []);

    const onCreate = () => {
        const tagName = newTag ? newTag : form.getValues('tagName');

        if (!tagName) return;

        // options에 있는지 확인
        const isExist = tagOptions?.find((tag) => {
            tag.name === tagName;
        });

        // 있으면 변경 요청
        if (isExist) {
        }

        // 없으면 생성 / 변경 / option에 추가
        if (!isExist) {
        }

        setNewTag('');
    };

    const onChange = (e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>) => {
        form.setValue('tagName', e.target);
    };

    const onReset = () => {};

    return (
        <>
            <div className="dropdown">
                <input
                    {...form.register('tagName')}
                    tabIndex={0}
                    className="input input-ghost input-xs text-sm text-center border"
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyUp={(e) => {
                        e.key === 'Enter' && onCreate();
                        e.key === 'Backspace' && onReset();
                    }}
                />
                {!!(tagOptions?.length || newTag.length) && (
                    <ul className="dropdown-content z-[1] py-2 px-5 shadow bg-base-100 rounded-box w-48 mt-1">
                        <li className="text-xs text-start text-gray-500 mb-3">옵션 선택 또는 생성</li>

                        {!!tagOptions?.length && (
                            <>
                                {tagOptions.map((option) => (
                                    <li
                                        onClick={(e) => onChange(e)}
                                        className="text-sm cursor-pointer text-start mb-1.5"
                                    >
                                        <span className="bg-yellow-200 text-start px-3 w-fit rounded-md">
                                            {option.name}
                                        </span>
                                    </li>
                                ))}
                            </>
                        )}
                        {!!newTag.length && (
                            <li className="text-sm rounded-sm text-start  mb-3">
                                생성:{' '}
                                <span className="bg-scordi-100 text-start py-1 px-3 w-fit rounded-md">{newTag}</span>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
});
