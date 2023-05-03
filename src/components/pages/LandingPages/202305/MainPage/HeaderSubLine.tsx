import {memo} from 'react';
import {GiClick} from '@react-icons/all-files/gi/GiClick';
import {IconType} from '@react-icons/all-files';
import {BiTrendingDown} from '@react-icons/all-files/bi/BiTrendingDown';
import {GoChecklist} from '@react-icons/all-files/go/GoChecklist';

export const HeaderSubLine = memo(() => {
    return (
        <section className="bg-scordi py-6">
            <div className="container flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between max-w-[70%]">
                <HeaderSubLineItem icon={GiClick} text="클릭 한 번으로 SaaS 관리 끝" />
                <HeaderSubLineItem icon={BiTrendingDown} text="비용 절약과 효율화" />
                <HeaderSubLineItem icon={GoChecklist} text="계정 연동, 해지, 보안을 한 번에" />
            </div>
        </section>
    );
});

interface HeaderSubLineItemProps {
    icon: IconType;
    text: string;
}

const HeaderSubLineItem = memo((props: HeaderSubLineItemProps) => {
    const {icon, text} = props;

    const Icon = icon;
    const iconWrapperSize: number = 2.5;

    return (
        <div className="flex items-center gap-4">
            <div
                className="btn btn-circle btn-sm bg-scordi-light border-none text-white"
                style={{
                    height: `${iconWrapperSize}rem`,
                    width: `${iconWrapperSize}rem`,
                    minHeight: `${iconWrapperSize}rem`,
                }}
            >
                <Icon size={18} />
            </div>
            <p className="text-white text-lg">{text}</p>
        </div>
    );
});
