import React, {memo} from 'react';
import {useCurrentCreditCardEdit} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardShowPage/atom';
import {EditButton} from './EditButton';
import {CreditCardName} from './CreditCardName';
import {CreditCardIsPersonal} from './CreditCardIsPersonal';
import {CreditCardIsCreditCard} from './CreditCardIsCreditCard';
import {CreditCardUsingState} from './CreditCardUsingState';
import {CreditCardMemo} from './CreditCardMemo';
import {CreditCardCardNumber, CreditCardCardNumbers} from './CreditCardCardNumbers';
import {CreditCardExpiry} from './CreditCardExpiry';
import {CreditCardTeam} from './CreditCardTeam';
import {CreditCardHoldingMemberId} from './CreditCardHoldingMemberId';

export const CardInformationPanel = memo(function CardInformationPanel() {
    const {
        currentCreditCard,
        formData,
        setFormValue,
        onSubmit,
        patch,
        connectTeam,
        expiryValues,
        setExpiryValues,
        isEditMode,
        setIsEditMode,
        isLoading,
    } = useCurrentCreditCardEdit();

    if (!currentCreditCard) return <></>;

    const expiry = currentCreditCard.decryptSign().expiry;

    return (
        <div>
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-16 font-semibold">세부정보</h3>
                    <EditButton isEditMode={isEditMode} setIsEditMode={setIsEditMode} onSubmit={onSubmit} />
                </div>

                <div className="flex flex-col gap-2.5">
                    <CreditCardName
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.name || undefined}
                        defaultValue={formData.name || undefined}
                        onChange={(name) => setFormValue({name})}
                    />

                    <CreditCardIsPersonal
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.isPersonal}
                        defaultValue={formData.isPersonal ?? undefined}
                        onChange={(isPersonal) => setFormValue({isPersonal})}
                    />

                    <CreditCardIsCreditCard
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.isCreditCard}
                        defaultValue={formData.isCreditCard ?? undefined}
                        onChange={(isCreditCard) => setFormValue({isCreditCard})}
                    />

                    <CreditCardCardNumbers
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.fullNumber}
                    >
                        <CreditCardCardNumber
                            isLoading={isLoading}
                            defaultValue={formData.number1}
                            onChange={(number1) => setFormValue({number1})}
                        />
                        <CreditCardCardNumber
                            isLoading={isLoading}
                            defaultValue={formData.number2}
                            onChange={(number2) => setFormValue({number2})}
                        />
                        <CreditCardCardNumber
                            isLoading={isLoading}
                            defaultValue={formData.number3}
                            onChange={(number3) => setFormValue({number3})}
                        />
                        <CreditCardCardNumber
                            isLoading={isLoading}
                            defaultValue={formData.number4}
                            onChange={(number4) => setFormValue({number4})}
                            maxLength={5}
                        />
                    </CreditCardCardNumbers>

                    <CreditCardExpiry
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={expiry}
                        defaultValue={expiryValues}
                        onYearChange={(year) => setExpiryValues(0, year)}
                        onMonthChange={(month) => setExpiryValues(1, month)}
                    />
                </div>
            </div>

            <div className="p-8 border-t border-gray-200">
                <div className="flex flex-col gap-2 5">
                    <CreditCardUsingState
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.usingStatus}
                        defaultValue={formData.usingStatus}
                        onChange={(usingStatus) => setFormValue({usingStatus})}
                    />

                    <CreditCardMemo
                        isEditMode={isEditMode}
                        isLoading={isLoading}
                        value={currentCreditCard.memo || undefined}
                        defaultValue={formData.memo || undefined}
                        onChange={(memo) => setFormValue({memo})}
                    />
                </div>
            </div>

            {/*<div className="p-8 border-t border-gray-200">*/}
            {/*    <div className="flex flex-col gap-2.5">*/}
            {/*        <FormControl label="CVC"></FormControl>*/}
            {/*        <FormControl label="비밀번호"></FormControl>*/}
            {/*        <FormControl label="인터넷뱅킹 비밀번호"></FormControl>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="p-8 border-t border-gray-200">*/}
            {/*    <div className="flex flex-col gap-2.5">*/}
            {/*        <FormControl label="은행"></FormControl>*/}
            {/*        <FormControl label="출금통장"></FormControl>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="p-8 border-t border-gray-200">
                <div className="flex flex-col gap-2.5">
                    <CreditCardTeam
                        isLoading={isLoading}
                        defaultValue={(currentCreditCard?.teams || [])[0]}
                        onChange={connectTeam}
                    />

                    <CreditCardHoldingMemberId
                        isLoading={isLoading}
                        defaultValue={currentCreditCard.holdingMember || undefined}
                        onChange={(holdingMemberId) => patch({holdingMemberId})}
                    />
                </div>
            </div>
        </div>
    );
});
