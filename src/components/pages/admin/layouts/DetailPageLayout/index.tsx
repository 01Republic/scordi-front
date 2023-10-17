import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {AdminPageLayout} from '../AdminPageLayout';
import {AdminPageHeader, AdminPageHeaderProps} from '../AdminPageLayout/AdminPageHeader';
import {useRouter} from 'next/router';
import {ReactComponentLike} from 'prop-types';

type AdminDetailPageLayoutProps = WithChildren &
    Omit<AdminPageHeaderProps, 'children'> & {
        editPageRoute?: string;
        onDelete?: () => any;
        buttons?: ReactComponentLike[];
    };

export const AdminDetailPageLayout = memo((props: AdminDetailPageLayoutProps) => {
    const {title, breadcrumbs, editPageRoute, onDelete, buttons = [], tabNav, children} = props;
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

                    {buttons.map((Button, i) => (
                        <Button key={i} />
                    ))}
                </div>
            </AdminPageHeader>

            {children}
        </AdminPageLayout>
    );
});
