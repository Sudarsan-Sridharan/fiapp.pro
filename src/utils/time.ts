import dayjs from "dayjs";
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(RelativeTime)
dayjs.locale('zh-cn')

export const timejs = dayjs