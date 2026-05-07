const { JSDOM } = require('jsdom');
JSDOM.fromURL("http://localhost:5000", { runScripts: "dangerously", resources: "usable" }).then(dom => {
  dom.window.onerror = function(message, source, lineno, colno, error) {
    console.log("RUNTIME ERROR:", message);
  };
  setTimeout(() => {
    console.log("ROOT CONTENT LENGTH:", dom.window.document.getElementById('root').innerHTML.length);
    console.log("ROOT HTML (start):", dom.window.document.getElementById('root').innerHTML.substring(0, 500));
  }, 5000);
});
