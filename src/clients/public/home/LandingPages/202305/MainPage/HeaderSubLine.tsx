import {memo} from 'react';
import {LucideIcon} from 'lucide-react';
import {CheckSquare, MousePointer, TrendingDown} from 'lucide-react';
export const HeaderSubLine = memo(() => {
    return (
        <section className="bg-scordi py-6">
            <div className="container flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between max-w-[70%]">
                <HeaderSubLineItem icon={MousePointer} text="클릭 한 번으로 SaaS 관리 끝" />
                <HeaderSubLineItem icon={TrendingDown} text="비용 지출까지 똑똑하게 확인" />
                <HeaderSubLineItem icon={CheckSquare} text="계정 연동과 해제를 한 번에" />
            </div>
        </section>
    );
});

interface HeaderSubLineItemProps {
    icon: LucideIcon;
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
