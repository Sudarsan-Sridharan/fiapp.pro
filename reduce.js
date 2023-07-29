const fs = require('fs');

// 定义一个函数，按照月份合并数据
function mergeDataByMonth(data) {
  const mergedData = {};
  data.forEach(row => {
    const date = new Date(row.open_time_str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthKey = `${year}-${month < 10 ? '0' + month : month}`;
    if (!mergedData[monthKey]) {
      mergedData[monthKey] = {
        open_time_str: monthKey,
        entering_position_nums: 0,
        exiting_position_nums: 0,
        having_position_nums: row.having_position_nums,
        cost: 0,
        gain: 0,
        cash_balance: row.cash_balance,
        position_value: row.position_value,
        net_value: row.net_value,
      };
    }
    mergedData[monthKey].entering_position_nums += row.entering_position_nums;
    mergedData[monthKey].exiting_position_nums += row.exiting_position_nums;
    mergedData[monthKey].cost += row.cost;
    mergedData[monthKey].gain += row.gain;
    mergedData[monthKey].cash_balance = row.cash_balance;
    mergedData[monthKey].position_value = row.position_value;
    mergedData[monthKey].net_value = row.net_value;
  });
  return Object.values(mergedData);
}

// 定义一个函数，按照日期合并数据
function mergeDataByDate(data) {
  const mergedData = {};
  data.forEach(row => {
    const date = row.open_time_str.substring(0, 10);
    if (!mergedData[date]) {
      mergedData[date] = {
        open_time_str: row.open_time_str,
        entering_position_nums: 0,
        exiting_position_nums: 0,
        having_position_nums: row.having_position_nums,
        cost: 0,
        gain: 0,
        cash_balance: row.cash_balance,
        position_value: row.position_value,
        net_value: row.net_value
      };
    }
    mergedData[date].entering_position_nums += row.entering_position_nums;
    mergedData[date].exiting_position_nums += row.exiting_position_nums;
    mergedData[date].cost += row.cost;
    mergedData[date].gain += row.gain;
    mergedData[date].cash_balance = row.cash_balance;
    mergedData[date].position_value = row.position_value;
    mergedData[date].net_value = row.net_value;
  });
  return Object.values(mergedData);
}

// 定义一个函数，按照每十天合并数据
function mergeDataByTenDays(data) {
  const mergedData = {};
  data.forEach(row => {
    const date = new Date(row.open_time_str);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const tenDaysKey = `${year}-${month < 10 ? '0' + month : month}-${Math.ceil(day / 10)}`;
    if (!mergedData[tenDaysKey]) {
      mergedData[tenDaysKey] = {
        open_time_str: tenDaysKey,
        entering_position_nums: 0,
        exiting_position_nums: 0,
        having_position_nums: row.having_position_nums,
        cost: 0,
        gain: 0,
        cash_balance: row.cash_balance,
        position_value: row.position_value,
        net_value: row.net_value
      };
    }
    mergedData[tenDaysKey].entering_position_nums += row.entering_position_nums;
    mergedData[tenDaysKey].exiting_position_nums += row.exiting_position_nums;
    mergedData[tenDaysKey].cost += row.cost;
    mergedData[tenDaysKey].gain += row.gain;
    mergedData[tenDaysKey].cash_balance = row.cash_balance;
    mergedData[tenDaysKey].position_value = row.position_value;
    mergedData[tenDaysKey].net_value = row.net_value;
  });
  return Object.values(mergedData);
}

// 读取数据文件
const data = JSON.parse(fs.readFileSync('/Users/yanlee/PycharmProjects/test-fiapp/blackbox/result/futures_um/20230710_153825/net.json'));

// 调用函数合并数据
const mergedData = mergeDataByDate(data);

// 将合并后的数据保存到输出文件
fs.writeFileSync('src/assets/net.json', JSON.stringify(mergedData));
