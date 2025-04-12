import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {TeamSelect} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/TeamSelect';
import {UseFormReturn} from 'react-hook-form';
import {UpdateReviewResponseRequestDto} from '^models/ReviewResponse/type';
import {CardSection} from './CardSection';

interface ReviewRespondentFormProps {
    form: UseFormReturn<UpdateReviewResponseRequestDto, any>;
}

export const ReviewRespondentForm = ({form}: ReviewRespondentFormProps) => (
    <CardSection>
        <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col space-y-2">
                <div className="text-16 font-medium">
                    응답자 이름 <span className="text-red-400">*</span>
                </div>
                <Input
                    type="text"
                    id="name"
                    placeholder="응답자 이름"
                    className="bg-white"
                    {...form.register('respondentName')}
                />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-16 font-medium">
                    팀 <span className="text-red-400">*</span>
                </div>
                <TeamSelect
                    onSelect={(selectedTeam) => {
                        form.setValue('respondentTeamId', selectedTeam?.id || null);
                    }}
                />
            </div>
        </div>
        <div className="flex flex-col space-y-2">
            <div className="text-16 font-medium">
                이메일 계정 <span className="text-red-400">*</span>
            </div>
            <Input
                type="email"
                id="email"
                placeholder="이메일 계정"
                className="bg-white"
                {...form.register('respondentEmail')}
            />
        </div>
    </CardSection>
);
