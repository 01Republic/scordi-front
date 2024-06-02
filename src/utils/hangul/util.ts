export function getInitSound(src: string) {
    const dic = [
        'ㄱ',
        'ㄲ',
        'ㄴ',
        'ㄷ',
        'ㄸ',
        'ㄹ',
        'ㅁ',
        'ㅂ',
        'ㅃ',
        'ㅅ',
        'ㅆ',
        'ㅇ',
        'ㅈ',
        'ㅉ',
        'ㅊ',
        'ㅋ',
        'ㅌ',
        'ㅍ',
        'ㅎ',
    ];
    const sounds: string[] = [];
    src.split('').forEach((char, i) => {
        const index = Math.floor((src.charCodeAt(i) - 44032) / 28 / 21);
        if (index >= 0) sounds.push(dic[index]);
    });
    return sounds;
}

export function getMiddleSound(src: string) {
    const dic = [
        'ㅏ',
        'ㅐ',
        'ㅑ',
        'ㅒ',
        'ㅓ',
        'ㅔ',
        'ㅕ',
        'ㅖ',
        'ㅗ',
        'ㅘ',
        'ㅙ',
        'ㅚ',
        'ㅛ',
        'ㅜ',
        'ㅝ',
        'ㅞ',
        'ㅟ',
        'ㅠ',
        'ㅡ',
        'ㅢ',
        'ㅣ',
    ];
    const sounds: string[] = [];
    src.split('').forEach((char, i) => {
        const index = Math.floor(((src.charCodeAt(i) - 44032) / 28) % 21);
        if (index >= 0) sounds.push(dic[index]);
    });
    return sounds;
}

export function getFinalSound(src: string) {
    const dic = [
        '',
        'ㄱ',
        'ㄲ',
        'ㄳ',
        'ㄴ',
        'ㄵ',
        'ㄶ',
        'ㄷ',
        'ㄹ',
        'ㄺ',
        'ㄻ',
        'ㄼ',
        'ㄽ',
        'ㄾ',
        'ㄿ',
        'ㅀ',
        'ㅁ',
        'ㅂ',
        'ㅄ',
        'ㅅ',
        'ㅆ',
        'ㅇ',
        'ㅈ',
        'ㅊ',
        'ㅋ',
        'ㅌ',
        'ㅍ',
        'ㅎ',
    ];
    const sounds: string[] = [];
    src.split('').forEach((char, i) => {
        const index = (src.charCodeAt(i) - 44032) % 28;
        if (index >= 0) sounds.push(dic[index]);
    });
    return sounds;
}
