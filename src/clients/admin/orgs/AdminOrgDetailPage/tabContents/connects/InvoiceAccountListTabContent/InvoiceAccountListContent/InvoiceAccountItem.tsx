import React, {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {CardTableTR} from '^admin/share';
import {hh_mm, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {InvoiceAppManager} from '^models/InvoiceApp/manager';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {Circle, MoreHorizontal} from 'lucide-react';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
    borderBottom?: boolean;
    moveTab?: () => any;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const {invoiceAccount, borderBottom = true, moveTab = console.log} = props;
    const {invoiceApps = []} = invoiceAccount;
    const isManuallyCreated = invoiceAccount.isManuallyCreated;

    return (
        <CardTableTR gridClass="grid-cols-12" className={`!text-12`} borderBottom={borderBottom}>
            {/* ID */}
            <div>
                <span className="badge badge-xs">#{invoiceAccount.id}</span>
            </div>

            {/* Email */}
            <div
                className={`col-span-2 flex items-center justify-between ${
                    isManuallyCreated ? '' : 'link link-primary cursor-pointer'
                }`}
                onClick={isManuallyCreated ? undefined : moveTab}
            >
                <span>{invoiceAccount.email}</span>
            </div>

            {/* 등록일시 */}
            <div>
                <div className={`tooltip tooltip-top tooltip-success`} data-tip={hh_mm(invoiceAccount.createdAt)}>
                    {yyyy_mm_dd(invoiceAccount.createdAt)}
                </div>
            </div>

            {/* 남은 유효기간 */}
            <div className="flex items-center gap-2 whitespace-nowrap">
                {/*{invoiceAccount.isTokenExpiredAssume ? (*/}
                {/*    <div className="badge bg-white gap-1 no-selectable border-success whitespace-nowrap">*/}
                {/*        <Circle className="text-success" size={20} />*/}
                {/*        <span>On Air</span>*/}
                {/*    </div>*/}
                {/*) : (*/}
                {/*    <div className="badge bg-white gap-1 no-selectable border-gray-300 whitespace-nowrap">*/}
                {/*        <Circle className="text-gray-500" size={20} />*/}
                {/*        <span>Expired</span>*/}
                {/*    </div>*/}
                {/*)}*/}
                {isManuallyCreated ? (
                    <TagUI className={'bg-lime-100'}>수동등록</TagUI>
                ) : (
                    <span>{invoiceAccount.tokenExpireLeft}일</span>
                )}
            </div>

            {/* 구독 */}
            <div>
                {/*<InvoiceAppAvatarGroup invoiceApps={invoiceApps} />*/}
                {invoiceApps.length ? <span>{invoiceApps.length.toLocaleString()}개</span> : <span>-</span>}
            </div>

            {/* 발행일 */}
            <div>
                <Empty />
            </div>

            {/* 연동여부 */}
            <div>
                <Empty />
            </div>

            {/* 시작일 */}
            <div className="">
                <Empty />
            </div>

            {/* 마지막 연동 */}
            <div className="">
                <Empty />
            </div>

            {/* 총 결제건수 */}
            <div className="text-right">
                <Empty />
            </div>

            {/* actions */}
            <div className="flex items-center justify-end gap-1">
                <MoreDropdown
                    placement="bottom-end"
                    Trigger={() => (
                        <button className={`btn btn-xs btn-square !border-gray-400 !bg-white !text-gray-600`}>
                            <MoreHorizontal fontSize={16} />
                        </button>
                    )}
                >
                    {() => (
                        <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                            <MoreDropdown.MenuItem>보기</MoreDropdown.MenuItem>
                            <MoreDropdown.MenuItem className="bg-warning">수정</MoreDropdown.MenuItem>
                            <MoreDropdown.MenuItem className="bg-error">삭제</MoreDropdown.MenuItem>
                        </div>
                    )}
                </MoreDropdown>
            </div>
        </CardTableTR>
    );
});

interface InvoiceAppAvatarGroupProps {
    invoiceApps: InvoiceAppDto[];
}

export const InvoiceAppAvatarGroup = memo((props: InvoiceAppAvatarGroupProps) => {
    const {invoiceApps} = props;

    const InvoiceApp = InvoiceAppManager.init(invoiceApps || []);

    const avatarMaxDisplay = 4;

    return (
        <div className={`avatar-group -space-x-2 overflow-visible`}>
            {InvoiceApp.first(avatarMaxDisplay).map((invoiceApp, i) => (
                <div key={i} className="tooltip cursor-pointer" data-tip={invoiceApp.product?.name()}>
                    <div className="avatar border-[2px]">
                        <div className={`w-[20px]`}>
                            <img src={invoiceApp.product?.image} />
                        </div>
                    </div>
                </div>
            ))}
            {InvoiceApp.length > avatarMaxDisplay && (
                <div className="tooltip cursor-pointer" data-tip={`총 ${InvoiceApp.length}개`}>
                    <div className="avatar placeholder border-[2px]">
                        <div className={`w-[20px] bg-neutral-focus text-neutral-content`}>
                            <span className="text-10">+{InvoiceApp.length - avatarMaxDisplay}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

const Empty = () => <span className="text-12 text-gray-300">준비중</span>;
