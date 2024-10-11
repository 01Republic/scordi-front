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
                Icon={() => <VscOrganization className="text-yellow-400" fontSize={20} />}
                count={team.teamMemberCount.toLocaleString()}
                title="멤버"
            />
            <TeamStatCard
                Icon={() => <BsUiChecksGrid className="text-scordi relative top-1" fontSize={16} />}
                count={team.subscriptionCount.toLocaleString()}
                title="구독"
            />
            <TeamStatCard
                Icon={() => <MdPayment className="text-green-500" fontSize={20} />}
                count={team.creditCardCount.toLocaleString()}
                title="결제수단"
            />
            <TeamStatCard
                Icon={() => <MdOutlineReceiptLong className="text-blue-400" fontSize={20} />}
                count={team.invoiceAccountCount.toLocaleString()}
                title="청구서"
            />
        </div>
    );
});
