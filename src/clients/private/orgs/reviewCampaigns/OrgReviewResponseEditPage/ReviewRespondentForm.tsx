import {useQuery} from '@tanstack/react-query';
import {useIdParam} from '^atoms/common';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {teamApi} from '^models/Team/api';
import {TeamTag} from '^models/Team/components/TeamTag';
import {Input} from '^public/components/ui/input';
import {Paginated} from '^types/utils/paginated.dto';
import {useTranslation} from 'next-i18next';
import {UseFormReturn} from 'react-hook-form';
import {CardSection} from './CardSection';

interface ReviewRespondentFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
    readonly?: boolean;
}

export const ReviewRespondentForm = ({form, readonly = false}: ReviewRespondentFormProps) => {
    const orgId = useIdParam('id');
    const {t} = useTranslation('reviewCampaigns');
    const reviewResponseId = useIdParam('reviewResponseId');
    const {
        data: {items},
    } = useQuery({
        queryKey: ['ReviewRespondentForm.teamSelect', reviewResponseId],
        queryFn: () =>
            teamApi
                .index(orgId, {
                    where: {organizationId: orgId},
                    itemsPerPage: 0,
                })
                .then((res) => res.data),
        enabled: !!orgId,
        initialData: Paginated.init(),
    });
    const selectedTeam = items.find((item) => {
        return item.id === form.getValues('teamMemberId');
    });

    return (
        <CardSection>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col space-y-2">
                    <div className="text-16 font-medium">
                        {t('respondent.name')} <span className="text-red-400">*</span>
                    </div>
                    <Input
                        type="text"
                        id="name"
                        placeholder={t('respondent.namePlaceholder') as string}
                        className={readonly ? 'bg-gray-100' : `bg-white`}
                        {...form.register('respondentName')}
                        readOnly={readonly}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="text-16 font-medium">
                        {t('respondent.team')} <span className="text-red-400">*</span>
                    </div>

                    {readonly ? (
                        <div className="select border-input rounded-md shadow-sm flex items-center font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-gray-100">
                            {selectedTeam ? (
                                <TeamTag id={selectedTeam.id} name={selectedTeam.name} />
                            ) : (
                                <div className="text-muted-foreground">{t('respondent.team')}</div>
                            )}
                        </div>
                    ) : (
                        <MoreDropdown
                            Trigger={() => (
                                <div className="select border-input rounded-md shadow-sm flex items-center font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white">
                                    {selectedTeam ? (
                                        <TeamTag id={selectedTeam.id} name={selectedTeam.name} />
                                    ) : (
                                        <div className="text-muted-foreground">{t('respondent.team')}</div>
                                    )}
                                </div>
                            )}
                            placement="bottom"
                            offset={[0, 0]}
                        >
                            {({hide}) => (
                                <MoreDropdown.Content className="!min-w-[16.5rem]">
                                    {items.length == 0 && (
                                        <MoreDropdown.MenuItem
                                            className="flex items-center italic text-muted-foreground"
                                            onClick={() => hide()}
                                        >
                                            {t('respondent.noTeamsAvailable')}
                                        </MoreDropdown.MenuItem>
                                    )}
                                    {items.map((team, i) => {
                                        return (
                                            <MoreDropdown.MenuItem
                                                key={i}
                                                className="flex items-center"
                                                onClick={() => {
                                                    form.setValue('teamMemberId', team.id);
                                                    hide();
                                                }}
                                            >
                                                <TeamTag id={team.id} name={team.name} />
                                            </MoreDropdown.MenuItem>
                                        );
                                    })}
                                </MoreDropdown.Content>
                            )}
                        </MoreDropdown>
                    )}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-16 font-medium">
                    {t('respondent.email')} <span className="text-red-400">*</span>
                </div>
                <Input
                    type="email"
                    id="email"
                    placeholder={t('respondent.emailPlaceholder') as string}
                    className={readonly ? 'bg-gray-100' : `bg-white`}
                    {...form.register('respondentEmail')}
                    readOnly={readonly}
                />
            </div>
        </CardSection>
    );
};
