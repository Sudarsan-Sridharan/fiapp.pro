import React, { useEffect, useRef } from 'react';

import { Box } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

import { createChart, PriceScaleMode } from 'lightweight-charts';
import useSWR from 'swr';

import { domain, fetcher } from '@/ network/fether';
import { IRiskWarning } from '@/components/Table/RiskWarning';
import { ITrendingChange } from '@/components/Table/TrendingChange';
import { useAPIQuery } from '@/hooks/useAPIQuery';
import { messageType } from '@/pages/Detail/Detail';
import { timejs } from '@/utils/time';
import { useMatch } from 'react-router-dom';


export const ChartComponent = (props: any) => {
  const chartContainerRef = useRef<any>();
  const APIQuery = useAPIQuery();
  const conditions = {
    timeFrame: APIQuery.value.timeframe ?? '',
    name: props.name,
  };
  const sendUrl = new URLSearchParams(conditions).toString();

  const { data: trendingChange } = useSWR<any>(`${domain}/TrendingChange?${sendUrl}`, fetcher, {
    refreshInterval: 1000 * 60 * 5,
  });

  const { data: riskWarning } = useSWR<any>(`${domain}/RiskWarning?${sendUrl}`, fetcher, {
    refreshInterval: 1000 * 60 * 5,
  });

  const trending = trendingChange?.data.map((x: ITrendingChange) => {
    return {
      time: timejs(new Date(x.open_time).toLocaleString()).unix(),
      position: `${
        x.current_trending === 1 ? 'belowBar' : x.current_trending === 0 ? 'belowBar' : 'aboveBar'
      }`,
      color: `${
        x.current_trending === 1 ? green[900] : x.current_trending === 0 ? grey[900] : red[900]
      }`,
      shape: `${
        x.current_trending === 1 ? 'arrowUp' : x.current_trending === 0 ? 'arrowUp' : 'arrowDown'
      }`,
      text: `${
        x.current_trending === 1 ? '趋势转多' : x.current_trending === 0 ? '趋势中立' : '趋势转空'
      }(${6 - x.risk})`,
      size: 2,
    };
  });

  const risk = riskWarning?.data.map((x: IRiskWarning) => {
    return {
      time: timejs(new Date(x.open_time).toLocaleString()).unix(),
      position: 'belowBar',
      color: grey[500],
      shape: 'arrowUp',
      text: `${messageType[x.description_type as keyof typeof messageType]} \n(${x.risk})`,
    };
  });

  function timeToLocal(originalTime: number) {
    const d = new Date(originalTime * 1000);
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()) / 1000;
  }

  const price = props.klines?.data?.data.coinKlines?.klines.map(
    (item: {
      open_at: Date;
      open_bid: number;
      close_bid: number;
      highest_bid: number;
      lowest_bid: number;
    }) => {
      return {
        time: timeToLocal(timejs(new Date(item.open_at).toLocaleString()).unix()),
        open: item.open_bid,
        high: item.highest_bid,
        low: item.lowest_bid,
        close: item.close_bid,
      };
    },
  );

  const isChartPage = useMatch('/chart/:name');

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      rightPriceScale: {
        mode: PriceScaleMode.Logarithmic,
      },
    });

    chart.priceScale().applyOptions({
      mode: PriceScaleMode.Logarithmic,
    });
    chart.timeScale().applyOptions({
      timeVisible: true,
      rightOffset: isChartPage ? 2 : 100,
      barSpacing: 4,
    });

    const timer = new Date().getTime();

    chart.applyOptions({
      watermark: {
        visible: true,
        fontSize: 24,
        horzAlign: 'center',
        vertAlign: 'center',
        color: 'rgba(0, 0, 0, 0.3)',
        text: `Fiapp.pro - ${props.name}`,
      },
      grid: {
        vertLines: { color: grey[100] },
        horzLines: { color: grey[100] },
      },
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: '#fff',
      downColor: grey[800],
      borderDownColor: grey[800],
      borderUpColor: grey[800],
      wickDownColor: grey[800],
      wickUpColor: grey[800],
      title: props.name,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    newSeries.applyOptions({
      priceFormat: {
        type: 'price',
        precision: isChartPage ? 2 : 6,
        minMove: 0.000001,
      },
    });
    newSeries.setData(price);
    newSeries.setMarkers(trending ? [...trending.sort((a: any, b: any) => (a.time - b.time))] : []);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [price, props.name, trending]);

  return (
    <>
      <Box height={props.height} width={'100%'}>
        {price && (
          <div
            ref={chartContainerRef}
            style={{
              height: '100%',
            }}
          />
        )}
      </Box>
    </>
  );
};

const NewKline = (props: any) => {
  return <ChartComponent {...props} />;
};

export default NewKline;