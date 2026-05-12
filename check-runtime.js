import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', {
  url: "http://localhost",
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

dom.window.onerror = function(message, source, lineno, colno, error) {
  console.log("RUNTIME ERROR:", message);
};

console.log("Runtime check environment initialized.");
