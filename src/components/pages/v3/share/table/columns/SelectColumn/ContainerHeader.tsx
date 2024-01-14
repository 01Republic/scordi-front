import {memo} from 'react';

interface ContainerHeaderProps {
    title: string;
    className?: string;
}

export const ContainerHeader = memo((props: ContainerHeaderProps) => {
    const {title, className = ''} = props;

    return (
        <div
            className={`flex px-[14px] mt-[6px] text-[12px] font-[500] no-selectable leading-[120%] ${className}`}
            style={{
                color: 'rgba(55, 53, 47, 0.65)',
                fill: 'rgba(55, 53, 47, 0.45)',
            }}
        >
            <div className="overflow-hidden whitespace-nowrap" style={{textOverflow: 'ellipsis'}}>
                {title}
            </div>
        </div>
    );
});
ContainerHeader.displayName = 'ContainerHeader';
