export default class ValidateWidget {
  constructor(parentElem) {
    this.parentElem = parentElem;
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  static get buttonSelector() {
    return '.button';
  }

  static get inputSelector() {
    return '.input';
  }

  static get messageSelector() {
    return '.message';
  }

  static get markup() {
    return `
    <form class = "form__validate">
        <div class = "div__imgs">
            <div class = "inactive">
                <div class = "visa div__imgs_img"></div>
            </div>
            <div class = "inactive">
              <div class = "mastercard div__imgs_img"></div>
            </div>
            <div class = "inactive">
              <div class = "mir div__imgs_img"></div>
            </div>
        </div>
        <input type = "text" class = "input">
        <input type = "submit" value = "Click to Validate" class = "button">
        <div class = "message"></div>
    </form>
    `;
  }

  bindToDOM() {
    this.parentElem.innerHTML = ValidateWidget.markup;

    this.input = document.querySelector(ValidateWidget.inputSelector);
    this.button = document.querySelector(ValidateWidget.buttonSelector);
    this.message = document.querySelector(ValidateWidget.messageSelector);

    this.input.addEventListener('input', this.onInput);
    this.button.addEventListener('click', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    const valid = ValidateWidget.validate(this.input.value);
    if (!valid) {
      this.message.textContent = 'Invalid card number';
    } else {
      const system = ValidateWidget.defineSystem(this.input.value);
      this.clearSystemImg();
      this.setSystemImg(system);
    }
  }

  onInput(e) {
    this.message.textContent = '';
  }

  static validate(cardNum) {
    if (cardNum.length === 16) {
      return true;
    }
    return false;
  }

  static defineSystem(cardNum) {
    if (cardNum[0] === '4') {
      return 'visa';
    }
    if (
      cardNum.substring(0, 2) === '51'
        || cardNum.substring(0, 2) === '52'
        || cardNum.substring(0, 2) === '53'
        || cardNum.substring(0, 2) === '54'
        || cardNum.substring(0, 2) === '55'
        || (Number(cardNum.substring(0, 6)) >= 222100
        && Number(cardNum.substring(0, 6)) <= 272099)
    ) {
      return 'mastercard';
    }
    if (cardNum[0] === '2') {
      return 'mir';
    }

    return 'other';
  }

  clearSystemImg() {
    const imgs = Array.from(document.querySelectorAll('.div__imgs_img'));
    imgs.forEach((item) => {
      if (item.parentElement.classList.contains('active')) {
        item.parentElement.classList.add('inactive');
        item.parentElement.classList.remove('active');
      }
    });
  }

  setSystemImg(system) {
    if (system !== 'other') {
      const elem = document.querySelector(`.${system}`);
      if (elem) {
        elem.parentElement.classList.remove('inactive');
        elem.parentElement.classList.add('active');
      }
    }
  }
}
