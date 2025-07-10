import {memo, ReactNode} from 'react';
import {StaticImageData} from 'next/image';
import {NextImage} from '^components/NextImage';

interface DescriptionSectionProps {
    title: ReactNode;
    steps: ReactNode[];
    image: StaticImageData;
    alt: string;
}

export const DescriptionSection = memo((props: DescriptionSectionProps) => {
    const {title, steps, image, alt} = props;
    return (
        <section className="flex flex-col gap-5">
            <span className="text-2xl font-bold text-gray-900">{title}</span>
            <ul className="list-decimal pl-4 text-16 leading-loose space-y-2">
                {steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ul>
            <div className="w-full">
                <NextImage
                    src={image}
                    alt={alt}
                    width={image.width}
                    height={image.height}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                />
            </div>
        </section>
    );
});
