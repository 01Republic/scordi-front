import {memo} from 'react';

interface TitleProps {
    title: string;
}
export const ProductPostListContentPanelTitle = memo((props: TitleProps) => {
    return (
        <div>
            <h2 className="text-5xl">{props.title}</h2>
        </div>
    );
});
