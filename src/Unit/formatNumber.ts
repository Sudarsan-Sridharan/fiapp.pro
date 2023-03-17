export const formatNumber = (num: number): string => {
    const suffixes: string[] = ['', 'k', 'M', 'B', 'T', 'Q'];
    let suffixIndex: number = 0;
    while (num >= 1000 && suffixIndex < suffixes.length - 1) {
        num /= 1000;
        suffixIndex++;
    }
    return num.toFixed(2) + suffixes[suffixIndex];
}
