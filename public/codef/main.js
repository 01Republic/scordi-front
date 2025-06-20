/**
 * main.js
 *
 * 외부로 반출시, 확인 필요
 *
 * © CODEF CO., Ltd. All right reserved
 */

/***********************************************************************************************************
 *  - 이 샘플의 UI, 소스코드, 리소스는 코드에프(CODEF) 이용을 위해 E-Spider 라이브러리를 활용한 인증서 핸들링 용도로 작성 되었으며
 *    코드에프(CODEF) 정식서비스 이용에 기본적으로 포함된 사항이 아닙니다.
 ***********************************************************************************************************/
// Page Finish
$(window).on('beforeunload', function () {
    // 엔진 종료.
    codefcert.finalization(function () {
        codefcert._log('Finalization success');
    }); // Delay for Finish - 엔진 Finalize가 완료될 시간을 준다.

    var start = +new Date();

    while (+new Date() - start < 500) {}
});

/**
 * 만료된 인증서 노출 여부(true : 표시, false : 미표시, default : 미표시)
 */
ecertDialog.certShowGbn = true; // default false

/**
 * 인증서 저장 에러코드 정의
 * @type {{"-9998": string, "-9999": string, "-9994": string, "-9995": string, "-9996": string, "-9997": string}}
 */
var IMPORT_ERROR_CODE_DEFINE = {
    '-9999': '파라메터 key가 존재하지 않습니다.',
    '-9998': '파라메터 데이터가 존재하지 않습니다.',
    '-9997': '인증서 정보가 잘못되거나 인증서 비밀번호가 일치하지 않습니다.',
    '-9996': '인증서 경로가 존재하지 않거나 권한이 없습니다.',
    '-9995': '경로를 생성할 수 없습니다.',
    '-9994': '데이터 변환중 오류가 발생되었습니다..',
    '-9993': '인증서 경로를 찾을 수 없습니다.',
};

/**
 * 인증서 PFX 변환 에러 코드 정의
 * @type {{"-9998": string, "-9999": string, "-9994": string, "-9995": string, "-9996": string, "-9997": string}}
 */
var PFX_ERROR_CODE_DEFINE = {
    '-9999': '파라메터 key가 존재하지 않습니다.',
    '-9998': '파라메터 데이터가 존재하지 않습니다.',
    '-9997': '인증서 비밀번호가 일치하지 않습니다.',
    '-9996': '데이터 변환중 오류가 발생되었습니다.',
    '-9995': '알 수 없는 오류가 발생되었습니다.',
    '-9994': '알 수 없는 오류가 발생되었습니다.',
    '-9993': '인증서 경로를 찾을 수 없습니다.',
};

/**
 * 엔진 초기화
 * @constructor
 */
function Initialize() {
    // 엔진 초기화
    fn_EnginInitialize(function () {
        modalAlert('엔진 초기화 성공!');
    });
}

/**
 * 엔진 초기화 - 설치여부, 버전, 포트 체크
 * @param function success_callback 성공시 callback
 * @returns
 */
function fn_EnginInitialize(success_callback) {
    fn_fetchEncryptToken();
    codefcert.initialization(function () {
        if (arguments[0]) {
            codefcert._log('Initialization success.');

            if (typeof success_callback === 'function') {
                success_callback();
            }
        } else {
            if (typeof arguments[1] != 'undefined') {
                codefcert._log('Initialization failed. Error : ' + arguments[1]);

                if (arguments[1] == 'E010001') {
                    // VersionCheck
                    modalAlert('CodefCert를 업데이트하시기 바랍니다.'); // 업데이트 필요한 경우 다운로드 유도.

                    location.href = espiderInstaller;
                } else if (arguments[1] == 'E010002') {
                    // Not installed
                    modalAlert('CodefCert를 설치하시기 바랍니다.'); // CodefCert 설치되지 않은 경우 다운로드 유도.

                    location.href = espiderInstaller;
                } else if (arguments[1] == 'E020001') {
                    // PortCheck Error
                } else if (arguments[1] == 'E020002') {
                    // PortCheck Error
                } else {
                    // UnKnown Error
                }
            }
        }
    });
}

/***********************************************************************************************************
 * CODEF define variables
 ***********************************************************************************************************/

/**
 *  인증서 내보내기 , 가져오기 통신 처리
 */
