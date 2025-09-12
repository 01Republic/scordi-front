import {ReactElement, ReactNode} from 'react';

interface Props {
    title?: JSX.Element | ReactElement | ReactNode;
    desc?: JSX.Element | ReactElement | ReactNode;
}

export function TooltipContent(props: Props) {
    const {title, desc} = props;

    return (
        <div className="text-12 flex flex-col py-1 px-1.5">
            <div className="text-white">{title}</div>
            {desc && <div className="text-white/80">{desc}</div>}
        </div>
    );
}
