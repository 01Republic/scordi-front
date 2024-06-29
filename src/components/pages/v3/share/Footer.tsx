import React, {memo, useEffect} from 'react';
import {OutLink} from '^components/OutLink';
import {V3MainLayoutContainer} from '^v3/layouts/V3MainLayout';
import {useCurrentLocale} from '^hooks/useCurrentLocale';
import {locales} from '^utils/locale-helper';
import {SelectDropdown} from '^v3/share/Select';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {currentOrgAtom} from '^models/Organization/atom';
import {LinkTo} from '^components/util/LinkTo';
import {OrgMainPageRoute} from '^pages/orgs/[id]';
import {useMeasuredUserId} from '^components/ExternalCDNScripts/measured';

export const V3Footer = memo(() => {
    const router = useRouter();
    const currentOrg = useRecoilValue(currentOrgAtom);
    const {currentLocale} = useCurrentLocale();
    useMeasuredUserId();

    return (
        <div className="bg-base-100 mt-auto">
            <V3MainLayoutContainer className="!py-6">
                <footer className="footer items-center bg-base-100 text-neutral-content">
                    <div className="items-center grid-flow-col">
                        <div className="flex flex-col gap-2">
                            <div className="grid grid-flow-col gap-4 text-xs">
                                {/*<a className="link link-hover">About us</a>*/}
                                <OutLink
                                    href="mailto:official@01republic.io"
                                    className="link-hover !text-gray-700"
                                    text="Contact"
                                />
                                {/*<a className="link link-hover">Jobs</a>*/}
                                {/*<a className="link link-hover">Press kit</a>*/}
                            </div>
                            <p className="text-xs text-gray-500">
                                Copyright © 2023 - All right reserved
                                {currentOrg && (
                                    <LinkTo
                                        text="."
                                        href={OrgMainPageRoute.path(currentOrg.id)}
                                        displayLoading={false}
                                    />
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                        <SelectDropdown
                            placeholder="Set language"
                            options={locales.map((locale) => ({
                                value: locale.code,
                                text: locale.text,
                                selected: currentLocale === locale.code,
                            }))}
                            onChange={(selected) =>
                                router.push(
                                    {
                                        pathname: router.pathname,
                                        query: router.query,
                                    },
                                    router.asPath,
                                    {locale: selected.value},
                                )
                            }
                        />
                    </div>
                </footer>
            </V3MainLayoutContainer>
        </div>
    );
});
