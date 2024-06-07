import {memo} from 'react';
import {useRecoilState} from 'recoil';
import {StepLayout} from '../_common/StepLayout';
import {InputSection} from '../inputs/InputSection';
import {createSubscriptionFormData} from '../atom';
import {debounce} from 'lodash';

// [**구독 등록 플로우 (수동) /** 메모 입력](https://www.notion.so/3cc480d76c144cce9e8a93e6390e552c?pvs=21)
export const MemoStep = memo(function TeamMemberStep() {
    const [formData, setFormData] = useRecoilState(createSubscriptionFormData);

    const onChange = debounce((desc?: string) => {
        setFormData((f) => ({...f, desc}));
    }, 500);

    return (
        <StepLayout title="마지막 단계에요!" desc="메모 해 둘 내용이 있다면 남겨주세요. (선택사항)">
            <InputSection>
                <label>
                    <input
                        className="input border-gray-200 bg-gray-100 w-full"
                        defaultValue={formData.desc}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                    />
                </label>
            </InputSection>
        </StepLayout>
    );
});
