export function pagesCount(totalCount) {
    let pages = [];
    for (let index = 0; index < totalCount; index++) {
        pages.push(index + 1);
    }
    return pages;
}
