import {memo} from 'react';

export const KeepBodyStickyStyle = memo(() => {
    return (
        <style
            dangerouslySetInnerHTML={{
                __html: `
body.swal2-shown:not(.swal2-no-backdrop,.swal2-toast-shown) {
    overflow: visible !important;
}
            `,
            }}
        />
    );
});
