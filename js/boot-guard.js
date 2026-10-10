window.addEventListener('load', function () {
  setTimeout(function () {
    var root = document.getElementById('root');
    if (root && root.children.length === 0) {
      var msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;inset:0;z-index:999;background:#0A0A0A;color:#F5F5F0;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;font-size:14px;line-height:1.7;letter-spacing:0.05em;';
      msg.innerHTML = 'PAGE FAILED TO RENDER<br><span style="color:#929292;font-size:12px;">React/Babel not loaded from CDN, or a script error occurred.<br>Check your internet connection and open the browser console (F12) for details.</span>';
      document.body.appendChild(msg);
    }
  }, 2000);
});