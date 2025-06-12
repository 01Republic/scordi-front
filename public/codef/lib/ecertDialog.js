function _typeof(obj) {
    '@babel/helpers - typeof';
    if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj;
        };
    }
    return _typeof(obj);
}

var ecertDialog = {
    _certPIDS: JSON.parse(
        '{"1.2.410.200004.5.1.1.11":{"usetype":"실버 개인","organization":"코스콤"},"1.2.410.200004.5.1.1.3":{"usetype":"스페셜 법인","organization":"코스콤"},"1.2.410.200004.2.1,1.2.410.200012.1.1.103":{"usetype":"증권\\/보험용","organization":"한국무역정보통신"},"1.2.410.200004.5.3.1.7":{"usetype":"특수목적용(서버)","organization":"한국전산원"},"1.2.410.200004.5.1.1.4":{"usetype":"스페셜 서버","organization":"코스콤"},"1.2.410.200004.5.1.1.12":{"usetype":"실버 법인","organization":"코스콤"},"1.2.410.200004.5.2.1.7.3":{"usetype":"신용카드","organization":"정보인증"},"1.2.410.200004.5.1.1.5":{"usetype":"범용개인","organization":"코스콤"},"1.2.410.200004.5.3.1.8":{"usetype":"특수목적용(개인)","organization":"한국전산원"},"1.2.410.200004.2.1,1.2.410.200012.1.1.105":{"usetype":"신용카드용","organization":"한국무역정보통신"},"1.2.410.200004.5.1.1.6":{"usetype":"범용 개인서버","organization":"코스콤"},"1.2.410.200004.5.3.1.9":{"usetype":"범용개인","organization":"한국전산원"},"1.2.410.100001.2.1.1,1.2.410.100001.2.1.2":{"usetype":"공인인증기관","organization":"공인인증기관"},"1.2.410.200004.5.1.1.7":{"usetype":"범용기업","organization":"코스콤"},"1.2.410.200004.5.1.1.8":{"usetype":"범용 서버","organization":"코스콤"},"1.2.410.200004.5.1.1.9":{"usetype":"증권\\/보험용","organization":"코스콤"},"1.2.410.200005.1.1.2":{"usetype":"은행기업","organization":"금융결제원"},"1.2.410.200005.1.1.4":{"usetype":"은행개인","organization":"금융결제원"},"1.2.410.200004.5.4.1.101":{"usetype":"은행개인","organization":"한국 전자인증"},"1.2.410.200005.1.1.6":{"usetype":"용도제한용","organization":"금융결제원"},"1.2.410.200004.2.1,1.2.410.200012.1.1.1":{"usetype":"전자거래 서명용(개인)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.2":{"usetype":"전자거래 암호용(개인)","organization":"한국무역정보통신"},"1.2.410.200004.5.4.1.102":{"usetype":"증권거래용","organization":"한국 전자인증"},"1.2.410.200004.2.1,1.2.410.200012.1.1.3":{"usetype":"전자거래 서명용(법인)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.4":{"usetype":"전자거래 암호용(법인)","organization":"한국무역정보통신"},"1.2.410.200004.2.1":{"usetype":"공인인증기관","organization":"공인인증기관"},"1.2.410.200004.2.1,1.2.410.200012.1.1.5":{"usetype":"전자거래 서명용(서버)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.6":{"usetype":"전자거래 암호용(서버)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.7":{"usetype":"전자무역 서명용(개인)","organization":"한국무역정보통신"},"1.2.410.200004.5.4.1.103":{"usetype":"신용카드","organization":"한국 전자인증"},"1.2.410.200004.2.1,1.2.410.200012.1.1.8":{"usetype":"전자무역 암호용(개인)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.9":{"usetype":"전자무역 서명용(법인)","organization":"한국무역정보통신"},"1.2.410.200012.1.1.101":{"usetype":"은행개인","organization":"한국무역정보통신"},"1.2.410.100001.2.2.1":{"usetype":"공인인증기관","organization":"공인인증기관"},"1.2.410.200004.5.4.1.104":{"usetype":"전자민원용","organization":"한국 전자인증"},"2.5.29.32.0":{"usetype":"공인인증기관","organization":"공인인증기관"},"1.2.410.200012.1.1.105":{"usetype":"신용카드","organization":"한국무역정보통신"},"1.2.410.200004.5.4.1.1":{"usetype":"범용개인","organization":"한국 전자인증"},"1.2.410.200004.5.4.1.2":{"usetype":"범용기업","organization":"한국 전자인증"},"1.2.410.200012.1.1.1":{"usetype":"범용개인","organization":"한국무역정보통신"},"1.2.410.200005.1.1.6.1":{"usetype":"기업뱅킹","organization":"금융결제원"},"1.2.410.200004.5.4.1.3":{"usetype":"범용(서버)","organization":"한국 전자인증"},"1.2.410.200005.1.1.1":{"usetype":"범용개인","organization":"금융결제원"},"1.2.410.200005.1.1.6.2":{"usetype":"신용카드","organization":"금융결제원"},"1.2.410.200004.5.4.1.4":{"usetype":"특수목적용(개인)","organization":"한국 전자인증"},"1.2.410.200012.1.1.3":{"usetype":"범용기업","organization":"한국무역정보통신"},"1.2.410.200004.5.3.1.1":{"usetype":"범용기업","organization":"한국전산원"},"1.2.410.200004.5.4.1.5":{"usetype":"특수목적용(법인)","organization":"한국 전자인증"},"1.2.410.200005.1.1.5":{"usetype":"범용기업","organization":"금융결제원"},"1.2.410.200004.5.3.1.2":{"usetype":"범용기업","organization":"한국전산원"},"1.2.410.200004.5.3.1.3":{"usetype":"1등급(서버)","organization":"한국전산원"},"1.2.410.200004.5.1.1.9.2":{"usetype":"신용카드","organization":"코스콤"},"1.2.410.200004.2.1,1.2.410.200012.1.1.10":{"usetype":"전자무역 암호용(법인)","organization":"한국무역정보통신"},"1.2.410.200004.5.2.1.1":{"usetype":"범용기업","organization":"정보인증"},"1.2.410.200004.5.3.1.5":{"usetype":"특수목적용(기관\\/단체)","organization":"한국전산원"},"1.2.410.200004.2.1,1.2.410.200012.1.1.11":{"usetype":"전자무역 서명용(서버)","organization":"한국무역정보통신"},"1.2.410.200004.5.2.1.2":{"usetype":"범용개인","organization":"정보인증"},"1.2.410.200004.5.2.1.7.1":{"usetype":"은행개인","organization":"정보인증"},"1.2.410.200004.2.1,1.2.410.200012.1.1.12":{"usetype":"전자무역 암호용(서버)","organization":"한국무역정보통신"},"1.2.410.200004.2.1,1.2.410.200012.1.1.101":{"usetype":"은행\\/보험용","organization":"한국무역정보통신"},"1.2.410.200004.5.2.1.3":{"usetype":"특별등급(전자입찰)","organization":"정보인증"},"1.2.410.200004.5.3.1.6":{"usetype":"특수목적용(법인)","organization":"한국전산원"},"1.2.410.200004.5.2.1.4":{"usetype":"1등급인증서(서버)","organization":"정보인증"},"1.2.410.200004.5.1.1.10":{"usetype":"골드 개인서버","organization":"코스콤"},"1.2.410.200004.5.1.1.1":{"usetype":"스페셜 개인","organization":"코스콤"},"1.2.410.200004.5.2.1.5":{"usetype":"특별등급 법인","organization":"정보인증"},"1.2.410.200004.5.2.1.7.2":{"usetype":"증권\\/보험용","organization":"정보인증"},"1.2.410.100001.2.1.1,1.2.410.100001.2.1.2,1.2.410.100001.2.2.1":{"usetype":"공인인증기관","organization":"공인인증기관"},"1.2.410.200004.5.1.1.2":{"usetype":"스페셜 개인서버","organization":"코스콤"}}',
    ),
    _headElement: ['구분', '사용자', '만료일', '발급자'],
    _subjectOUNames: [
        {
            subjectOU: 'ou=산업은행',
            dspName: 'KDB',
        },
        {
            subjectOU: 'ou=IBK',
            dspName: '기업은행',
        },
        {
            subjectOU: 'ou=KMB',
            dspName: '국민은행',
        },
        {
            subjectOU: 'ou=CHB',
            dspName: '조흥은행',
        },
        {
            subjectOU: 'ou=KFTC',
            dspName: '금융결제원',
        },
        {
            subjectOU: 'ou=KEB',
            dspName: '외환은행',
        },
        {
            subjectOU: 'ou=NFFC',
            dspName: '수협은행',
        },
        {
            subjectOU: 'ou=NACF',
            dspName: '농협은행',
        },
        {
            subjectOU: 'ou=WOORI',
            dspName: '우리은행',
        },
        {
            subjectOU: 'ou=KFB',
            dspName: '제일은행',
        },
        {
            subjectOU: 'ou=SHB',
            dspName: '신한은행',
        },
        {
            subjectOU: 'ou=KAB',
            dspName: '한미은행',
        },
        {
            subjectOU: 'ou=DGB',
            dspName: '대구은행',
        },
        {
            subjectOU: 'ou=PSB',
            dspName: '부산은행',
        },
        {
            subjectOU: 'ou=KJB',
            dspName: '광주은행',
        },
        {
            subjectOU: 'ou=CJB',
            dspName: '제주은행',
        },
        {
            subjectOU: 'ou=JBB',
            dspName: '전북은행',
        },
        {
            subjectOU: 'ou=KNBBANK',
            dspName: '경남은행',
        },
        {
            subjectOU: 'ou=KFCC',
            dspName: '새마을금고',
        },
        {
            subjectOU: 'ou=SEOULBANK',
            dspName: '서울은행',
        },
        {
            subjectOU: 'ou=CUBANK',
            dspName: '신협',
        },
        {
            subjectOU: 'ou=CITI',
            dspName: '씨티은행',
        },
        {
            subjectOU: 'ou=HSBC',
            dspName: '홍콩상하이은행',
        },
        {
            subjectOU: 'ou=DEUT',
            dspName: '도이치뱅크',
        },
        {
            subjectOU: 'ou=BANA',
            dspName: 'BankofAmerica',
        },
        {
            subjectOU: 'ou=HNB',
            dspName: '하나은행',
        },
    ],
    // 이동식 디스크 정보
    usbItems: [],
    // 만료인증서인경우 표시안함 (인증서 만료 노출 처리(true : 표시, false : 미표시))
    certShowGbn: false,
    // 비밀번호 입력 min
    minLength: 5,
    // 비밀번호 입력 max
    maxLength: 50,
    // 인증서 리스트
    _certItems: [],
    // 인증서 선택 인덱스
    _selectedCertIndex: '',
    // 비밀번호 재시도 cnt
    _certTryCnt: 0,
    // 인증서 정보
    _pfxCertInfo: null,
    // 비밀번호 검증 완료 상태
    _isValidCert: false,
    // 선택된 이동식 디스크 path
    _extDrivePath: '',
    // 승인번호
    _authNum: '',

    /**
     *  인증서 구분
     * @param o
     * @returns {string|*}
     * @private
     */
    _getUsetype: function _getUsetype(o) {
        var ss = '알수없음';
        var data = this._certPIDS[o];

        if (_typeof(data) === 'object') {
            if (typeof data.usetype != 'undefined') return data.usetype;
        }

        return ss;
    },

    /**
     * 인증서 구분 - 발급 기관
     * @param o
     * @returns {string}
     * @private
     */
    _getOrganization: function _getOrganization(o) {
        var ss = '알수없음';
        var data = this._certPIDS[o];

        if (_typeof(data) === 'object') {
            if (typeof data.organization != 'undefined') return data.organization;
        }

        return ss;
    },

    /**
     * 인증서 만료일
     * @param a
     * @returns {string}
     * @private
     */
    _convertTime: function _convertTime(a) {
        var newDate = new Date(new Date(a * 1000));
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        return newDate.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day);
    },

    /**
     * [인증서 내보내기] 하드 디스크 - 인증서 리스트
     * @param certifications
     */
    displayCert: function displayCert(certifications) {
        this._certItems = _typeof(certifications) == 'object' ? certifications : [];
        var html = '';
        $('#certList').html('');
        $('#no-cert-list').hide();
        $('#cert-list').show(); //+ 인증서 리스트 없음.

        if (this._certItems.length == 0) {
            $('#no-cert-list').show();
            $('#cert-list').hide();
            return;
        } //+ 인증서 리스트

        var date = new Date();
        var nowDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;
        var infoDate = Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate()) / 1000;
        $.each(this._certItems, function (idx, certItem) {
            var notAfter = certItem['cert.validity.notAfter'];
            html = '<tr tabindex="' + idx + '" onclick="setCertIndex(' + idx + ')">';
            html += '<td class="text-left">';
            html += '<div class="text-truncate" style="width: 85px;">';

            if (nowDate > notAfter) {
                // 만료 인증서
                html += '<img class="mr-1" src="./images/icon-cert-end@2x.png">';
            } else if (0 < infoDate - notAfter && infoDate - notAfter <= 2678400) {
                // 한달 이내 갱신 대상 인증서
                html += '<img class="mr-1" src="./images/icon-cert-info@2x.png">';
            } else {
                html += '<img class="mr-1" src="./images/icon-cert@2x.png">';
            }

            html += ecertDialog._getUsetype(certItem['cert.extension.policyid']); // 구분

            html += '</div>';
            html += '</td>';
            html += '<td class="text-center align-middle">';
            html += '<div class="text-truncate" style="width: 175px;">';
            html += certItem['cert.subjectname.CN'];
            html += '</div>';
            html += '</td>';
            html += '<td class="text-center align-middle">';
            html += ecertDialog._convertTime(notAfter);
            html += '</td>';
            html += '<td class="text-center align-middle">';
            html += '<div class="text-truncate">';
            html += ecertDialog._getOrganization(certItem['cert.extension.policyid']);
            html += '</div>';
            html += '</td>';
            html += '</tr>';

            if (!ecertDialog.certShowGbn) {
                //만료인증서인경우 표시안함 (인증서 만료 노출 처리(true : 표시, false : 미표시))
                if (!(nowDate > notAfter)) {
                    //인증서 기간비교
                    $('#certList').append(html);
                }
            } else {
                $('#certList').append(html);
            }
        });
    },

    /**
     *  [인증서내보내기] 이동식 디스크 load
     * @param driver
     */
    loadExtDrive: function loadExtDrive(index) {
        console.log('loadExtDrive path :: ' + this.usbItems[index]); // ecertDialog._callReturnFunction("OnLoadCertification",  this.usbItems[index]);

        fn_OnLoadCertification(this.usbItems[index]);
        $('[data-toggle="popover"]').popover('hide');
    },

    /**
     *  [인증서가져오기] 이동식 디스크 path 설정
     */
    importCertPath: function importCertPath(index) {
        ecertDialog._extDrivePath = this.usbItems[index];
        console.log('[importCertPath] :: ' + this._extDrivePath);
        $('[data-toggle="popover"]').popover('hide');
    },

    /**
     * 이동식 디스크 - 인증서 리스트
     * @param certifications
     */
    displayExtdrive: function displayExtdrive(drivers) {
        var jsonDriver = JSON.stringify(drivers).replace(/\"/gi, '').replace('[', '').replace(']', ''); //    ["D:\\"]

        this.usbItems = jsonDriver.split(',');

        if ($('#cert-save-path').is(':visible')) {
            // + 인증서 가져오기
            $('#extdrive2').attr('data-content', '');
            $('#extdrive2').data('content', '');
            var html = '';
            $.each(this.usbItems, function (idx, usbItem) {
                if (usbItem != '') {
                    html += '<a class="d-block" href="javascript:void(0)" onclick="ecertDialog.importCertPath('
                        .concat(idx, ')"> ')
                        .concat(usbItem, ' </a>');
                }
            });

            if (html) {
                $('#extdrive2').data('content', $(html).clone());
            }

            $('#extdrive2').popover('show');
        } else {
            // + 인증서 내보내기
            $('#extdrive1').attr('data-content', '');
            $('#extdrive1').data('content', ''); //+ 이동식 디스크 경로

            var html = '';
            $.each(this.usbItems, function (idx, usbItem) {
                console.log('usbItem::  ' + usbItem);

                if (usbItem != '') {
                    html += '<a class="d-block" href="javascript:void(0)" onclick="ecertDialog.loadExtDrive('
                        .concat(idx, ')"> ')
                        .concat(usbItem, '</a>');
                }
            });

            if (html) {
                $('#extdrive1').data('content', $(html).clone());
            }

            $('#extdrive1').popover('show');
        }
    },

    /**
     *  CERT Dialog SHOW
     * @private
     */
    showDialog: function showDialog(callback) {
        if (!codefcert._checkLicense) {
            alert(engineCheckFailMessage);
            return;
        }

        $('#cert-copy-modal').modal('show'); // 인증서 다이얼로그 활성화

        $('#tab-export').click();
        certExportInit(); // 인증서 내보내기 초기화

        selectDevice(); // 저장매체 선택
        // fn_OnLoadExtraDrive();

        fn_OnLoadCertification('');
    },

    /**
     *  [인증서 내보내기] 패스워드 입력 레이아웃 초기화
     */
    initCertPassword: function initCertPassword() {
        $('#tab-export').removeClass('disabled');
        $('.btn-group-toggle .btn').removeClass('disabled');
        $('.table').addClass('table-hover').removeClass('table-secondary');
        $('#input-cert-password').show();
        $('#input-cert-number').hide();
    },

    /**
     *    [인증서 내보내기] > 인증번호 폼 설정
     */
    initCertNumberForm: function initCertNumberForm() {
        // 인증서 내보내기 탭 비활성화
        $('#tab-export').addClass('disabled'); // 저장매체 선택 버튼 비활성화

        $('.btn-group-toggle .btn').addClass('disabled'); // 인증서 선택 테이블 비활성화

        $('.table').removeClass('table-hover').addClass('table-secondary'); // 인증 비밀번호 폼 숨기고

        $('#input-cert-password').hide(); // 인증번호 폼 보이기

        $('#input-cert-number').show(); // 인증서 비밀번호 검증 완료 처리

        ecertDialog._isValidCert = true;
    },
};

