import React, {memo, useEffect} from 'react';
import {ApplicationDto} from '^types/application.type';
import {Paginator} from '^components/Paginator';
import {useBillingHistoryList} from '^hooks/useBillingHistories';
import {BillingHistoryItem} from './BillingHistoryItem';
import {
    AiOutlineSync,
    BsFillCaretDownFill,
    BsFillPencilFill,
    BsLightningChargeFill,
    FiUpload,
} from '^components/react-icons';

interface BillingHistoryTableProps {
    application: ApplicationDto;
}

export const BillingHistoryTable = memo((props: BillingHistoryTableProps) => {
    const {application} = props;
    const {items: billingHistories, fetchItems: fetchBillingHistories, pagination} = useBillingHistoryList();

    useEffect(() => {
        if (!application) return;
        fetchBillingHistories(application.id, 1, true);
    }, [application]);

    return (
        <div className="bs-container mb-10">
            <div className="bs-row items-center mb-4">
                {/* Left */}
                <div>
                    <h3 className="leading-none">Billing Histories ({pagination.totalItemCount})</h3>
                </div>

                {/* Right */}
                <div className="ml-auto flex gap-2">
                    <div className="dropdown dropdown-end dropdown-hover">
                        <label
                            tabIndex={0}
                            className="btn btn-sm btn-success border border-success text-white shadow gap-2"
                        >
                            <span className="normal-case">Update</span>
                            <BsFillCaretDownFill size={11} className="-mr-1" />
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box whitespace-nowrap"
                        >
                            <li>
                                <a className="bg-pink-100 hover:bg-pink-200">
                                    <BsLightningChargeFill />
                                    Sync again
                                </a>
                            </li>
                            <li>
                                <a>
                                    <FiUpload />
                                    Add by invoice file
                                </a>
                            </li>
                            <li>
                                <a>
                                    <BsFillPencilFill />
                                    Add in manual
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bs-row mb-4">
                <div className="bs-col-12 px-0">
                    <div className="card w-full bg-white shadow border">
                        <div className="card-body p-0 overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>Paid</th>
                                        <th>UID</th>
                                        <th>Issued Date</th>
                                        <th style={{width: '35%'}}>Payment method</th>
                                        <th>Amount</th>
                                        <th>Receipt</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billingHistories.map((billingHistory, i) => (
                                        <BillingHistoryItem billingHistory={billingHistory} key={i} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bs-row">
                <div className="bs-col-12 px-0">
                    <div className="flex justify-end gap-3">
                        <Paginator
                            className="border shadow rounded-lg"
                            currentPage={pagination.currentPage}
                            totalPage={pagination.totalPage}
                            onClick={(pageNum) => fetchBillingHistories(application.id, pageNum)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
