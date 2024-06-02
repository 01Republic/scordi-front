import {getFinalSound} from './util';

type Formatter<R> = string | ((parsed: {word: string; suffix: string}) => R);

// 슬랙 => 슬랙이 / 스코디 => 스코디가
export function nounToHangulSubjectFormat(word: string) {
    const lastChar = word.split('').reverse()[0] || '';
    const [exist] = getFinalSound(lastChar);
    return exist ? `${word}이` : `${word}가`;
}

/**
 * ```
 *      // format argument as a callback for component render
 *      {nounToHangulObjectFormat(serviceName, ({word, suffix}) => (
 *          <p>{word} / {suffix}</p>
 *      ))}
 * ```
 */
// 슬랙 => 슬랙을 / 스코디 => 스코디를
export function nounToHangulObjectFormat<R = string>(word: string, format: Formatter<R> = '%w%s') {
    const lastChar = word.split('').reverse()[0] || '';
    const [exist] = getFinalSound(lastChar);
    const suffix = exist ? `을` : `를`;
    return typeof format === 'string' ? format.replace('%w', word).replace('%s', suffix) : format({word, suffix});
}

export * from './noun';
