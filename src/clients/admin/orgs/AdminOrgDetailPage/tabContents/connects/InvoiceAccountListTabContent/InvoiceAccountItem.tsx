import {memo} from 'react';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {CardTableTR} from '^admin/share';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {GoDotFill} from 'react-icons/go';
import {InvoiceAppDto} from '^models/InvoiceApp/type';
import {InvoiceAppManager} from '^models/InvoiceApp/manager';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
    borderBottom?: boolean;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const {invoiceAccount, borderBottom = true} = props;
    const {invoiceApps = []} = invoiceAccount;

    return (
        <CardTableTR gridClass="grid-cols-5" borderBottom={borderBottom}>
            {/* Email */}
            <div className="whitespace-nowrap">
                <p className="text-xs">(#{invoiceAccount.id})</p>
                <p>{invoiceAccount.email}</p>
            </div>

            {/* 생성일시 */}
            <div>{yyyy_mm_dd_hh_mm(invoiceAccount.createdAt)}</div>

            {/* 남은 유효기간 */}
            <div className="flex items-center gap-2 whitespace-nowrap">
                {invoiceAccount.isTokenExpiredAssume ? (
                    <div className="badge bg-white gap-1 no-selectable border-success whitespace-nowrap">
                        <GoDotFill className="text-success" size={20} />
                        <span>On Air</span>
                    </div>
                ) : (
                    <div className="badge bg-white gap-1 no-selectable border-gray-300 whitespace-nowrap">
                        <GoDotFill className="text-gray-500" size={20} />
                        <span>Expired</span>
                    </div>
                )}
                : {invoiceAccount.tokenExpireLeft}일
            </div>

            {/* 구독 */}
            <div>
                <InvoiceAppAvatarGroup invoiceApps={invoiceApps} />
            </div>

            {/* actions */}
            <div className="flex gap-2 items-center">
                <button className="btn btn-sm btn-primary">보기</button>
                <button className="btn btn-sm btn-warning">수정</button>
                <button className="btn btn-sm btn-error">삭제</button>
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
    const imageSize = '32px';

    return (
        <div className={`avatar-group -space-x-4 overflow-visible`}>
            {InvoiceApp.first(avatarMaxDisplay).map((invoiceApp, i) => (
                <div key={i} className="tooltip cursor-pointer" data-tip={invoiceApp.product.name()}>
                    <div className="avatar">
                        <div className={`w-[${imageSize}]`}>
                            <img src={invoiceApp.product.image} />
                        </div>
                    </div>
                </div>
            ))}
            {InvoiceApp.length > avatarMaxDisplay && (
                <div className="tooltip cursor-pointer" data-tip={`총 ${InvoiceApp.length}개`}>
                    <div className="avatar placeholder">
                        <div className={`w-[${imageSize}] bg-neutral-focus text-neutral-content`}>
                            <span>+{InvoiceApp.length - avatarMaxDisplay}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
