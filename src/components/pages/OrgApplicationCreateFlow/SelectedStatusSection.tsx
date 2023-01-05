import React, {memo, ReactNode} from 'react';
import {TitleSection} from '^components/v2/TitleSection';
import {ApplicationPrototypeDto} from '^types/applicationPrototype.type';

type SelectStatusSectionProps = {
    proto: ApplicationPrototypeDto;
    text?: ReactNode | undefined;
};

export const SelectedStatusSection = memo((props: SelectStatusSectionProps) => {
    const {proto, text} = props;

    if (proto === null) return <></>;

    return (
        <TitleSection.Simple>
            <div className="px-0 bs-col-7">
                <TitleSection.Title text={proto.name} size="2xl" />
            </div>
            {text && (
                <div className="px-0 bs-col-5 text-right">
                    <p className="text-xl" style={{wordBreak: 'keep-all'}}>
                        {text}
                    </p>
                </div>
            )}
        </TitleSection.Simple>
    );
});
