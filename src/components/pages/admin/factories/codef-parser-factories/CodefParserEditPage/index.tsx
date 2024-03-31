import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {CodefParserListPageRoute} from '^pages/admin/factories/codef-parsers';
import {AdminDetailPageLayout} from '^admin/layouts';
import {CodefParserDataDto, UpdateCodefParserDto} from '../CodefParserFactory/CreateCodefParserDto';
import {CodefParserForm} from '../form/CodefParserForm';
import {codefParserFactoryApi} from '^admin/factories/codef-parser-factories/CodefParserFactory/api';
import {plainToast as toast} from '^hooks/useToast';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {currentCodefParserAtom, serviceNameParamsAtom} from '^admin/factories/codef-parser-factories/atoms';
import {useRecoilStates} from '^hooks/useRecoil';
import {plainToInstance} from 'class-transformer';
import {LoadableBox} from '^components/util/loading';

export const CodefParserEditPage = memo(function () {
    const router = useRouter();
    const [serviceNameParams, setServiceNameParams] = useRecoilState(serviceNameParamsAtom);
    const [currentParser, setCurrentParser] = useRecoilState(currentCodefParserAtom);
    const [pageLoaded, setPageLoaded] = useState(false);
    const resetCurrentParser = useResetRecoilState(currentCodefParserAtom);
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
        const dup = plainToInstance(CodefParserDataDto, dto);
        form.setValue('serviceName', dup.serviceName);
        form.setValue('searchText', dup.searchText.parseQuery!());
        form.setValue('resMemberStoreName', dup.resMemberStoreName.parseQuery!());
        form.setValue('groupingMethod', dup.groupingMethod);
        form.setValue('fixedRecurringType', dup.fixedRecurringType);
        setPageLoaded(true);
    }

    const onSubmit = (dto: UpdateCodefParserDto) => {
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
            title="[코드에프] 파서 수정"
            breadcrumbs={[
                {text: '파서 공장'},
                {text: '[코드에프] 파서 목록', href: CodefParserListPageRoute.path()},
                {text: '파서 수정'},
            ]}
        >
            <div className="container pt-10 px-2 sm:px-8">
                <div className="w-full">
                    <LoadableBox isLoading={!pageLoaded} loadingType={1}>
                        {pageLoaded && <CodefParserForm form={form} onSubmit={onSubmit} reloadOnReady={pageLoaded} />}
                    </LoadableBox>
                </div>
            </div>
        </AdminDetailPageLayout>
    );
});
