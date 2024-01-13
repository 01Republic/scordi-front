import {memo} from 'react';

interface LoadingProps {
    size?: string;
    stroke?: string;
}

export const Loading = memo((props: LoadingProps) => {
    const {size = '4', stroke = '2px'} = props;

    return (
        <div
            className={`btn btn-square bg-transparent border-none loading before:!h-${size} before:!w-${size} before:!border-[${stroke}]`}
            style={{}}
        />
    );
});
Loading.displayName = 'Loading';