var CODEF_URL = 'http://localhost:8080'; // 코드에프 인증서 중계서버 URL
var CODEF_TOKEN;

codefcert.options.opt1 = true; // 암호화 사용 여부(true/false)
codefcert.options.opt2 = '6162636465666768696A6B6C6D6E6F7071727374'; // 랜덤한 HEX 문자열 - 반드시 아스키코드로 표현 가능한 문자열 사용해야함
codefcert.options.opt3 = 3; // 해시 알고리즘(1:SHA1, 3:SHA256, 4:SHA384, 5:SHA512)
codefcert.options.opt4 = 10; // 암호화 알고리즘(10:SEED, 11:AES128, 12:AES256)
codefcert.options.opt5 = '0106000704040404080807010403030303030303'; // salt 문자열
codefcert.options.opt6 = 512; // 반복횟수[정수형]
codefcert.options.opt7 = '4D6F62696C655472616E734B65793130'; // iv 문자열
codefcert.options.opt8 = true; // PKCS5Padding 사용 여부 (true/false)
codefcert.options.opt9 = 1; // 인코딩 타입 (0:BASE64, 1:HEX string)

var certInfo = {}; // 선택한 인증서 정보

var userAgent = window.navigator.userAgent.toLowerCase();
var espiderInstaller =
    userAgent.indexOf('win') > -1
        ? './CodefCertInstaller.exe'
        : userAgent.indexOf('mac') > -1
        ? './codefCertMac.dmg'
        : ''; // 설치파일 url

var certValidRetryCnt = 5; // 비밀번호 오류 체크 Cnt

var engineCheckFailMessage = '라이센스 확인이 진행되지 않았습니다.\n라이센스 체크를 진행해주세요.';

/***********************************************************************************************************
 * CODEF define functions
 ***********************************************************************************************************/

$(function () {
    fn_EnginInitialize(function () {}); // 인증서 리스트 팝업 호출

    $('#loadDialog').click(function () {
        if (!codefcert._connected) {
            fn_EnginInitialize(function () {}); // 엔진 초기화
        }

        fn_ShowDialog();
    }); // 인증서 내보내기 탭 클릭

    $('#setOptions').click(function () {
        // if (!codefcert._connected) {
        //   fn_EnginInitialize(function () {}); // 엔진 초기화
        // }
        //fn_EnginInitialize(function ();
        fn_ShowDialog();
    }); // 인증서 내보내기 탭 클릭

    $('#tab-export').click(function () {
        fn_clickExport();
    }); // 인증서 가져오기 탭 클릭

    $('#tab-import').click(function () {
        fn_clickImport();
    });
});

/**
 *  알림 팝업
 */
