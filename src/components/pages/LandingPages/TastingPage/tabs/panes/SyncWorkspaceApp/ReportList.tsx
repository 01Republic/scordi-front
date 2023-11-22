import {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {reportState} from './atom';

export const ReportList = memo(() => {
    const reportList = useRecoilValue(reportState);

    if (!reportList) return <></>;

    return (
        <section>
            <h1 className="font-semibold mb-5">{reportList.workspaceName}에서 사용하는 서비스</h1>
            {reportList.items.map((report, i) => (
                <div key={i} className="">
                    <h3 className="font-semibold text-gray-500 mb-5">💡{report.email}님이 사용중인 서비스</h3>
                    <div className="w-full grid grid-cols-5 gap-2 items-center justify-items-stretch mb-10">
                        {report?.apps.map((app) => (
                            <div className="card bg-base-100 shadow-xl py-5 px-2 text-center font-semibold">
                                <span></span> {app.appName}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
});
