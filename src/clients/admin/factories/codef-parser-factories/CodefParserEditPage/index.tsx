import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {AdminDetailPageLayout, AdminPageContainer} from '^admin/layouts';
import {CodefParserDataDto, UpdateCodefParserDto} from '../CodefParserFactory/CreateCodefParserDto';
import {CodefParserForm} from '../form/CodefParserForm';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {currentCodefParserAtom, serviceNameParamsAtom} from '^admin/factories/codef-parser-factories/atoms';
import {useRecoilStates} from '^hooks/useRecoil';
import {plainToInstance} from 'class-transformer';
import {LoadableBox} from '^components/util/loading';
import {adminCodefCardParserApi} from '^models/_codef/CodefCardParser/api';
import {CodefCardParserEditPageRoute} from '^pages/admin/factories/codef-card-parsers/[id]/edit';
import toast from 'react-hot-toast';
import {errorToast} from '^api/api';

export const CodefParserEditPage = memo(function () {
    const router = useRouter();
    const [serviceNameParams, setServiceNameParams] = useRecoilState(serviceNameParamsAtom);
    const [currentParser, setCurrentParser] = useRecoilState(currentCodefParserAtom);
    const [pageLoaded, setPageLoaded] = useState(false);
    const form = useForm<UpdateCodefParserDto>();

    useEffect(() => {
        setServiceNameParams(`${router.query.serviceName}`);
    }, [router.query.serviceName]);

    useEffect(() => {
        // Update form
        if (!router.isReady) return;
        if (!serviceNameParams) return;

        codefParserFactoryApi.show(serviceNameParams).then((res) => {
            setCurrentParser(res.data);
        });

        return () => {
            console.log('unmount');
            setCurrentParser(null);
            setServiceNameParams('');
        };
    }, [router.isReady, serviceNameParams]);

    useEffect(() => {
        currentParser && setFormInitialValue(currentParser);
    }, [currentParser]);

    function setFormInitialValue(dto: CodefParserDataDto) {
        setPageLoaded(false);
        const dup = plainToInstance(CodefParserDataDto, dto);
        form.setValue('serviceName', dup.serviceName);
        form.setValue('searchText', dup.searchText.parseQuery!());
        form.setValue('resMemberStoreName', dup.resMemberStoreName.parseQuery!());
        form.setValue('groupingMethod', dup.groupingMethod);
        form.setValue('fixedRecurringType', dup.fixedRecurringType);
        setPageLoaded(true);
    }

    const onSubmit = async (dto: UpdateCodefParserDto) => {
        if (!dto.resMemberStoreName?.value) {
            return toast('결제내역의 텍스트 패턴 찾기 입력값이 누락되어있어요!');
        }
        return codefParserFactoryApi.update(serviceNameParams, dto).then((res) => {
            return () => {
                if (confirm('목록으로 돌아갈까요?\n\n그대로 있길 원한다면 [취소]를 눌러주세요 :)')) {
                    router.push(CodefParserListPageRoute.path());
                }
            };
        });
    };

    return (
        <AdminDetailPageLayout
            title={`[코드에프] 파서 수정 : ${serviceNameParams}`}
            breadcrumbs={[
                {text: '파서 공장'},
                {text: '[코드에프] 파서 목록', href: CodefParserListPageRoute.path()},
                {text: '파서 수정'},
            ]}
        >
            <AdminPageContainer fluid>
                <div>
                    <button
                        type="button"
                        className="btn bg-red-200 hover:bg-red-400 text-red-600 hover:text-red-900 transition-all rounded-[14px] border-none no-animation btn-animation"
                        onClick={() => {
                            const msg =
                                '작업한 내용이 있다면 취소를 클릭후 먼저 저장한 뒤 진행해주세요.\n확인을 누르면 기존 파서를 기준으로 이관합니다.\n\n계속 진행할까요?';
                            if (!confirm(msg)) return;

                            adminCodefCardParserApi
                                .migration(serviceNameParams)
                                .then((res) => {
                                    toast.success('Success!');
                                    return router.push(CodefCardParserEditPageRoute.path(res.data.id));
                                })
                                .catch(errorToast);
                        }}
                    >
                        새 버전으로 옮기기
                    </button>
                </div>
                <LoadableBox isLoading={!pageLoaded} loadingType={1}>
                    {pageLoaded && <CodefParserForm form={form} onSubmit={onSubmit} reloadOnReady={pageLoaded} />}
                </LoadableBox>
            </AdminPageContainer>
            <div className="pt-10 px-2 sm:px-8">
                <div className="w-full"></div>
            </div>
        </AdminDetailPageLayout>
    );
});
