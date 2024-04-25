import {memo} from 'react';
import {useRouter} from 'next/router';
import {WithChildren} from '^types/global.type';
import {AdminPageLayout} from '../AdminPageLayout';
import {AdminPageHeader, AdminPageHeaderProps} from '^admin/layouts';
import {FiPlus} from '@react-icons/all-files/fi/FiPlus';

type AdminListPageLayoutProps = WithChildren &
    Omit<AdminPageHeaderProps, 'children'> & {
        createPageRoute?: string;
    };

export const AdminListPageLayout = memo((props: AdminListPageLayoutProps) => {
    const {title, breadcrumbs, createPageRoute, children, tabNav} = props;
    const router = useRouter();

    return (
        <AdminPageLayout>
            <AdminPageHeader title={title} breadcrumbs={breadcrumbs} tabNav={tabNav}>
                {/* Add New Button */}
                {createPageRoute && (
                    <button className="btn btn-primary font-semibold" onClick={() => router.push(createPageRoute)}>
                        <FiPlus size={20} />
                    </button>
                )}
            </AdminPageHeader>

            {children}
        </AdminPageLayout>
    );
});
