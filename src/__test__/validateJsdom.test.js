/**
 * @jest-environment jsdom
*/

import ValidateWidget from '../components/validateWidget';

test.each([
  ['4444123412341234', '.visa'],
  ['5252123412341234', '.mastercard'],
  ['2121123412341234', '.mir'],
])(
  ('test different types of cards'),
  (cardNum, cardType) => {
    document.body.innerHTML = '<div class="container"></div>';

    const container = document.querySelector('.container');
    const widget = new ValidateWidget(container);
    widget.bindToDOM();
    const cardElem = container.querySelector(cardType);

    widget.input.value = cardNum;
    widget.button.click();

    expect(cardElem.parentElement.classList.contains('active')).toBe(true);
  },
);

test('invalid number', () => {
  document.body.innerHTML = '<div class="container"></div>';

  const container = document.querySelector('.container');
  const widget = new ValidateWidget(container);
  widget.bindToDOM();

  widget.input.value = '1234';
  widget.button.click();

  expect(widget.message.textContent).toBe('Invalid card number');
});
