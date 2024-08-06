import {FC} from 'react';
import {ChildrenProp} from '../../util/children-prop.type';
import Image from 'next/image';

export const Panel: FC<
    {
        maxWidth: string;
        reverseX?: boolean;
    } & ChildrenProp
> = ({reverseX, maxWidth, children}) => (
    <div
        className={`md:flex justify-between items-center mx-auto ${reverseX ? 'md:flex-row-reverse' : ''}`}
        style={{maxWidth}}
    >
        {children}
    </div>
);

export const PanelTitle: FC<{} & ChildrenProp> = ({children}) => (
    <h3 className="text-3xl md:text-5xl font-bold">{children}</h3>
);

export const PanelText: FC<{} & ChildrenProp> = ({children}) => <p className="text-lg md:text-xl py-6">{children}</p>;

export const PanelBody: FC<{} & ChildrenProp> = ({children}) => (
    <div
        className="leading-normal text-center md:text-left mb-16 md:mb-0"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
    >
        {children}
    </div>
);

export const PanelImage = ({
    src,
    width,
    height,
    alt = '',
}: {
    src: string;
    width: number;
    height: number;
    alt?: string;
}) => (
    <Image
        src={src}
        width={width}
        height={height}
        className="max-w-sm rounded-lg shadow-2xl mx-auto md:mx-0 w-full md:w-auto px-4 md:px-0"
        alt={alt}
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
    />
);
