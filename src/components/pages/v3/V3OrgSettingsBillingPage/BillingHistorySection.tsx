import React, {memo} from 'react';
import styles from '^styles/v3/V3MainLayout.module.scss';
import {EditFormSection} from '^v3/share/EditFormSection';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';

export const BillingHistorySection = memo(() => {
    const currentOrg = useRecoilValue(currentOrgAtom);

    const histories: any[] = [];

    return (
        <EditFormSection title="결제 이력" editMode={false}>
            <div className={`${styles.panel_table} w-full inline-grid`}>
                <div className="overflow-x-auto w-full">
                    <table className="table table-compact">
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>플랜</th>
                                <th>결제금액</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {histories.length === 0 ? (
                                <tr>
                                    <td colSpan={4}>
                                        <div className="w-full card-body items-center text-center">
                                            <p className="text-xs">결제 이력이 없습니다.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                histories.map((history, i) => (
                                    <tr className="hover" key={i}>
                                        <td>12/16/2020</td>
                                        <td>무료 체험</td>
                                        <td>0</td>
                                        <td>-</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </EditFormSection>
    );
});
