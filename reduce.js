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

// 读取数据文件
const data = JSON.parse(fs.readFileSync('/Users/yanlee/PycharmProjects/test-fiapp/blackbox/result/spot/20230708_134050/net.json'));

// 调用函数合并数据
const mergedData = mergeDataByMonth(data);

// 将合并后的数据保存到输出文件
fs.writeFileSync('src/assets/net.json', JSON.stringify(mergedData));
