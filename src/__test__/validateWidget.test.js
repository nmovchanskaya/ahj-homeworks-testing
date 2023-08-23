import ValidateWidget from '../components/validateWidget';

// test validate card number
test('invalid card number', () => {
  expect(ValidateWidget.validate('1234')).toBe(false);
});

test('valid card number', () => {
  expect(ValidateWidget.validate('2222333322221111')).toBe(true);
});

// test card type
test.each([
  ['4444123412341234', 'visa'],
  ['5252123412341234', 'mastercard'],
  ['2221101012341234', 'mastercard'],
  ['2121123412341234', 'mir'],
  ['123412341234', 'other'],
])(
  ('test card type'),
  (cardNum, expected) => {
    expect(ValidateWidget.defineSystem(cardNum)).toBe(expected);
  },
);
