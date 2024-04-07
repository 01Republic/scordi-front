import {WithChildren} from '^types/global.type';
import {ReactNodeLike} from 'prop-types';
import {memo} from 'react';
import {useRouter} from 'next/router';
import {LinkTo} from '^components/util/LinkTo';
import {AdminPageContainer} from '^admin/layouts';

export type BreadCrumb = {
    text: string;
    href?: string;
};

export type AdminPageHeaderProps = WithChildren & {
    title?: ReactNodeLike;
    breadcrumbs?: BreadCrumb[];
    backButton?: boolean;
    tabNav?: ReactNodeLike;
};

export const AdminPageHeader = memo((props: AdminPageHeaderProps) => {
    const {title, breadcrumbs, backButton = false, tabNav, children} = props;
    const router = useRouter();

    return (
        <>
            <div className="sm:hidden w-full sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3">
                {backButton ? <div onClick={() => router.back()}>{`<`}</div> : <div></div>}
                <h1 className="text-lg">{title}</h1>
                <div></div>
            </div>
            <div className={`w-full top-0 sm:z-10 bg-neutral ${tabNav ? '' : 'shadow'}`}>
                <AdminPageContainer fluid className="hidden sm:block pb-5">
                    <div className="flex">
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl">{title}</h1>
                            {breadcrumbs && (
                                <div className="text-sm breadcrumbs">
                                    <ul>
                                        {breadcrumbs.map((breadcrumb, i) => (
                                            <li key={i}>
                                                {breadcrumb.href ? (
                                                    <LinkTo text={breadcrumb.text} href={breadcrumb.href} />
                                                ) : (
                                                    breadcrumb.text
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {children}
                    </div>
                </AdminPageContainer>

                <div className="">{tabNav}</div>
            </div>
        </>
    );
});
