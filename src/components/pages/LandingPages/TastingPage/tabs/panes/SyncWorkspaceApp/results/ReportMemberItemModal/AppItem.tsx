import React, {memo} from 'react';
import {ReportItemAppDto} from '^components/pages/LandingPages/TastingPage/tabs/panes/SyncWorkspaceApp/dto/report-item-app.dto';
import {Avatar} from '^components/Avatar';
import {mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {currencyFormat} from '^api/tasting.api/gmail/agent/parse-email-price';

interface ReportMemberAppItemProps {
    app: ReportItemAppDto;
}

export const ReportMemberAppItem = memo((props: ReportMemberAppItemProps) => {
    const {app} = props;

    return (
        <li>
            <div className="!w-auto gap-4 px-4 py-3 -mx-4 hover:bg-neutral btn-like no-selectable">
                <Avatar
                    src={app.product?.image}
                    className="w-9 h-9 outline outline-offset-1 outline-slate-100 rounded-full"
                />

                <div className="flex-1">
                    <p className="leading-none font-light text-xs">{yyyy_mm_dd_hh_mm(app.lastAuthorizedTime)}</p>
                    <p className="font-semibold text-gray-800">{app.name}</p>
                </div>

                {/*<p className="text-[16px]">*/}
                {/*  <small className="mr-0.5">{symbol}</small>*/}
                {/*  <span className="font-semibold">{currencyFormat(price, displayCurrency)}</span>*/}
                {/*</p>*/}
            </div>
        </li>
    );
});
ReportMemberAppItem.displayName = 'ReportMemberAppItem';
