import {memo} from 'react';

export const MemberLoading = memo(function MemberLoading() {
    return (
        <div className="card card-compact bg-white shadow p-4 flex flex-col justify-between min-w-[300px] animate-pulse">
            <div>
                <div className="mb-4 w-full flex justify-between">
                    <div>
                        <div className="rounded-full bg-slate-200 w-[40px] h-[40px] shadow-xl"></div>
                    </div>
                    <div className="pt-2">
                        <div className=" h-4 bg-slate-200 rounded w-[80px]">&nbsp;</div>
                    </div>
                </div>

                <p className="mb-3 text-16 bg-slate-200 rounded">&nbsp;</p>

                <div className="w-full text-gray-500">
                    {/*<p>개발팀</p>*/}
                    <p>
                        <span className="inline-block min-w-[100px] h-4 bg-slate-200 rounded">&nbsp;</span>
                    </p>
                    <div className=" h-4 bg-slate-200 rounded w-[80px]">&nbsp;</div>
                </div>
            </div>
        </div>
    );
});
