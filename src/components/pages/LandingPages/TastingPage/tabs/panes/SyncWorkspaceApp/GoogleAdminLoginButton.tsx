import {memo} from 'react';

export const GoogleAdminLoginButton = memo(function GoogleAdminLoginButton() {
    return (
        <div
            className="tooltip--TastingGoogleButton tooltip tooltip-open tooltip-primary"
            data-tip="구글 워크스페이스 연동이 필요해요!"
        >
            <button className="btn_google_signin_light w-[266px] h-[64px]" style={{backgroundPosition: 'left'}} />
        </div>
    );
});
