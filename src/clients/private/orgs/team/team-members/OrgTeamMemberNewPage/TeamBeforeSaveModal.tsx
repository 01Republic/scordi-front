import React, {memo, ReactNode} from 'react';
import {ModalProps} from '^components/modals/_shared/Modal.types';
import {SlideUpModal} from '^components/modals/_shared/SlideUpModal';
import {LucideIcon} from 'lucide-react';
import {CreateTeamMemberDto, teamMemberApi, TeamMemberDto} from '^models/TeamMember';
import {useOrgIdParam} from '^atoms/common';
import {toast} from 'react-hot-toast';
import {useRouter} from 'next/router';
import {OrgTeamMemberListPageRoute} from '^pages/orgs/[id]/teamMembers';
import {inviteMembershipApi} from '^models/Membership/api';
import {debounce} from 'lodash';
import {errorToast} from '^api/api';
import {ChevronRight, DatabaseBackup, Mail} from 'lucide-react';
import {useTranslation} from 'next-i18next';

interface BeforeSaveModalProps extends ModalProps {
    dto: CreateTeamMemberDto;
    setIsLoading: (value: boolean) => any;
}

export const TeamBeforeSaveModal = memo((props: BeforeSaveModalProps) => {
    const {t} = useTranslation('members');
    const orgId = useOrgIdParam();
    const router = useRouter();
    const {isOpened, onClose, dto, setIsLoading} = props;

    const redirect = () => router.push(OrgTeamMemberListPageRoute.path(orgId));
    const createMember = () => teamMemberApi.create(orgId, dto).then((res) => res.data);
    const inviteMember = (teamMember: TeamMemberDto) => {
        return inviteMembershipApi.create({
            organizationId: orgId,
            invitations: [{email: teamMember.email!, teamMemberId: teamMember.id}],
        });
    };

    const handleRequest = (request: () => Promise<any>) => {
        setIsLoading(true);
        onClose();
        request()
            .catch(errorToast)
            .finally(() => setIsLoading(false))
            .then(() => redirect());
    };

    return (
        <SlideUpModal open={isOpened} onClose={onClose} size="md">
            <h3 className="font-bold text-xl">{t('beforeSaveModal.title') as string}</h3>

            <div className="py-4 flex flex-col gap-3">
                <MethodOption
                    Icon={Mail}
                    title={t('beforeSaveModal.invite.title') as string}
                    desc={t('beforeSaveModal.invite.desc') as string}
                    onClick={() => {
                        handleRequest(() => {
                            return createMember()
                                .then(inviteMember)
                                .then(() => toast.success(t('beforeSaveModal.invite.success') as string));
                        });
                    }}
                />
                <MethodOption
                    Icon={DatabaseBackup}
                    title={t('beforeSaveModal.addWithoutInvite.title') as string}
                    desc={t('beforeSaveModal.addWithoutInvite.desc') as string}
                    onClick={() => {
                        handleRequest(() => {
                            return createMember().then(() =>
                                toast.success(t('beforeSaveModal.addWithoutInvite.success') as string),
                            );
                        });
                    }}
                />
            </div>
        </SlideUpModal>
    );
});
TeamBeforeSaveModal.displayName = 'BeforeSaveModal';

interface Props {
    Icon: LucideIcon;
    title: string;
    desc: ReactNode;
    onClick: () => any;
}

const MethodOption = memo((props: Props) => {
    const {Icon, title, desc, onClick} = props;

    return (
        <div
            className="flex items-center -mx-3 px-3 py-3 rounded-box cursor-pointer group hover:bg-scordi-50 transition-all"
            onClick={debounce(() => onClick(), 500)}
        >
            <div className="">
                <Icon size={24} />
            </div>

            <div className="flex-auto px-3">
                <p className="text-14">{title}</p>
                <p className="text-12 text-gray-400">{desc}</p>
            </div>

            <div>
                <ChevronRight className="text-gray-400 group-hover:text-black transition-all" />
            </div>
        </div>
    );
});
