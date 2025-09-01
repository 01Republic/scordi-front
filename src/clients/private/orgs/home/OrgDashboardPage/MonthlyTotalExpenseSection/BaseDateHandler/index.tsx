import {memo} from 'react';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {lpp, monthAfter, monthBefore} from '^utils/dateTime';

interface BaseDateHandlerProps {
    baseDate: Date;
    onChange: (date: Date) => void;
}

export const BaseDateHandler = memo((props: BaseDateHandlerProps) => {
    const {baseDate, onChange} = props;
    const today = new Date();

    const prevDate = monthBefore(1, baseDate);
    const nextDate = monthAfter(1, baseDate);

    return (
        <div className="flex items-center gap-4">
            <div>
                <button
                    className="btn btn-square btn-sm btn-ghost no-animation btn-animation !outline-0"
                    onClick={() => onChange(prevDate)}
                >
                    ◀︎{/*<ChevronLeft className="" fontSize={20} />*/}
                </button>
            </div>
            <div>
                <PrintDate date={baseDate} />
            </div>
            <div>
                <button
                    className={`btn btn-square btn-sm btn-ghost no-animation btn-animation !outline-0 ${
                        nextDate.getTime() > today.getTime() ? 'pointer-events-none opacity-30' : ''
                    }`}
                    onClick={() => onChange(nextDate)}
                >
                    ▶{/*<ChevronRight className="" fontSize={20} />*/}
                </button>
            </div>
        </div>
    );
});
BaseDateHandler.displayName = 'BaseDateHandler';

const PrintDate = ({date}: {date: Date}) => {
    return (
        <div className="font-semibold text-18 flex items-center gap-2">
            {date.getFullYear() !== new Date().getFullYear() && <span>{lpp(date, 'yy')}년</span>}
            <span>{lpp(date, 'M')}월</span>
        </div>
    );
};
