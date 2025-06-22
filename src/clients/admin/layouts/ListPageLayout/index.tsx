import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {LinkTo} from '^components/util/LinkTo';
import {AdminPageHeader, AdminPageHeaderProps} from '^admin/layouts';
import {AdminPageLayout} from '../AdminPageLayout';
import {Plus} from 'lucide-react';

interface AdminListPageHeaderProps extends AdminPageHeaderProps {
    createPageRoute?: string;
    Buttons?: () => JSX.Element;
}

interface AdminListPageLayoutProps extends AdminListPageHeaderProps {
    //
}

export const AdminListPageLayout = memo((props: AdminListPageLayoutProps & WithChildren) => {
    const {title, breadcrumbs, Buttons, createPageRoute, children, tabNav} = props;

    return (
        <AdminPageLayout>
            <AdminPageHeader title={title} breadcrumbs={breadcrumbs} tabNav={tabNav}>
                <div className="flex items-center">
                    {Buttons && <Buttons />}

                    {/* Add New Button */}
                    {createPageRoute && (
                        <LinkTo href={createPageRoute} displayLoading={false} className="btn btn-primary font-semibold">
                            <Plus fontSize={18} />
                        </LinkTo>
                    )}
                </div>
            </AdminPageHeader>

            {children}
        </AdminPageLayout>
    );
});
