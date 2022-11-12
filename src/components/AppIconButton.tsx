import Image from "next/image";

type AppIconButtonProps = {
    name: string;
    icon: string;
    onClick?: () => void;
}

export const AppIconButton = (props: AppIconButtonProps) => {
    return (
        <div className={'inline-block items-center mr-[20px] mb-[20px]'} onClick={props.onClick}>
            <Image src={props.icon} width={80} height={80}/>
            <p className={'text-center'}>{props.name}</p>
        </div>
    )
}