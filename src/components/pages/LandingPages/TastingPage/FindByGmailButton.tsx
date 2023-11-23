import React, {memo} from 'react';
import {googleAuthForGmail} from '^api/tasting.api';
import {useRecoilState} from 'recoil';
import {gmailItemsLoadedAtom} from './pageAtoms';
import {SummarySection} from './SummarySection';
import {GoogleLoginBtn} from '^components/pages/UsersLogin/GoogleLoginBtn';
import {GoogleOAuthProvider} from '@react-oauth/google';

export const FindByGmailButton = memo(() => {
    // const router = useRouter();
    // const setGmailProfile = useSetRecoilState(gmailProfileAtom);
    // const setGmailItems = useSetRecoilState(gmailItemsAtom);
    // const [isLoading, setIsLoading] = useRecoilState(gmailItemsLoadingAtom);
    const [isLoaded, setIsLoaded] = useRecoilState(gmailItemsLoadedAtom);
    // const {accessTokenData} = useGoogleAccessToken();

    // console.log('accessTokenData', accessTokenData);
    // // 엑세스 토큰이 아직 세팅되어 있지 않은 상태면 생략하고,
    // // 엑세스 토큰이 세팅되어 있는 상태면 지메일을 호출한다.
    // useEffect(() => {
    //     if (!accessTokenData) return;
    //     console.log('accessTokenData', accessTokenData);
    //     const gmailAgent = new GmailAgent(accessTokenData);
    //     gmailAgent.getProfile().then(setGmailProfile);
    //     setIsLoading(true);
    //     gmailAgent
    //         .getList()
    //         .then((items) => {
    //             return items;
    //         })
    //         .then(setGmailItems)
    //         .then(() => {
    //             setIsLoading(false);
    //             setIsLoaded(true);
    //         });
    // }, [accessTokenData]);

    return (
        <div id="tasting-handler" className={`${isLoaded ? 'active' : ''}`}>
            <div id="tasting-handler--start-button" style={{overflow: 'visible'}}>
                <div
                    className="tooltip--TastingGoogleButton tooltip tooltip-open tooltip-bottom sm:tooltip-top tooltip-secondary before:left-[-8%]"
                    data-tip="서비스 알림을 받고있는 구글계정을 넣어주세요!"
                >
                    <button
                        onClick={() => googleAuthForGmail()}
                        className="btn_google_signin_light w-[266px] h-[64px]"
                        style={{backgroundPosition: 'left'}}
                    />
                </div>
            </div>
        </div>
    );
});
