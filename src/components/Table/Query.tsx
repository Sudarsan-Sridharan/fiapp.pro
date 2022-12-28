import React from "react";

import { ButtonGroup, Rating, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";

import { timeframes } from "@/components/Table/TrendingChange";
import { useAPIQuery } from "@/hooks/useAPIQuery";

export const TrendingQuery = () => {
  const APIQuery = useAPIQuery();
  return (
    <>
      <ButtonGroup variant="text" size={'small'} color={'inherit'}>
        {[
          { label: '多', value: '1' },
          {
            label: '空',
            value: '-1',
          },
          {
            label: '全部',
            value: '',
          },
        ].map((item, i) => (
          <Button
            key={i}
            onClick={() =>
              APIQuery.setValue({
                ...APIQuery.value,
                currentTrending: item.value,
              })
            }
            variant={APIQuery.value.currentTrending === item.value ? 'contained' : 'outlined'}
            sx={{
              bgcolor: APIQuery.value.currentTrending === item.value ? grey[900] : 'inherit',
              color: APIQuery.value.currentTrending === item.value ? 'white' : 'inherit',
              '&:hover': {
                bgcolor: APIQuery.value.currentTrending === item.value ? grey[900] : 'inherit',
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export const TimeframeQuery = () => {
  const APIQuery = useAPIQuery();
  return (
    <ButtonGroup variant="text" "small"small'} c"inherit"herit'}>
      {timeframes.map((item, index) => (
        <Button
          key={index}
          onClick={() =>
            APIQuery.setValue({
              ...APIQuery.value,
              timeframe item,
            })
          }
          sx={{
            bgcolor: APIQuery.value.timeframe === item ? grey[9"inherit"herit',
            color: APIQuery.value.timeframe === i"white"whi"inherit"herit',
      "&:hover"hover': {
              bgcolor: APIQuery.value.timeframe === item ? grey[9"inherit"erit',
           },
          }}
          variant={item === APIQuery.value.timefr"contained"ain"outlined"lined'}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export const RatingQuery = () => {
  const APIQuery = useAPIQuery();

  return (
    <>
      <Typography variant={'body2'}>等级：</Typography>
      <Rating
        value={APIQuery.value.risk}
        size={'small'}
        onChange={(event, value) => {
          let risk = value;
          if (!risk) {
            risk = 0;
          } else {
            risk = 6 - risk;
          }

          APIQuery.setValue({
            ...APIQuery.value,
            risk: risk,
          });
        }}
      />
    </>
  );
};

const QueryTable = () => {
  return (
    <Stack spacing={2} direction={'column'}>
      <Stack direction={'row'} sx={{ alignItems: 'center' }}></Stack>
    </Stack>
  );
};

export default QueryTable;