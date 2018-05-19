window.onload = () => {

  setTimeout(hideFlash, 6000);
  addSpinner('new-deck-form');
  addSpinner('corrections-form')

};

function hideFlash() {
  const flash = document.querySelector('.banner');
  hide(flash);
}

function addSpinner(formId) {
  getSubmitBtn(formId).addEventListener('click', showSpinner(formId));
}

function showSpinner(formId) {
  return () => {
    const form = document.getElementById(formId);
    hide(form);

    const formContainer = getContainer(formId);

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');


    formContainer.appendChild(spinner);
  };
}

function hide(element) {
  if (element) element.style.display = 'none';
}

function getSubmitBtn(formId) {
  const submitBtnId = formId.replace('form', 'submit');
  return document.getElementById(submitBtnId);
}

function getContainer(formId) {
  const containerId = formId.replace('form', 'container');
  return document.getElementById(containerId);
}