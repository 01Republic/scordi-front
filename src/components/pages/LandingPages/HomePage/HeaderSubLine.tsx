import {memo} from 'react';
import {GiClick} from '@react-icons/all-files/gi/GiClick';
import {IconType} from '@react-icons/all-files';
import {GoTasklist} from '@react-icons/all-files/go/GoTasklist';
import {BsCalendarEvent} from '^components/react-icons';

export const HeaderSubLine = memo(() => {
    return (
        <section className="bg-scordi py-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 md:items-center justify-between max-w-[70%] mx-auto">
                <HeaderSubLineItem icon={GiClick} text="클릭 한 번에 비용 확인 완료" />
                <HeaderSubLineItem icon={BsCalendarEvent} text="다가올 지출까지 똑똑하게 확인" />
                <HeaderSubLineItem icon={GoTasklist} text="인보이스 찾는 비효율 해결" />
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
