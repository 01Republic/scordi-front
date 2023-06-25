import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AdminPageLayout} from '../AdminPageLayout';
import {AdminPageHeader, AdminPageHeaderProps} from '../AdminPageLayout/AdminPageHeader';
import {useRouter} from 'next/router';

type AdminDetailPageLayoutProps = WithChildren &
    Omit<AdminPageHeaderProps, 'children'> & {
        editPageRoute?: string;
        onDelete?: () => any;
    };

export const AdminDetailPageLayout = memo((props: AdminDetailPageLayoutProps) => {
    const {title, breadcrumbs, editPageRoute, onDelete, tabNav, children} = props;
    const router = useRouter();

    return (
        <AdminPageLayout>
            <AdminPageHeader title={title} breadcrumbs={breadcrumbs} tabNav={tabNav}>
                <div className="flex gap-2">
                    <button className="btn btn-scordi-light-300" onClick={() => router.back()}>
                        back
                    </button>

                    {/* Edit Button */}
                    {editPageRoute && (
                        <button className="btn btn-warning font-semibold" onClick={() => router.push(editPageRoute)}>
                            edit
                        </button>
                    )}

                    {/* Delete Button */}
                    {onDelete && (
                        <button
                            className="btn btn-error font-semibold"
                            onClick={() => {
                                if (confirm('Are you sure?')) onDelete();
                            }}
                        >
                            delete
                        </button>
                    )}
                </div>
            </AdminPageHeader>

            {children}
        </AdminPageLayout>
    );
});
