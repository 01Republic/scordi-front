import React, {FormEventHandler, memo} from 'react';
import {CardContainer, CardContainerProps} from './CardContainer';
import {LoadableBox} from '^components/util/loading';
import {Check} from 'lucide-react';

interface FormContainerProps extends CardContainerProps {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    isLoading?: boolean;
}

export const FormContainer = memo((props: FormContainerProps) => {
    const {onSubmit, isLoading = false, children, ...res} = props;

    return (
        <CardContainer {...res}>
            <form onSubmit={onSubmit}>
                <div className={`${isLoading ? 'pointer-events-none' : ''}`}>
                    <LoadableBox isLoading={isLoading} loadingType={2} spinnerPos="center" noPadding>
                        {children}
                    </LoadableBox>
                </div>

                <div className="p-4">
                    <div className="max-w-md mx-auto">
                        <button
                            className={`btn btn-lg btn-block btn-scordi gap-2 ${isLoading ? 'link_to-loading' : ''}`}
                        >
                            <span>추가하기</span>
                        </button>
                    </div>
                </div>
            </form>
        </CardContainer>
    );
});
FormContainer.displayName = 'FormContainer';
