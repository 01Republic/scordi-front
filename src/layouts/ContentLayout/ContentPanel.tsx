import React, {CSSProperties, FC, memo} from 'react';
import {WithChildren} from '^types/global.type';
import {PreLoader, PreLoaderProps} from '^components/PreLoader';

interface ContentPanelProps {
    bodyWrap?: boolean;
}

export const ContentPanel: FC<WithChildren & Partial<ContentPanelHeadingProps> & ContentPanelProps> = ({
    title,
    desc = '',
    bodyWrap = true,
    children,
}) => {
    return (
        <div data-component="ContentPanel" className="w-full border border-[#dbd6e1] bg-white rounded shadow mb-5">
            {title && <ContentPanelHeading title={title} desc={desc} />}

            {bodyWrap ? <ContentPanelBody>{children}</ContentPanelBody> : children}
        </div>
    );
};

/**
 * 패널 내 프리로더
 * - 커스텀이 필요하다면 속성들을 추가할것.
 */
export const ContentPanelPreloader = memo((props: PreLoaderProps) => {
    return (
        <div className="py-20">
            <PreLoader ghost={true} screenSize={false} {...props} />
        </div>
    );
});

interface ContentPanelHeadingProps {
    title: string;
    desc?: string;
}

export function ContentPanelHeading(props: ContentPanelHeadingProps & WithChildren) {
    const {title, desc = '', children = ''} = props;

    return (
        <div className="flex items-center p-4 bg-neutral border-b border-b-[#dbd6e1]">
            <div>
                <h2 className="m-0 text-sm text-gray-600 font-semibold">{title}</h2>
                {desc && <p className="text-xs text-gray-600" dangerouslySetInnerHTML={{__html: desc}} />}
            </div>
            {children}
        </div>
    );
}

export function ContentPanelBody({children}: WithChildren) {
    return <div className="p-4 bg-white">{children}</div>;
}

export const ContentPanelTitle = memo(({children}: WithChildren) => {
    return <p className="font-semibold mb-3 text-lg">{children}</p>;
});

export const ContentPanelMiniTitle = memo(({children}: WithChildren) => {
    return <p className="font-semibold mb-3">{children}</p>;
});

export function ContentPanelItemTitle({text, className = ''}: {text: string; className?: string}) {
    return <p className={`mr-2 ${className}`}>{text}</p>;
}

export function ContentPanelItemText({text}: {text: string}) {
    return (
        <p
            className="text-xs text-gray-500"
            dangerouslySetInnerHTML={{
                __html: text,
            }}
        />
    );
}

type ContentPanelItemProps = {
    className?: string;
    style?: CSSProperties;
};
export function ContentPanelItem(props: WithChildren & ContentPanelItemProps) {
    const {children, className = '', style = {}} = props;
    return (
        <div className={`p-4 border-b border-b-[#dbd6e1] ${className}`} style={style}>
            <div className="flex items-center">{children}</div>
        </div>
    );
}

export function ContentPanelList({children}: WithChildren) {
    return <div className="-m-4">{children}</div>;
}

export function ContentPanelInput({
    title,
    text = '',
    required,
    value,
    type = 'text',
    placeholder = '',
    children,
}: WithChildren &
    ContentPanelItemProps & {
        title: string;
        text?: string;
        required?: boolean;
        value?: any;
        type?: 'text' | 'number' | 'radio';
        placeholder?: string;
    }) {
    return (
        <ContentPanelItem>
            <div className="flex-1 pr-4">
                <div className="indicator">
                    {required && (
                        <span
                            className="indicator-item badge badge-secondary badge-3xs indicator-middle"
                            style={{top: '33%'}}
                        />
                    )}
                    <ContentPanelItemTitle text={title} className="mr-[5px]" />
                </div>
                {text && <ContentPanelItemText text={text} />}
            </div>
            <div className="flex-1">
                {children ? (
                    children
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="input input-bordered w-full"
                        value={value}
                    />
                )}
            </div>
        </ContentPanelItem>
    );
}
