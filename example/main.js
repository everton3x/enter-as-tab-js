import enterastab from "enter-as-tab-js";

const elements1 = document.getElementById('myform1').querySelectorAll('[data-east]');
enterastab(elements1).init();

const elements2 = document.getElementById('myform2').querySelectorAll('[data-east]');
enterastab(elements2).useTabIndex(true).init();

const elements3 = document.getElementById('myform3').querySelectorAll('[data-east]');
enterastab(elements3).autoDetectAction(false).init();

const elements4 = document.getElementById('myform4').querySelectorAll('[data-east]');
enterastab(elements4).cyclic(true).init();

const elements5 = document.getElementById('myform5').querySelectorAll('[data-east]');
enterastab(elements5).textAreaStrategy('new line').init();

const elements6 = document.getElementById('myform6').querySelectorAll('[data-east]');
enterastab(elements6).textAreaStrategy('ctrl+enter').init();