import {memo} from 'react';
import {ReviewResponseDto} from '^models/ReviewResponse/type';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {ResendButton} from './ResendButton';
import {SubmitStatusHandler} from './SubmitStatusHandler';
import {MoreDropdownForResponseItem} from './MoreDropdownForResponseItem';

interface ReviewResponseItemProps {
    response: ReviewResponseDto;
    reload: () => any;
}

export const ReviewResponseItem = memo((props: ReviewResponseItemProps) => {
    const {response, reload} = props;

    return (
        <div className="flex items-center justify-between p-4 text-sm">
            {response.teamMember && <TeamMemberProfile item={response.teamMember} />}

            <div className="flex items-center space-x-3">
                <span>{response.statusText}</span>

                <SubmitStatusHandler response={response} reload={reload} />

                <ResendButton response={response} reload={reload} />

                <MoreDropdownForResponseItem response={response} />
            </div>
        </div>
    );
});
ReviewResponseItem.displayName = 'ReviewResponseItem';
