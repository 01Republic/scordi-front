import React, {memo, useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {secretCodeParamsAtom} from './atom';
import {useDPayPlanList} from './hook';
import {DPayPageLayout} from './DPayPageLayout';

export const DPaySecretCodePage = memo(function DPaySecretCodePage() {
    const secretCode = useRecoilValue(secretCodeParamsAtom);
    const {isLoading, plans, fetch} = useDPayPlanList();

    useEffect(() => {
        fetch({
            where: {secretCode, isActive: true},
            itemsPerPage: 0,
        });
    }, [secretCode]);

    return (
        <DPayPageLayout>
            <div className="flex flex-col h-full gap-4 bg-gray-100">
                <div className="px-8 py-8 bg-white shadow">
                    <br />
                    <br />
                    <br />
                    <h2 className="text-2xl">
                        어느 것을
                        <br />
                        결제할까요?
                    </h2>
                    <br />
                </div>

                <div className="px-8 py-8 bg-white flex-grow flex flex-col gap-1">
                    {plans.map((plan, i) => {
                        return (
                            <label
                                key={i}
                                className="rounded-lg p-4 -mx-4 hover:bg-slate-50 transition cursor-pointer group checked:bg-slate-100"
                            >
                                <div className="flex items-center gap-4">
                                    <input type="radio" name="planId" className="radio radio-primary" value={plan.id} />
                                    <p className="text-14 font-semibold">{plan.name}</p>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        </DPayPageLayout>
    );
});
