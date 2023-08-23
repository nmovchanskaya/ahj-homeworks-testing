import ValidateWidget from './components/validateWidget';

const container = document.querySelector('.container');
const validateWidget = new ValidateWidget(container);
validateWidget.bindToDOM();
