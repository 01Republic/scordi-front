import React, {memo, useEffect, useState} from 'react';
import {useProduct} from '^models/Product/hook';
import {useForm} from 'react-hook-form';
import {UpdateProductRequestDto as UpdateDto} from '^models/Product/type';
import {toast} from 'react-toastify';
import {
    ContentForm,
    ContentPanel,
    ContentPanelBody,
    ContentPanelHeading,
    ContentPanelItem,
    ContentPanelList,
} from '^layouts/ContentLayout';
import {WysiwygEditor} from '^components/WysiwygEditor';
import {productApi} from '^models/Product/api';
import {RotateCw} from 'lucide-react';

export const MenuContentForIntroduce = memo(() => {
    const [proto, mutation] = useProduct();
    const form = useForm<UpdateDto>();
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!proto) return;
        setValue(proto.desc);
    }, [proto]);

    useEffect(() => {
        form.setValue('desc', value); // 설명
    }, [value]);

    const onSubmit = (data: UpdateDto) => {
        if (!proto) return;
        productApi.update(proto.id, data).then((res) => {
            if (res.status === 200) {
                mutation(undefined);
                toast.success('Successfully Updated.');
            }
        });
    };

    return (
        <div>
            <ContentForm onSubmit={form.handleSubmit(onSubmit)}>
                <ContentPanel bodyWrap={false}>
                    <ContentPanelHeading title="소개 텍스트">
                        <div className="ml-auto">
                            <button
                                type="button"
                                className="btn btn-sm btn-secondary gap-2"
                                onClick={() => {
                                    if (confirm('저장되지 않은 내용은 복구 할 수 없습니다. 진행할까요?')) {
                                        setValue(proto?.desc ?? '');
                                        toast.info('내용이 초기화 되었습니다.');
                                    }
                                }}
                            >
                                <RotateCw size={20} />
                                초기화
                            </button>
                        </div>
                    </ContentPanelHeading>

                    <ContentPanelBody>
                        <ContentPanelList>
                            <ContentPanelItem style={{maxWidth: '100%', padding: 0}}>
                                <WysiwygEditor
                                    width="100%"
                                    height="400px"
                                    valueType="html"
                                    initialEditType="wysiwyg"
                                    initialValue={value}
                                    placeholder="앱을 아직 사용한 적 없는 분들을 대상으로 간단하게 소개하는 글을 입력해주세요."
                                    onChange={setValue}
                                />
                            </ContentPanelItem>
                        </ContentPanelList>
                    </ContentPanelBody>
                </ContentPanel>
            </ContentForm>
        </div>
    );
});
