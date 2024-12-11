import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LoadableBox} from '^components/util/loading';

interface CardContainerTableLayout extends WithChildren {
    isLoading?: boolean;
}

export const CardContainerTableLayout = memo((props: CardContainerTableLayout) => {
    const {isLoading = false, children} = props;

    return (
        <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding loadingClass="">
            <div className="card card-bordered bg-white rounded-md relative">
                <div className="p-4">{children}</div>
            </div>
        </LoadableBox>
    );
});
CardContainerTableLayout.displayName = 'CardContainerTableLayout';
