import {memo} from 'react';
import {InvoiceAccountDto} from '^types/invoiceAccount.type';
import {CardTableTR} from '^admin/share';
import {yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {GoDotFill} from 'react-icons/go';
import {SubscriptionManager} from '^models/Subscription';

interface InvoiceAccountItemProps {
    invoiceAccount: InvoiceAccountDto;
    borderBottom?: boolean;
}

export const InvoiceAccountItem = memo((props: InvoiceAccountItemProps) => {
    const {invoiceAccount, borderBottom = true} = props;

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
                <SubscriptionAvatarGroup invoiceAccount={invoiceAccount} />
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

interface SubscriptionAvatarGroupProps {
    invoiceAccount: InvoiceAccountDto;
}

export const SubscriptionAvatarGroup = memo((props: SubscriptionAvatarGroupProps) => {
    const {invoiceAccount} = props;

    const Subscription = SubscriptionManager.init(invoiceAccount.subscriptions || []);

    const avatarMaxDisplay = 4;
    const imageSize = '32px';

    return (
        <div className={`avatar-group -space-x-4 overflow-visible`}>
            {Subscription.first(avatarMaxDisplay).map((subscription, i) => (
                <div key={i} className="tooltip cursor-pointer" data-tip={subscription.product.name()}>
                    <div className="avatar">
                        <div className={`w-[${imageSize}]`}>
                            <img src={subscription.product.image} />
                        </div>
                    </div>
                </div>
            ))}
            {Subscription.length > avatarMaxDisplay && (
                <div className="tooltip cursor-pointer" data-tip={`총 ${Subscription.length}개`}>
                    <div className="avatar placeholder">
                        <div className={`w-[${imageSize}] bg-neutral-focus text-neutral-content`}>
                            <span>+{Subscription.length - avatarMaxDisplay}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
