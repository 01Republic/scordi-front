import {memo} from 'react';
import {VscOrganization} from 'react-icons/vsc';
import {BsUiChecksGrid} from 'react-icons/bs';
import {MdPayment} from 'react-icons/md';
import {MdOutlineReceiptLong} from 'react-icons/md';
import {TeamStatCard} from './TeamStatCard';
import {TeamDto} from '^models/Team/type';

interface TeamStatCardListProps {
    team: TeamDto;
}

export const TeamStatCardList = memo((props: TeamStatCardListProps) => {
    const {team} = props;

    return (
        <div className="grid grid-cols-2 gap-1 pt-2">
            <TeamStatCard
                Icon={() => <VscOrganization className="w-full h-full text-yellow-400" />}
                count={team.teamMemberCount.toLocaleString()}
                title="멤버"
            />
            <TeamStatCard
                Icon={() => <BsUiChecksGrid className="w-full h-full text-scordi" />}
                count={team.subscriptionCount.toLocaleString()}
                title="구독"
            />
            <TeamStatCard
                Icon={() => <MdPayment className="w-full h-full text-green-500" />}
                count={team.creditCardCount.toLocaleString()}
                title="결제수단"
            />
            <TeamStatCard
                Icon={() => <MdOutlineReceiptLong className="w-full h-full text-blue-400" />}
                count={team.invoiceAccountCount.toLocaleString()}
                title="청구서"
            />
        </div>
    );
});
