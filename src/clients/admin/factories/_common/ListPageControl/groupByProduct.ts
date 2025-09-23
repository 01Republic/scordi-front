import {CodefCardParserDtoInFactory as CardParser} from '^models/_codef/CodefCardParser/type/CodefCardParser.dto';
import {CodefBankAccountParserDtoInFactory as BankParser} from '^models/_codef/CodefBankAccountParser/type';
import {EmailParserDtoInFactory as EmailParser} from '^models/EmailParser/types';

export function getGroupByProduct<T extends CardParser | BankParser | EmailParser>(items: T[], searchValue: string) {
    const container: Record<number, T[]> = {};
    items.forEach((item) => {
        container[item.productId] ||= [];
        container[item.productId].push(item);
    });
    const groups = Object.values(container);

    const searchedGroups = groups
        .map((parsers) => {
            return parsers.filter((parser) => {
                if (parser.title.toLowerCase().includes(searchValue)) return true;
                if (parser.product.name().toLowerCase().includes(searchValue)) return true;

                return false;
            });
        })
        .filter((parsers) => parsers.length > 0);

    const allList = searchedGroups;
    const publishedList = searchedGroups.filter((parsers) => parsers.some((parser) => parser.isActive));
    const notPublishedList = searchedGroups.filter((parsers) => !parsers.some((parser) => parser.isActive));

    return {allList, publishedList, notPublishedList};
}
