import {UseFormReturn} from 'react-hook-form';
import {TextInput} from '^components/TextInput';
import {CreateProductRequestDto as CreateDto, UpdateProductRequestDto as UpdateDto} from '^models/Product/type';
import {useSearchDuplicatedProducts} from './atom';
import {Avatar} from '^components/Avatar';
import {LinkTo} from '^components/util/LinkTo';
import {AdminProductPageRoute} from '^pages/admin/products/[id]';
import {LoadableBox} from '^components/util/loading';
import Tippy from '@tippyjs/react';

interface InputNameKoProps {
    form: UseFormReturn<CreateDto> | UseFormReturn<UpdateDto>;
}

export const InputNameKo = (props: InputNameKoProps) => {
    const {form} = props;
    const {value, search, isLoading, products} = useSearchDuplicatedProducts();
    const [product] = products;

    return (
        <div>
            <div className="relative">
                <TextInput {...form.register('nameKo', {required: true})} placeholder="ex. 깃허브" required={true} />
                <button
                    type="button"
                    className={`btn btn-white btn-sm absolute top-0 bottom-0 my-auto right-2 ${
                        isLoading ? 'loading' : ''
                    }`}
                    onClick={() => {
                        const nameKo = form.getValues().nameKo || '';
                        search(nameKo, {nameKo});
                    }}
                >
                    중복 확인
                </button>
            </div>

            <div className="text-12 pt-3">
                {value ? (
                    <LoadableBox isLoading={isLoading} loadingType={2} noPadding spinnerSize={14} spinnerPos="center">
                        {product ? (
                            <div className="text-red-500 flex items-center gap-8">
                                <p className="text-12">중복된 앱이 존재합니다 :</p>

                                <Tippy content="클릭하면 새 탭에서 열려요" placement="right" className="!text-11">
                                    <div>
                                        <LinkTo
                                            href={AdminProductPageRoute.path(product.id)}
                                            target="_blank"
                                            className="flex items-center gap-1 py-0.5 px-1.5 bg-white border border-gray-300 shadow rounded-md cursor-pointer hover:bg-slate-50 hover:shadow-lg transition"
                                        >
                                            <Avatar src={product.image} className="w-3 h-3" />
                                            <div className="flex items-center gap-0.5">
                                                <span>{product.nameKo}</span>
                                                <small>(#{product.id})</small>
                                            </div>
                                        </LinkTo>
                                    </div>
                                </Tippy>
                            </div>
                        ) : (
                            <div className="text-green-400">사용가능</div>
                        )}
                    </LoadableBox>
                ) : (
                    <div className="text-gray-400">중복검사 대기중...</div>
                )}
            </div>
        </div>
    );
};
