import {OrganizationDto} from '^models/Organization/type';
import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {Avatar} from '^components/Avatar';

interface SelectOrgItemProps {
    org: OrganizationDto;
    isCurrent: boolean;
}

export const SelectOrgItem = memo((props: SelectOrgItemProps) => {
    const {org, isCurrent} = props;

    return (
        <li className="w-full">
            <LinkTo
                href={V3OrgHomePageRoute.path(org.id)}
                className={`text-sm !normal-case flex gap-2 py-2 ${
                    isCurrent ? 'bg-scordi-light-100' : 'bg-base-100'
                } font-[500] text-gray-700 hover:text-scordi`}
            >
                <Avatar className="w-5" src={org.image} />
                <span>{org.name}</span>
            </LinkTo>
        </li>
    );
});