async function fn_fetchEncryptToken() {
    try {
        const response = await fetch(`${CODEF_URL}/api/cert/token?encryption=${codefcert.options.opt1}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        CODEF_TOKEN = data;
        codefcert.options.codefToken = CODEF_TOKEN;
    } catch (error) {
        console.error('Error fetching the encrypt token:', error);
    }
}

/**
 * 코드에프 인증서 중계 서버에서 토큰 발급 받기
 */
function modalAlert(message) {
    $('#model-message').text(message);
    $('#alert-modal').modal('show');
}

/**
 * 인증서 팝업 호출
 */
function fn_ShowDialog() {
    ecertDialog.showDialog();
}

/**
 *  Dialog 종료
 */
function fn_closeDialog() {
    $('#btnClose').click();
}

/**
 *  인증서 내보내기/가져오기 중계서버 통신 요청
 * @param url
 * @param type
 * @param param
 * @param successCallback
 * @param errorCallback
 */
function fn_CallServer(url, type, param, successCallback, errorCallback) {
    if (!CODEF_TOKEN) {
        modalAlert('발급된 CODEF_TOKEN 값을 설정하여 주세요.');
        return;
    }

    $.ajax({
        url: CODEF_URL + url,
        type: type,
        data: param,
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Accept: 'application/json',
            Authorization: CODEF_TOKEN ? CODEF_TOKEN : '',
            Decryption: codefcert.options.opt1,
        },
        error: errorCallback,
        success: successCallback,
        cache: false,
    });
}

/**
 *  인증서 내보내기
 *    - 인증서 비밀번호 입력 확인 >  인증서 검증 완료시 인증번호 입력 폼 표시
 */
function fn_ExportCert(selectedCert) {
    if (!codefcert._checkLicense) {
        alert('라이센스 확인 진행이 되지 않았습니다. \n ');
        return;
    }

    certInfo = selectedCert; //인증서 정보

    var data = {};
    data.certPassword = $('#certPassword').val();
    data.certPath = selectedCert['cert.der.path'];
    data.keyPath = selectedCert['cert.key.path']; // certification pfx base64

    codefcert.engineGetExportCertificationB64(data, function (retData) {
        if (!retData.SUCCESS) {
            var code = retData.REASON;

            if (code == '-9997') {
                ecertDialog._certTryCnt = ecertDialog._certTryCnt + 1;

                if (ecertDialog._certTryCnt == certValidRetryCnt) {
                    fn_closeDialog();
                    return;
                }

                modalAlert(
                    '인증서 비밀번호 ' +
                        ecertDialog._certTryCnt +
                        '회 오류가 발생하였습니다.\n 5회 이상 오류시 프로그램이 종료 됩니다.',
                );
            } else {
                modalAlert('[' + code + '] ' + PFX_ERROR_CODE_DEFINE[code]);
            }
        } else {
            // certPfxLog(retData.CONVERT);
            ecertDialog._pfxCertInfo = retData.CONVERT;
            ecertDialog.initCertNumberForm();
        }
    });
}

/**
 *  인증서 가져오기 - 인증서 저장
 * @param pfxInfo
 * @param password
 */
function fn_ImportCert(data) {
    if (!codefcert._checkLicense) {
        alert(engineCheckFailMessage);
        return;
    }

    codefcert.engineImportCertificationB64(data, function (retData) {
        codefcert._logger.log(JSON.stringify(retData));

        if (retData.SUCCESS) {
            // 정상
            fn_closeDialog();
            modalAlert('인증서 복사가 완료 되었습니다.');
        } else {
            var code = retData.REASON;
            modalAlert('[' + code + ']' + IMPORT_ERROR_CODE_DEFINE[code]);
        }
    });
}

/**
 * External 드라이브 리스트 listener
 */
function fn_OnLoadExtraDrive() {
    if (!codefcert._checkLicense) {
        alert(engineCheckFailMessage);
        return;
    }

    //espier get external drive
    codefcert.engineGetExternalDrive(function (objExternalDriveList) {
        codefcert._log(JSON.stringify(objExternalDriveList));

        ecertDialog.displayExtdrive(objExternalDriveList);
    });
}

/**
 * 드라이브 인증서 리스트 listener
 * @param string driveLetter : 저장 공간
 * @returns
 */
function fn_OnLoadCertification(driveLetter) {
    // e-spider certificate list
    //console.log('fn_OnLoadCertification driveLetter :: ' + driveLetter);
    codefcert.engineGetCertification(driveLetter, function (certList) {
        codefcert._log(JSON.stringify(certList));

        ecertDialog.displayCert(certList);
    });
}

/**
 *  인증서 PFX 변환
 * @param selectedCert
 */
function fn_ConvertPFX(selectedCert) {
    if (!codefcert._checkLicense) {
        alert(engineCheckFailMessage);
        return;
    }

    var data = {};
    data.certPassword = $('#certPassword').val();
    data.certPath = selectedCert['cert.der.path'];
    data.keyPath = selectedCert['cert.key.path']; // certification pfx base64

    codefcert.engineGetExportCertificationB64(data, function (retData) {
        if (retData.SUCCESS) {
            var pfxInfo = retData.CONVERT;
            console.log('pfxInfo :: ' + pfxInfo);
        } else {
            var code = retData.REASON;
            console.log('[' + code + '] ' + PFX_ERROR_CODE_DEFINE[code]);
        }
    });
}

/**
 *  라이센스 체크
 * @param codefToken
 */
function fn_CheckLicense(codefToken) {
    codefcert.options.codefToken = codefToken;
    CODEF_TOKEN = codefToken;

    codefcert.engineCheckLicense(function (result) {
        if (result == null || typeof result === 'undefined') {
            codefcert._log('license check error');
        } else {
            codefcert._log(JSON.stringify(result));
            var code = result['code'];

            if (code == 'CF-00000') {
                codefcert._log('license check success!!');
            } else {
                codefcert._log('license check error :: ' + code);
            }
        }
    });
}
