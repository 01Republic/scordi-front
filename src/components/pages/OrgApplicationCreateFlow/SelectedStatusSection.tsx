import React, {memo, ReactNode} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {useCreateFlow} from '^hooks/useApplicationPrototypes';

type SelectStatusSectionProps = {
    text?: ReactNode | undefined;
};

export const SelectedStatusSection = memo((props: SelectStatusSectionProps) => {
    const {text} = props;
    const {prototype: proto} = useCreateFlow();

    if (proto === null) return <></>;

    return (
        <TitleSection.Simple>
            <div className="px-0 bs-col-8">
                <TitleSection.Title text={proto.name} size="2xl" />
            </div>
            {text && (
                <div className="px-0 bs-col-4 text-right">
                    <p className="text-xl">
                        {/*{plan.name} {cycle && `/ ${t_BillingCycleTerm(cycle.term, true)}`}*/}
                        {text}
                    </p>
                </div>
            )}
        </TitleSection.Simple>
    );
});
