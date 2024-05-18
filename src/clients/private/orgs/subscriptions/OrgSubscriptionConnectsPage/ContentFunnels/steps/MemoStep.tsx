import {memo} from 'react';
import {StepLayout} from '../_common/StepLayout';

// [**구독 등록 플로우 (수동) /** 메모 입력](https://www.notion.so/3cc480d76c144cce9e8a93e6390e552c?pvs=21)
export const MemoStep = memo(function TeamMemberStep() {
    return (
        <StepLayout title="청구서(인보이스)를 받고 있는 이메일이 있나요?" desc="">
            <div>[공사중] 메모는 여기서 입력할거에요</div>
        </StepLayout>
    );
});
