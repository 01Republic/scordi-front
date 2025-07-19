import {memo} from 'react';
import {LinkTo} from '^components/util/LinkTo';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {V3OrgHomePageRoute} from '^pages/v3/orgs/[orgId]';
import {termsUrl} from '^config/environments';
import {useTranslation} from 'next-i18next';

export const Footer = memo(function Footer() {
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {t} = useTranslation('common');

    return (
        <footer className="container px-4 md:max-w-screen-lg flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-6 sticky top-[100%]">
            <div>
                <img
                    src="/images/logo/scordi/01republic/png/long-black.png"
                    alt="01Republic, Inc."
                    className="w-[120px]"
                />
            </div>

            <div className="flex-auto text-gray-500">
                <p>
                    {t('footer.companyName')} {t('footer.ceo')} <br className="sm:hidden" /> {t('footer.regNo')} <br />
                    {t('footer.salesNo')} <br className="sm:hidden" /> {t('footer.address')}{' '}
                    <br className="sm:hidden" /> {t('footer.customerService')} <br />
                    {t('footer.copyright')}
                    {currentOrg && (
                        <LinkTo text="." href={V3OrgHomePageRoute.path(currentOrg.id)} displayLoading={false} />
                    )}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 font-semibold text-14">
                <LinkTo target="_blank" href={termsUrl.privacy} text={t('footer.privacy')} displayLoading={false} />
                <LinkTo target="_blank" href={termsUrl.serviceUsage} text={t('footer.terms')} displayLoading={false} />
            </div>
        </footer>
    );
});
