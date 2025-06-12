import {plainToInstance} from 'class-transformer';
import {convertToNestedObject} from '^utils/nested-key';
import {ecertDialog} from '^lib/codef/certificate/ecertDialog';

/**
 * 'cert.der.path': '/Users/.../NPKI/CrossCert/USER/cn=.......,ou=.....,ou=...,ou=....,o=...,c=KR/signCert.der',
 * 'cert.extension.policyid': '1.2.410.200004.5.4.1.2',
 * 'cert.fingerprint.MD5': 'E6ECF06BBECCD3E713568BC493397A4F',
 * 'cert.fingerprint.SHA1': '1822B91242851139624C106818336C216F79C6A4',
 * 'cert.issuername.C': 'KR',
 * 'cert.issuername.CN': 'CrossCertCA4',
 * 'cert.issuername.O': 'CrossCert',
 * 'cert.issuername.OU': 'AccreditedCA',
 * 'cert.key.algorism': 6,
 * 'cert.key.path': '/Users/.../NPKI/CrossCert/USER/cn=.......,ou=.....,ou=...,ou=....,o=...,c=KR/signPri.key',
 * 'cert.serialNumber': 27063315,
 * 'cert.signature.algorism': 668,
 * 'cert.subjectname.C': 'KR',
 * 'cert.subjectname.CN': '주식회사제로원리퍼블릭(01Rep)0004058C002371249',
 * 'cert.subjectname.O': 'CrossCert',
 * 'cert.subjectname.OU': 'corporation4EC|KMB|01Republic Inc',
 * 'cert.validity.notAfter': 1764309599,
 * 'cert.validity.notBefore': 1730242860,
 * 'cert.version': 3,
 */
export class CertFileDto {
    static plainToInstance(certList: Record<string, any>[]) {
        const list = certList.map((cert) => {
            // 키에서 'cert.' 라는 문자열을 제거
            const obj: Record<string, any> = {};
            Object.entries(cert).map(([key, value]) => {
                obj[key.replace('cert.', '')] = value;
            });

            // 경로형태의 키를 기준으로 구조화된 자료객체로 변환
            return convertToNestedObject(obj);
        });

        return plainToInstance(CertFileDto, list);
    }

    version: number; // 'cert.version'

    validity: {
        notAfter: number; // 'cert.validity.notAfter'
        notBefore: number; // 'cert.validity.notBefore'
    };
    subjectname: {
        C: string; // 'cert.subjectname.C'
        CN: string; // 'cert.subjectname.CN'
        O: string; // 'cert.subjectname.O'
        OU: string; // 'cert.subjectname.OU'
    };
    extension: {
        policyid: string; // 'cert.extension.policyid'
    };
    fingerprint: {
        MD5: string; // 'cert.fingerprint.MD5'
        SHA1: string; // 'cert.fingerprint.SHA1'
    };
    issuername: {
        C: string; // 'cert.issuername.C'
        CN: string; // 'cert.issuername.CN'
        O: string; // 'cert.issuername.O'
        OU: string; // 'cert.issuername.OU'
    };
    der: {
        path: string; // 'cert.der.path'
    };
    key: {
        algorism: number; // 'cert.key.algorism'
        path: string; // 'cert.key.path'
    };
    serialNumber: number; // 'cert.serialNumber'
    signature: {
        algorism: number; // 'cert.signature.algorism'
    };

    private get certPID(): {usetype: string; organization: string} | undefined {
        return ecertDialog.certPIDS[this.extension.policyid];
    }

    // 구분
    get useType() {
        return this.certPID?.usetype || '알수없음';
    }

    // 사용자
    get userName() {
        return this.subjectname.CN;
    }

    // 만료일
    get expireDate() {
        return new Date(this.validity.notAfter * 1000);
    }

    // 발급자
    get organization() {
        return this.certPID?.organization || '알수없음';
    }

    // 만료여부
    get isExpired() {
        return this.expireDate.getTime() < new Date().getTime();
    }

    // 파일 위치
    get location() {
        // 공동인증서 폴더 경로 구하기
        const path = this.der.path;
        const [dir] = path.split('NPKI');
        const dirPath = `${dir}NPKI`;

        // 경로 출력시 사용자명 마스킹
        const depths = dirPath.split('/');
        const userDirIndex = depths.findIndex((depth) => depth === 'Users') + 1;
        const userName = depths[userDirIndex];
        return dirPath.replace(userName, '사용자');
    }
}
