import {ApprovalStatus, ApprovalStatusClassName, ApprovalStatusLabel} from '^models/Membership/type';

export type OptionsType = {
    status: ApprovalStatus;
    label: string;
    className: string;
};
export const approvalStatusOptions = [
    {
        status: ApprovalStatus.PENDING,
        label: ApprovalStatusLabel.PENDING,
        className: ApprovalStatusClassName.PENDING,
    },
    {
        status: ApprovalStatus.APPROVED,
        label: ApprovalStatusLabel.APPROVED,
        className: ApprovalStatusClassName.APPROVED,
    },
    {
        status: ApprovalStatus.REJECTED,
        label: ApprovalStatusLabel.REJECTED,
        className: ApprovalStatusClassName.REJECTED,
    },
];
