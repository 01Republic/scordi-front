import {Card} from '^public/components/ui/card';
import {Input} from '^public/components/ui/input';
import {TeamSelect} from '^v3/V3OrgTeam/modals/TeamMemberShowModal/TeamMemberShowBody/TeamMemberEditPanel/TeamSelect';
import {FormInputChangeEvent} from './index';

interface ReviewRespondentFormProps {
    onInputChange: (e: FormInputChangeEvent) => void;
    onTeamSelect: (team: any) => void;
}

export const ReviewRespondentForm = ({onInputChange, onTeamSelect}: ReviewRespondentFormProps) => (
    <Card className="bg-white px-7 py-6 space-y-5">
        <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col space-y-2">
                <div className="text-16 font-medium">
                    응답자 이름 <span className="text-red-400">*</span>
                </div>
                <Input type="text" id="name" placeholder="응답자 이름" className="bg-white" onChange={onInputChange} />
            </div>
            <div className="flex flex-col space-y-2">
                <div className="text-16 font-medium">
                    팀 <span className="text-red-400">*</span>
                </div>
                <TeamSelect onSelect={onTeamSelect} />
            </div>
        </div>
        <div className="flex flex-col space-y-2">
            <div className="text-16 font-medium">
                이메일 계정 <span className="text-red-400">*</span>
            </div>
            <Input type="email" id="email" placeholder="이메일 계정" className="bg-white" onChange={onInputChange} />
        </div>
    </Card>
);
