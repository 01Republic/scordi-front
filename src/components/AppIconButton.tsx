import Image from 'next/image';

type AppIconButtonProps = {
    name: string;
    icon: string;
    onClick?: () => void;
};

export const AppIconButton = (props: AppIconButtonProps) => {
    return (
        <div className={'inline-block items-center m-[20px] mb-[20px]'} onClick={props.onClick}>
            <Image src={props.icon} alt={props.name} width={80} height={80} />
            <p className={'text-center'} style={{wordBreak: 'keep-all'}}>
                {props.name}
            </p>
        </div>
    );
};
