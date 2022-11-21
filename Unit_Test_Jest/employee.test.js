const employee = require('./employee');

// 明確描述測試的目標：'拿 200 元買套餐，預期會找 73 元'
test('拿 200 元買套餐，預期會找 73 元', () => {
  const bill = 200;  // 小明手中的鈔票
  const price = 127; // 餐點的價格

  // 找錢結果符合預期的
  expect(employee.makeChange(bill, price)).toBe(73);
});

test('拿 100 元買套餐，預期報錯誤', () => {
  const bill = 100;  // 小明手中的鈔票
  const price = 127; // 餐點的價格

  // 結果符合預期
  expect(employee.makeChange(bill, price)).toBe('錢不足');
});