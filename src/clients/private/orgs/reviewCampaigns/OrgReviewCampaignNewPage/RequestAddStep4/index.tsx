import {useTeamMembers} from '^models/TeamMember';
import {TeamMemberProfile} from '^models/TeamMember/components/TeamMemberProfile';
import {Button} from '^public/components/ui/button';
import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {Textarea} from '^public/components/ui/textarea';
import {X} from 'lucide-react';
import {useTranslation} from 'next-i18next';

export const RequestAddStep4 = () => {
    /* TODO: api 교체 */
    const {t} = useTranslation('reviewCampaigns');
    const {result} = useTeamMembers();

    return (
        <Card className={'bg-white p-10 space-y-10'}>
            <div className={'text-xl font-bold text-gray-900'}>{t('step4.title')}</div>
            <div className="grid w-full items-center gap-2">
                <div className={'text-18 font-medium'}>{t('step4.titleLabel')}</div>
                <Input type="text" id="title" placeholder={t('step4.titlePlaceholder') as string} />
            </div>
            <div className="grid w-full items-center gap-2">
                <div className={'text-18 font-medium'}>{t('step4.descriptionLabel')}</div>
                <Textarea
                    id="description"
                    placeholder={t('step4.descriptionPlaceholder') as string}
                    className={'min-h-40'}
                />
            </div>
            <div>
                <div className={'text-18 font-medium'}>{t('step4.targetLabel')}</div>
                <div className={'my-4'}>{t('step4.totalMembers', {count: 11})}</div>
                <div className={'grid grid-cols-3 gap-2'}>
                    {result.items.map((teamMember) => (
                        <div className={'p-2 border bg-gray-50 rounded-md flex items-center justify-between'}>
                            <div className="flex-1 min-w-0">
                                <TeamMemberProfile item={teamMember} />
                            </div>
                            <div className="w-5 h-5 shrink-0 cursor-pointer ml-2">
                                <X />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'flex justify-end space-x-4'}>
                <Button size={'xl'} variant={'gray'}>
                    {t('step4.backButton')}
                </Button>
                <Button size={'xl'} variant={'scordi'}>
                    {t('step4.completeButton')}
                </Button>
            </div>
        </Card>
    );
};
