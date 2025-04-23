import {memo} from 'react';
import {
    c_reviewResponseSubscriptionUsingStatus,
    ReviewResponseSubscriptionDto,
    ReviewResponseSubscriptionUsingStatus,
    t_reviewResponseSubscriptionUsingStatus,
} from '^models/ReviewResponse/type';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {ResponseSubCard} from './ResponseSubCard';

interface UsingStatusColumnProps {
    usingStatus: ReviewResponseSubscriptionUsingStatus;
    responseSubs: ReviewResponseSubscriptionDto[];
    draggable: boolean;
    dragItem: ReviewResponseSubscriptionDto | undefined;
    onDragStart: (responseSub: ReviewResponseSubscriptionDto) => any;
    onDragEnd: (responseSub: ReviewResponseSubscriptionDto) => any;
    onDrop: (column: ReviewResponseSubscriptionUsingStatus) => any;
}

export const UsingStatusColumn = memo((props: UsingStatusColumnProps) => {
    const {usingStatus, responseSubs} = props;
    const {draggable, dragItem, onDragStart, onDragEnd, onDrop} = props;

    const title = t_reviewResponseSubscriptionUsingStatus(usingStatus);
    const [bgColor, textColor] = c_reviewResponseSubscriptionUsingStatus(usingStatus);

    // 칸반의 한 열
    return (
        <div
            className={`bg-${bgColor} bg-opacity-30 rounded-lg p-2.5`}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => {
                // console.log('[COLUMN]', 'Drag Enter', usingStatus, dragItem);
            }}
            onDrop={(e) => {
                if (!dragItem) return;
                // console.log('[COLUMN]', 'Dropped', usingStatus, dragItem.id, {
                //     from: dragItem.usingStatus,
                //     to: usingStatus,
                // });
                onDrop(usingStatus);
            }}
        >
            <div className="flex items-center mb-4 space-x-2">
                <TagUI className={`bg-${bgColor} text-${textColor}`} noMargin>
                    {title}
                </TagUI>
                <span className={`text-12 text-${textColor} font-medium`}>{responseSubs.length}</span>
            </div>

            <div className="space-y-2.5">
                {responseSubs.map((responseSub) => (
                    <ResponseSubCard
                        key={responseSub.id}
                        responseSub={responseSub}
                        usingStatus={usingStatus}
                        draggable={draggable}
                        onDragStart={() => onDragStart(responseSub)}
                        onDragEnd={() => onDragEnd(responseSub)}
                    />
                ))}
            </div>
        </div>
    );
});
UsingStatusColumn.displayName = 'UsingStatusColumn';