/*========================================================================================================================
  Dialog 이벤트 처리 [Start]
 ========================================================================================================================*/

/**
 * 팝업 초기화
 */
function initPopup() {
    // 폼 리셋
    $('form').each(function () {
        this.reset();
    }); // 인증서 선택 초기화

    $('#certList tr').each(function () {
        $(this).removeClass('bg-primary');
    }); // 저장매체 선택 초기화

    $('#hardDisk1').parent().addClass('active');
    $('#hardDisk2').parent().addClass('active');
    $('#extdrive1').parent().removeClass('active');
    $('#extdrive2').parent().removeClass('active');
    ecertDialog._selectedCertIndex = '';
    ecertDialog._pfxCertInfo = null;
    ecertDialog._isValidCert = false;
    ecertDialog._certTryCnt = 0;
    ecertDialog._extDrivePath = '';
}

/**
 * [인증서 내보내기] 탭 클릭
 */
function fn_clickExport() {
    //팝업 초기화
    initPopup();
    $('#btnExport').removeClass('invisible');
    $('#btnCompleted').addClass('invisible');
    $('#btnImport').addClass('invisible');
}

/**
 *   [인증서 내보내기] 초기화
 */
function certExportInit() {
    ecertDialog.initCertPassword(); // 탭 활성화 초기화

    $('.tab-content .tab-pane').removeClass('active');
    $('.nav .nav-link').removeClass('active'); // 첫번째탭 활성화

    $('.tab-content .tab-pane').eq(0).addClass('active');
    $('.nav .nav-link').eq(0).addClass('active');
    $('#cert').show();
    $('#cert-export-select').show();
    $('#cert-save-path').hide();
}

