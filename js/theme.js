/* Light/dark switch.
 *
 * Loaded synchronously in <head> so the stored choice is applied before the
 * first paint; a deferred script would let the light palette flash first.
 * With no stored choice the page follows the system setting, which site.css
 * handles on its own, so nothing is written to the root element.
 */
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  if (stored === "light" || stored === "dark") root.dataset.theme = stored;

  function systemPrefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function current() {
    return root.dataset.theme || (systemPrefersDark() ? "dark" : "light");
  }

  /* Drawn with currentColor so the icon follows the palette. The sun shows
     while dark mode is on, i.e. each icon is the mode the click leads to. */
  var SUN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"' +
    ' stroke-linecap="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="4.2"/>' +
    '<path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2' +
    'M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"/></svg>';

  var MOON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"' +
    ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z"/></svg>';

  function label(button) {
    var dark = current() === "dark";
    button.innerHTML = dark ? SUN : MOON;
    button.setAttribute("aria-label", "Switch to " + (dark ? "light" : "dark") + " mode");
    button.setAttribute("title", "Switch to " + (dark ? "light" : "dark") + " mode");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var nav = document.querySelector(".topbar nav");
    if (!nav) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "theme-toggle";
    label(button);

    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) { /* private mode */ }
      label(button);
    });

    nav.parentNode.insertBefore(button, nav.nextSibling);
  });
})();
