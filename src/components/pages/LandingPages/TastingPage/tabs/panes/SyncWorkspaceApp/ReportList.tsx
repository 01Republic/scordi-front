import {memo} from 'react';
import {ReportDto} from './dto/report.dto';

interface ReportListProps {
    reports: ReportDto | undefined;
}

export const ReportList = memo((props: ReportListProps) => {
    const {reports} = props;

    return (
        <section>
            <h1 className="font-semibold mb-5">제로원리퍼블릭에서 사용하는 서비스</h1>
            {reports?.items.map((item, i) => (
                <div key={i} className="">
                    <h3 className="font-semibold text-gray-500 mb-5">💡{item.email}님이 사용중인 서비스</h3>
                    <div className="w-full grid grid-cols-5 gap-2 items-center justify-items-stretch mb-10">
                        {item.apps.map((app) => (
                            <div className="card bg-base-100 shadow-xl py-5 px-2 text-center font-semibold">
                                {app.appName}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
});