/**
 *  [인증서 내보내기] 인증서 선택 -  인덱스 설정
 * @param idx
 */
function setCertIndex(idx) {
    if ($('#tab-export').hasClass('disabled')) {
        return;
    }

    ecertDialog._selectedCertIndex = idx;
    console.log(ecertDialog._certItems[ecertDialog._selectedCertIndex]);
}

/**
 * [인증서 내보내기] 인증서 선택  - 비밀번호 입력 후 확인
 */
function selectCertDisabled() {
    // 1. 인증서 내보내기 - 유효성 검증
    if (!ecertDialog._isValidCert) {
        // 선택된 인증서 유무 체크하고 없으면 선택유도 얼럿 출력
        var check_cert = !$('.table .bg-primary').length;

        if (check_cert) {
            modalAlert('복사할 인증서를 선택해주세요.');
            return;
        }

        console.log('[selectCertDisabled] index ::    ' + ecertDialog._selectedCertIndex); // + 인증서 내보내기- 1 선택된 인증서 PFX 파일 변환

        fn_ExportCert(ecertDialog._certItems[ecertDialog._selectedCertIndex]); //+ 선택된 인증서 pfx 변환
        // fn_ConvertPFX(ecertDialog._certItems[ecertDialog._selectedCertIndex]);
    } else {
        // 2. 인증서 내보내기 -  인증번호
        var num1 = $('#num1').val();
        var num2 = $('#num2').val();
        var num3 = $('#num3').val();

        if (!num1 || !num2 || !num3) {
            modalAlert('인증번호를 입력하여주세요.');
            return;
        }

        ecertDialog._authNum = $('#num1').val() + $('#num2').val() + $('#num3').val();

        var bodyString = {
            authNo: ecertDialog._authNum,
            pfxFile: ecertDialog._pfxCertInfo,
        };

        fn_CallServer(
            '/api/cert/export',
            'POST',
            JSON.stringify(bodyString),
            function (response) {
                console.log('[importCert] response::  ' + response.result.code);

                if (response.result.code == 'CF-00000') {
                    // 정상
                    modalAlert('인증서 복사가 완료 되었습니다.');
                    closeModal();
                } else {
                    console.log('인증서 내보내기 실패');
                    modalAlert('[' + response.result.code + ']' + response.result.message + '\n 다시 시도 하여주세요.');
                }
            },
            function (error) {
                console.log('[exportCert] error status ::  ' + error.status);
                console.log('[exportCert] error responseText ::  ' + error.responseText);

                if (typeof error.responseText == 'undefined') {
                    modalAlert('[에러발생] 통신 처리 중 오류가 발생하혔습니다. 다시 시도하여주세요.');
                } else {
                    modalAlert(error.responseText);
                }
            },
        );
    }
}

