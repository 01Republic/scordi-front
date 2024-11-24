import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {FiPlus} from '@react-icons/all-files/fi/FiPlus';
import {LinkTo} from '^components/util/LinkTo';
import {AdminPageHeader, AdminPageHeaderProps} from '^admin/layouts';
import {AdminPageLayout} from '../AdminPageLayout';

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
                        <LinkTo href={createPageRoute} className="btn btn-primary font-semibold">
                            <FiPlus size={20} />
                        </LinkTo>
                    )}
                </div>
            </AdminPageHeader>

            {children}
        </AdminPageLayout>
    );
});
