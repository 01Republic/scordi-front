import {memo} from 'react';
import {ModalActionWrapper} from '^components/Modal';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {LoginWithOrgs} from '^types/crawler';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi, makeSignHeader} from '^api/crawler';
import {PreLoaderSm} from '^components/PreLoaderSm';
import {OutLink} from '^components/OutLink';
import {MdNavigateBefore, MdNavigateNext} from '^components/react-icons';
import {createApplication} from '^api/application.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const SelectOrgStage = memo(() => {
    const organizationId = useRouterIdParamState('id', orgIdParamState);
    const {
        selectOrgForm,
        currentPrototype,
        setCurrentStage,
        isLoading,
        setIsLoading,
        authInfo,
        checkTeams,
        connectApiCatchHandler,
    } = useConnectPrototypeModalState();

    if (isLoading) return <PreLoaderSm />;
    if (currentPrototype === null) return <></>;
    if (!authInfo) return <></>;

    const submitOrg = (params: LoginWithOrgs) => {
        // 사용자의 입력 값이 올바르지 않은 경우.
        // => 모종의 이유로 params 가 기대한 형태로 넘어오지 않은 경우
        if (!params || !params.organizationName) {
            // 얼럿을 듸워주고 더이상의 실행은 하지 않도록 흐름 차단.
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "You didn't select organization!",
            });
            return;
        }

        const selectedOrgName = params.organizationName;

        setIsLoading(true);

        // 서버에 [신규구독 생성] "요청"을 수행합니다.
        createApplication({
            sign: makeSignHeader(authInfo)['Crawler-Sign'],
            organizationId,
            prototypeId: currentPrototype.id,
            connectedSlug: selectedOrgName,
        })
            // 그리고 [신규구독 생성] "요청"이 완료되면,
            // "요청 성공!" 단계로 이동시킵니다.
            .then(() => setCurrentStage(ConnectModalStage.SuccessfullySubmitted))
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    const backButtonClick = () => {
        setCurrentStage(ConnectModalStage.AuthFormStage);
    };

    const nextButtonActive = !!selectOrgForm.watch('organizationName');

    return (
        <form className="flex flex-col mb-4 gap-y-4" onSubmit={selectOrgForm.handleSubmit(submitOrg)}>
            {/* 조회된 조직이 하나도 없을 때 */}
            {checkTeams.length === 0 && (
                <>
                    <div className="flex flex-col gap-y-4">
                        <h4>There's no organization to show</h4>
                    </div>
                </>
            )}

            {/* 조회된 조직이 한 개 이상 있을 때 */}
            {checkTeams.length > 0 && (
                <>
                    <h4>Select your Organization</h4>
                    <div className="flex flex-col gap-y-2">
                        {checkTeams.map((team, i) => (
                            <label
                                className="label cursor-pointer border border-indigo-100 rounded-xl shadow hover:shadow-lg p-3"
                                htmlFor={team.name}
                                key={i}
                            >
                                <div className="flex gap-3 items-center">
                                    <img src={team.image} className="w-7" />
                                    <div className="flex flex-col">
                                        <span className="label-text font-semibold text-gray-500">{team.name}</span>
                                        <p className="text-xs leading-none">
                                            <small>
                                                <OutLink
                                                    href={`${team.profileUrl}`}
                                                    text={`Open in ${currentPrototype.name}`}
                                                />
                                            </small>
                                        </p>
                                    </div>
                                </div>
                                <input
                                    id={team.name}
                                    value={team.name}
                                    type="radio"
                                    className="radio radio-primary"
                                    {...selectOrgForm.register('organizationName')}
                                />
                            </label>
                        ))}
                    </div>
                </>
            )}

            <ModalActionWrapper>
                <button type="button" className="btn mr-auto" onClick={backButtonClick}>
                    <MdNavigateBefore size={20} className="ml-[-6px]" />
                    <span>Back</span>
                </button>
                {checkTeams.length > 0 && (
                    <button type="submit" className="btn btn-primary" disabled={!nextButtonActive}>
                        <span>Next</span>
                        <MdNavigateNext size={20} className="mr-[-6px]" />
                    </button>
                )}
            </ModalActionWrapper>
        </form>
    );
});
