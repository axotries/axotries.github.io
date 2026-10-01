// Axo Vault: copy buttons for the setup commands.
document.addEventListener('click', function (e) {
  var btn = e.target.closest('.copy');
  if (!btn) return;
  var code = btn.parentElement.querySelector('code');
  function done(ok) {
    btn.textContent = ok ? 'Copied!' : 'Selected';
    btn.classList.toggle('done', ok);
    setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('done'); }, 1600);
  }
  function fallback() {   // in-app browsers without the async clipboard API
    var range = document.createRange();
    range.selectNodeContents(code);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    done(ok);
  }
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code.textContent).then(function () { done(true); }, fallback);
  } else {
    fallback();
  }
});
