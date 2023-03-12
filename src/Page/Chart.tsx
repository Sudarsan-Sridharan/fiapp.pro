import {useSearchParams} from "react-router-dom";
import ChartComponent from '../Components/Chart/Chart'

const Chart = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name') ?? 'BTCUSDT';
    const timeframe = searchParams.get('timeframe') ?? '30M';

    return (
        <ChartComponent name={name} timeframe={timeframe} height={'100vh'}/>
    )
}

export default Chart