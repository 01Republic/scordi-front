import {memo, ReactNode} from 'react';
import {WithChildren} from '^types/global.type';

interface InvoiceSummaryCardProps extends WithChildren {
    icon: ReactNode;
    title: string;
    info1?: string | ReactNode;
    info2?: string | ReactNode;
}

export const InvoiceSummaryCard = memo((props: InvoiceSummaryCardProps) => {
    const {icon, title, info1, info2, children} = props;

    return (
        <div className="card bg-base-100 card-bordered">
            <div className="card-body gap-4">
                <p className="card-title text-16">
                    {icon} {title}
                </p>

                <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500">{info1}</p>
                    <p className="text-xl font-semibold">{info2}</p>
                </div>
            </div>
        </div>
    );
});
