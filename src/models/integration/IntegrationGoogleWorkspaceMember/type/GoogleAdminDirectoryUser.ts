import {PickType} from '^types/utils/pick-type';

export class GoogleAdminDirectoryUser {
    id: string;
    primaryEmail: string;
    password: any;
    hashFunction: string;
    isAdmin: boolean;
    isDelegatedAdmin: boolean;
    agreedToTerms: boolean;
    suspended: boolean;
    changePasswordAtNextLogin: boolean;
    ipWhitelisted: boolean;
    name: GoogleAdminDirectoryUserName;
    kind: string;
    etag: string;
    externalIds: any;
    relations: any;
    aliases: string[];
    isMailboxSetup: boolean;
    customerId: string;
    addresses: any;
    organizations: any;
    lastLoginTime: string;
    emails: {
        address: string;
        type?: string;
        primary?: boolean;
    }[];
    phones?: {
        value: string;
        type: string;
    }[];
    suspensionReason: string;
    thumbnailPhotoUrl?: string;
    languages: any;
    posixAccounts: any;
    creationTime: string;
    nonEditableAliases: string[];
    sshPublicKeys: any;
    notes: any;
    websites: any;
    locations: any;
    includeInGlobalAddressList: boolean;
    keywords: any;
    deletionTime: string;
    gender: any;
    thumbnailPhotoEtag: string;
    ims: any;
    customSchemas: any;
    isEnrolledIn2Sv: boolean;
    isEnforcedIn2Sv: boolean;
    archived: boolean;
    orgUnitPath: string;
    recoveryEmail: string;
    recoveryPhone: string;

    get email() {
        return this.primaryEmail;
    }

    get phone() {
        return this.phones && this.phones[0] ? this.phones[0].value : null;
    }

    get imageUrl() {
        return this.thumbnailPhotoUrl || null;
    }

    get displayName() {
        return this.name?.displayName;
    }

    get fullName() {
        return this.name?.fullName;
    }

    get isDeleted() {
        return !!this.deletionTime;
    }

    get isRestricted() {
        return this.archived;
    }

    get isOwner() {
        return this.isAdmin || this.isDelegatedAdmin;
    }

    get isPrimaryOwner() {
        return this.isAdmin && !this.isDelegatedAdmin;
    }
}

class GoogleAdminDirectoryUserName {
    fullName: string;
    familyName: string;
    givenName: string;
    displayName?: string;
}

export class GoogleAdminDirectoryUserKey extends PickType(GoogleAdminDirectoryUser, ['id', 'primaryEmail']) {}
