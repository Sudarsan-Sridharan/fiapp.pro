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