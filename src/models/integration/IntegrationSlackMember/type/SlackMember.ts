import {EnterpriseUser, Member, Profile} from '@slack/web-api/dist/types/response/UsersListResponse';

/**
 * Slack 멤버객체 타입 보강
 */
export class SlackMember implements Member {
    id: string; // required

    color?: string;
    deleted?: boolean;
    enterprise_user?: EnterpriseUser;
    has_2fa?: boolean;
    is_admin?: boolean;
    is_app_user?: boolean;
    is_bot?: boolean;
    is_connector_bot?: boolean;
    is_email_confirmed?: boolean;
    is_invited_user?: boolean;
    is_owner?: boolean;
    is_primary_owner?: boolean;
    is_restricted?: boolean;
    is_ultra_restricted?: boolean;
    is_workflow_bot?: boolean;
    locale?: string;
    name?: string;
    profile?: Profile;
    real_name?: string;
    team_id?: string;
    two_factor_type?: string;
    tz?: string;
    tz_label?: string;
    tz_offset?: number;
    updated?: number;
    who_can_share_contact_card?: string;
}