/**
 * [인증서 가져오기]탭 클릭
 */
function fn_clickImport() {
    if ($('#tab-import').hasClass('active')) {
        return;
    }

    // 팝업 초기화
    initPopup();

    $('#btnExport').addClass('invisible');
    $('#btnCompleted').addClass('invisible');
    $('#btnImport').removeClass('invisible');
    ecertDialog._pfxCertInfo = null;
    $('#authNo01').val('');
    $('#authNo02').val('');
    $('#authNo03').val('');

    // 1. 인증번호 요청
    fn_CallServer(
        '/api/cert/authNo',
        'GET',
        '',
        function (response) {
            if (response.result.code == 'CF-00000') {
                // 정상
                console.log('[importCert] authNo::  ' + response.data.authNo);
                ecertDialog._authNum = response.data.authNo;
                $('#authNo01').val(ecertDialog._authNum.substr(0, 4));
                $('#authNo02').val(ecertDialog._authNum.substr(4, 4));
                $('#authNo03').val(ecertDialog._authNum.substr(8, 4));
            } else {
                modalAlert('[' + response.result.code + ']' + response.result.message + '\n 다시 시도 하여주세요.');
            }
        },
        function (error) {
            // {"result":{"code":"CF-09999","extraMessage":"INTERNAL_SERVER_ERROR 500","message":"서버 처리중 에러가 발생 했습니다. 관리자에게 문의하세요."},"data":{}}
            // console.log('[authNo] error status ::  ' + error.status)
            // console.log('[authNo] error responseText ::  ' + error.responseText)
            if (typeof error.responseText == 'undefined') {
                modalAlert('통신 처리 중 오류가 발생하혔습니다. 다시 시도하여주세요.');
            } else {
                modalAlert(error.responseText);
            }
        },
    );
}

