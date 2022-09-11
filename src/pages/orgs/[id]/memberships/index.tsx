import React, { useEffect } from 'react';
import { PageRoute } from '^types/pageRoute.type';
import { useRouter } from 'next/router';
import { useCurrentOrg } from '^hooks/useCurrentOrg';
import { getOrgMainLayout } from '^layouts/org/mainLayout';
import { OrganizationDto } from '^types/organizationTypes';
import { PreLoader } from '^components/PreLoader';
import { ContentLayout } from '^layouts/ContentLayout';
import { ContentPanel } from '^layouts/ContentLayout/ContentPanel';
import { getMemberships } from '^api/membershipApi';
import { Paginated } from '^types/utils/paginated.dto';
import { MembershipDto } from '^types/membershipTypes';
import { Modal } from '^components/Modal';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { Icon } from '^components/Icon';

export const OrgMembershipIndexPageRoute: PageRoute = {
  pathname: '/orgs/[id]/memberships',
  path: (orgId: number) =>
    OrgMembershipIndexPageRoute.pathname.replace('[id]', String(orgId)),
};

export default function OrgMembershipIndexPage() {
  const router = useRouter();
  const organizationId = Number(router.query.id);
  const { currentOrg } = useCurrentOrg(organizationId);
  const org = currentOrg || ({} as OrganizationDto);
  const [members, setMembers] = React.useState<Paginated<MembershipDto>>(
    {} as Paginated<MembershipDto>,
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const inviteLink = `${
    typeof window !== 'undefined' && window.location.origin
  }/signup/${org.id}`;

  useEffect(() => {
    !!org.id &&
      getMemberships({ where: { organizationId: org.id } }).then((res) => {
        setMembers(res.data);
      });
  }, [org.id]);

  if (!org.id) return <PreLoader />;
  return (
    <>
      <Modal
        type={'info'}
        isOpen={isModalOpen}
        title={'멤버 초대하기'}
        description={
          '초대할 멤버에게 아래 링크를 전달하세요. 링크를 통해 접속한 사용자는 자동으로 멤버가 됩니다.'
        }
        children={
          <div className={'flex justify-between items-center'}>
            <p>{inviteLink}</p>
            <CopyToClipboard
              text={inviteLink}
              onCopy={() => toast('복사되었습니다.')}
            >
              <button className="btn h-4" onClick={() => setIsModalOpen(true)}>
                <Icon.File />
              </button>
            </CopyToClipboard>
          </div>
        }
        button1={{
          text: '닫기',
          onClick: () => setIsModalOpen(false),
        }}
      />
      <ContentLayout title={'멤버 관리'}>
        {/*<ContentPanel>*/}
        {/*  {currentOrg && <OrgMainLayout.OrgProfile currentOrg={currentOrg} />}*/}
        {/*</ContentPanel>*/}
        <div className="flex justify-end pb-4">
          <button
            className="btn btn-primary h-10"
            onClick={() => setIsModalOpen(true)}
          >
            멤버 초대하기
          </button>
        </div>
        <ContentPanel title={'멤버 목록'}>
          <div className={'-m-4'}>
            {members.items?.length > 0 &&
              members.items?.map((member, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center justify-center p-4 border-b border-b-[#dbd6e1]"
                >
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar placeholder inline-flex"
                  >
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                      <span className="text-xs">{member.user.name[0]}</span>
                    </div>
                  </label>
                  <div className={'flex-1 text-gray-800'}>
                    {member.user.name}
                  </div>
                  <div className={'flex-1 text-sm'}>{member.user.email}</div>
                  <div className={'flex-1 text-sm'}>{member.level}</div>
                </div>
              ))}
          </div>
        </ContentPanel>
      </ContentLayout>
    </>
  );
}

OrgMembershipIndexPage.getLayout = getOrgMainLayout;
