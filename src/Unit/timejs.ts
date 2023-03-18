import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/zh-cn'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
const timejs = dayjs
export default timejs

export const timeframeToTargetTime = (timeframe: string, open_time: string | Date) => {
    const [addTimeNum, addTimeStr]: any = timeframe.match(/^(\d+)([a-zA-Z]+)$/)?.slice(1) ?? [30, 'M'];
    const targetTime = timejs(open_time).add(Number(addTimeNum * 20), addTimeStr.toLowerCase()).valueOf()

    return targetTime
}

const getDateBefore1500X = (timeframe: string): Date => {
    const now: Date = new Date();
    const timeframes: { [key: string]: number } = {
        "30M": 30 * 30 * 60 * 1000,
        "1H": 1 * 30 * 60 * 1000,
        "4H": 4 * 30 * 60 * 1000,
        "1D": 1 * 30 * 24 * 60 * 60 * 1000
    };
    const timeSpan: number | undefined = timeframes[timeframe];
    if (!timeSpan) {
        throw new Error("Invalid timeframe.");
    }
    const dateBefore1500X: Date = new Date(now.getTime() - timeSpan * 1500);
    return dateBefore1500X;
};

export const isEarlierThan1500X = (inputDate: Date, timeframe: string): boolean => {
    const date1500X: Date = getDateBefore1500X(timeframe);
    return inputDate.getTime() >= date1500X.getTime();
};