/**
 *  [인증서 가져오기]> 확인 버튼
 */
function certImportOk() {
    if (ecertDialog._pfxCertInfo == null) {
        fn_CallServer(
            '/api/cert/import/' + ecertDialog._authNum,
            'GET',
            '',
            function (response) {
                // console.log('[importCert] response::  '+response.result.code)
                // console.log('[importCert] response::  '+response.result.message)
                if (response.result.code == 'CF-00000') {
                    // 가져오기 정상
                    ecertDialog._pfxCertInfo = response.data.pfxFile;
                    console.log('_pfxCertInfo::  ' + ecertDialog._pfxCertInfo);
                    $('#cert-export-select').hide();
                    $('#cert-save-path').show(); // fn_OnLoadExtraDrive();
                } else {
                    // 가져오기 실패
                    modalAlert('[' + response.result.code + ']' + response.result.message);
                }
            },
            function (error) {
                console.log('[importCert] error status ::  ' + error.status);
                console.log('[importCert] error responseText ::  ' + error.responseText);

                if (typeof error.responseText == 'undefined') {
                    modalAlert('통신 처리 중 오류가 발생하혔습니다. 다시 시도하여주세요.');
                } else {
                    modalAlert(error.responseText);
                }
            },
        );
    } else {
        var password = null;

        if ($('#certPassword2')) {
            password = $('#certPassword2').val();
        } // console.log('pfx :: '+ecertDialog._pfxCertInfo);
        // console.log('path :: '+ecertDialog._extDrivePath);
        // console.log('password :: '+password);

        var data = {};
        data.certFile = ecertDialog._pfxCertInfo;
        data.certPassword = password;
        data.external = ecertDialog._extDrivePath; // 이동식 디스크 경로, 기본 시스템경로는 "", 이동식디스크는 경로셋팅 (ex. G:\\)

        fn_ImportCert(data);
    }
}

