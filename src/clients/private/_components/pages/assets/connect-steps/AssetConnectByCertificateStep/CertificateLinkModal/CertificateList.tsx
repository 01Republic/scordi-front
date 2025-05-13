import {memo, useState} from 'react';
import {CertFileDto} from '^lib/codef/certificate/cert-file.dto';
import {Table} from '^v3/share/table/Table';
import {yyyy_mm_dd} from '^utils/dateTime';

interface CertificateListProps {
    certList: CertFileDto[];
    selectedCert: CertFileDto | undefined;
    onSelect: (cert: CertFileDto) => any;
}

export const CertificateList = memo((props: CertificateListProps) => {
    const {certList, selectedCert, onSelect} = props;

    const selectCert = (cert: CertFileDto) => {
        onSelect(cert);
    };

    return (
        <div className="card bg-white rounded-lg border border-gray-300">
            <div className="flex h-10 w-full items-center bg-gray-50 text-14 text-center text-gray-500 rounded-t-lg">
                <div className="w-8"></div>
                <div className="w-1/5">구분</div>
                <div className="flex-1">사용자</div>
                <div className="w-1/5">만료일</div>
                <div className="w-1/5">발급기관</div>
            </div>

            <div className="rounded-b-lg">
                {certList.length === 0 && (
                    <div className="w-full flex items-center justify-center min-h-20">
                        <p>해당 위치에 인증서가 존재하지 않습니다.</p>
                    </div>
                )}

                <div className="overflow-y-scroll max-h-[250px] text-14 rounded-b-lg">
                    {certList.map((cert, i) => {
                        const isSelected = cert.userName === selectedCert?.userName;
                        const isLast = i + 1 === certList.length;
                        const isExpired = cert.isExpired;

                        return (
                            <div
                                key={i}
                                className={`flex h-10 w-full items-center ${
                                    isExpired ? 'cursor-not-allowed' : 'cursor-pointer'
                                } ${
                                    isSelected
                                        ? 'bg-primaryColor-bg'
                                        : isExpired
                                        ? 'opacity-40'
                                        : `hover:bg-primaryColor-bg`
                                } ${isLast ? 'rounded-b-lg' : ''}`}
                                onClick={() => {
                                    if (isExpired) return;
                                    if (isSelected) return;

                                    selectCert(cert);
                                }}
                            >
                                <div className="inline-flex w-8 items-center justify-center">
                                    <div className="flex items-center justify-center">
                                        <div className="radio radio-primary radio-xs rounded-md p-0.5">
                                            <div
                                                className={`w-full h-full rounded-sm transition-all ${
                                                    isSelected ? 'bg-scordi' : ''
                                                }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* 구분 */}
                                <div className="w-1/5 overflow-hidden text-center text-ellipsis whitespace-nowrap px-1">
                                    {isExpired ? <span className="text-red-500">만료됨</span> : cert.useType}
                                </div>

                                {/* 사용자 */}
                                <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                                    {cert.userName}
                                </div>

                                {/* 만료일 */}
                                <div className="w-1/5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                                    {yyyy_mm_dd(cert.expireDate)}
                                </div>

                                {/* 발급기관 */}
                                <div className="w-1/5 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                                    {cert.organization}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
CertificateList.displayName = 'CertificateList';
