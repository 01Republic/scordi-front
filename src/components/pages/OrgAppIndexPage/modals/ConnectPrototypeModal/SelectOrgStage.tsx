import {memo} from 'react';
import {ModalActionWrapper} from '^components/Modal';
import {ConnectModalStage, useConnectPrototypeModalState} from '^atoms/connectPrototypes.atom';
import {LoginWithOrgs} from '^types/crawler';
import Swal from 'sweetalert2';
import {getOrganizationByCrawlerApi} from '^api/crawler';
import {PreLoaderSm} from '^components/PreLoaderSm';

export const SelectOrgStage = memo(() => {
    const {
        authForm,
        selectOrgForm,
        currentPrototype,
        setCurrentStage,
        isLoading,
        setIsLoading,
        checkTeams,
        closeModal,
        connectApiCatchHandler,
    } = useConnectPrototypeModalState();

    if (isLoading) return <PreLoaderSm />;
    if (currentPrototype === null) return <></>;

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
        const authInfo = authForm.getValues();

        setIsLoading(true);
        getOrganizationByCrawlerApi(currentPrototype.id, selectedOrgName, authInfo)
            // 크롤러를 통해 조직 기본 정보를 1차로 가지고 오면
            .then((res) => {
                console.log('통신성공', res);
                return res.data;
            })

            // 다음으로 서버에 [신규구독 생성] "요청"을 수행합니다.
            .then((orgProfileInfo) => {
                // 서버에 신규구독 생성 요청하는 코드
            })

            // 그리고 [신규구독 생성] "요청"이 완료되면,
            // "요청 성공!" 단계로 이동시킵니다.
            .then(() => setCurrentStage(ConnectModalStage.SuccessfullySubmitted))
            .catch(connectApiCatchHandler)
            .finally(() => setIsLoading(false));
    };

    return (
        <form className="flex flex-col mb-4 gap-y-4" onSubmit={selectOrgForm.handleSubmit(submitOrg)}>
            {typeof checkTeams === 'object' ? (
                checkTeams.map((team) => (
                    <div key={team.name} className="flex flex-col gap-y-4">
                        <h4>Select your Organization</h4>
                        <label
                            className="label cursor-pointer border border-indigo-300 rounded-xl shadow hover:shadow-lg p-3"
                            htmlFor={team.name}
                        >
                            <span className="label-text text-lg">{team.name}</span>
                            <input
                                id={team.name}
                                value={team.name}
                                type="radio"
                                className="radio radio-primary"
                                {...selectOrgForm.register('organizationName')}
                            />
                        </label>
                    </div>
                ))
            ) : (
                <h4>There's no organization to show</h4>
            )}
            <ModalActionWrapper>
                <button type="button" className="btn" onClick={closeModal}>
                    Close
                </button>
                <button type="submit" className="btn btn-primary">
                    Next
                </button>
            </ModalActionWrapper>
        </form>
    );
});