/**
 *  저장매체 선택
 */
function selectDevice() {
    $(':disabled').closest('.btn').addClass('disabled');

    $(document).on('click', '[data-toggle="popover"]', function () {
        $(this).popover('dispose');
        $('[data-toggle="popover"]').popover('hide');
    });

    $(document).on('click', '[data-toggle="tab"]', function () {
        $('[data-toggle="popover"]').popover('hide');
    });

    // 이동식 디스크 선택
    $(document).on('click', '.popover a', function () {
        var active = 'active';
        $(this).addClass(active).siblings().removeClass(active);
    });

    // 인증서 리스트 선택
    $(document).on('click', '.table-hover tbody tr', function () {
        var active = 'bg-primary';
        $(this).addClass(active).siblings().removeClass(active);
    });

    $(document).on('click', '#hardDisk1', function () {
        //password 초기화
        $('#certPassword').val('');

        ecertDialog._extDrivePath = '';
        fn_OnLoadCertification('');
    });

    // 이동식 디스크
    $(document).on('click', '#extdrive1', function () {
        $('#certPassword').val(''); //password 초기화

        ecertDialog._extDrivePath = ''; // 초기화

        fn_OnLoadExtraDrive();
    });

    // 하드디스크
    $(document).on('click', '#hardDisk2', function () {
        $('#certPassword2').val(''); //password 초기화

        ecertDialog._extDrivePath = ''; // 초기화

        $('[data-toggle="popover"]').popover('hide'); // console.log('hardDisk2 초기화 :: '+ecertDialog._extDrivePath);
    });

    // 이동식 디스크
    $(document).on('click', '#extdrive2', function () {
        $('#certPassword2').val(''); //password 초기화

        ecertDialog._extDrivePath = ''; // 초기화
        // console.log('extdrive2 초기화  :: '+ecertDialog._extDrivePath);

        fn_OnLoadExtraDrive();
    });
}

/**
 * 팝업 종료
 */
function closeModal() {
    $('#cert-copy-modal').modal('hide');
}
