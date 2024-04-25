import React, {memo, useEffect, useState} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {IoIosClose} from 'react-icons/io';
import {codefCardApi} from '^models/CodefCard/api';
import {CgSpinner} from 'react-icons/cg';

interface SelectedCodefCardProps {
    codefCard?: CodefCardDto;
    onClick: () => any;
}

export const SelectedCodefCard = memo((props: SelectedCodefCardProps) => {
    const {codefCard, onClick} = props;
    const [isLoading, setIsLoading] = useState(false);
    const [ensuredCodefCard, setEnsuredCodefCard] = useState<CodefCardDto>();

    useEffect(() => {
        if (!codefCard) {
            setEnsuredCodefCard(undefined);
            return;
        }

        setIsLoading(true);
        codefCardApi
            .show(0, codefCard.id)
            .then((res) => {
                setEnsuredCodefCard(res.data);
            })
            .finally(() => setIsLoading(false));
    }, [codefCard]);

    if (!codefCard) return <></>;

    return (
        <div className="flex items-center justify-between mb-3 text-12">
            <div className="flex items-center">
                <div className="mr-2">선택된 카드:</div>
                <div className="flex items-center group cursor-pointer" onClick={onClick}>
                    <div>
                        <CodefCardTagUI codefCard={codefCard} />
                    </div>
                    <IoIosClose size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                </div>
            </div>

            <div className="flex items-center">
                {isLoading && (
                    <div>
                        <div className="animate-spin">
                            <CgSpinner />
                        </div>
                    </div>
                )}
                {ensuredCodefCard && (
                    <div className="flex items-center text-gray-400">
                        <div>
                            {ensuredCodefCard.account?.connectedIdentity?.organization?.name} /{' '}
                            {ensuredCodefCard.account?.company}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});
SelectedCodefCard.displayName = 'SelectedCodefCard';
