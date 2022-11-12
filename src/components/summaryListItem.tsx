type SummaryListItemProps = {
    title: string;
    value: string;
}

export const SummaryListItem = (props: SummaryListItemProps) => {
    return (
        <div className={'flex justify-between py-[20px] border-b'}>
            <p className={'text-[15px]'}>{props.title}</p>
            <p className={'text-[15px] font-bold'}>{props.value}</p>
        </div>
    )
}