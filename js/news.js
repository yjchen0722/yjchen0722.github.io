/* Scrollable News list.
 *
 * Adds the up/down buttons beside .news-scroll and keeps their state, plus the
 * bottom fade site.css draws, in step with the scroll position. Built here
 * rather than in the markup so a reader without scripts gets a plain
 * scrollable list instead of two controls that do nothing.
 */
(function () {
  /* Drawn with currentColor so they follow the palette, matching theme.js. */
  function chevron(up) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"' +
      ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' +
      (up ? "M5 15l7-7 7 7" : "M5 9l7 7 7-7") +
      '"/></svg>'
    );
  }

  function button(up) {
    var b = document.createElement("button");
    b.type = "button";
    b.innerHTML = chevron(up);
    b.setAttribute("aria-label", up ? "Scroll news up" : "Scroll news down");
    b.setAttribute("title", up ? "Older entries are below" : "Show more news");
    return b;
  }

  /* One click moves two rows: enough to feel like progress, little enough that
     the reader keeps their place in the list. */
  function step(box) {
    var row = box.querySelector(".svc-list li");
    return (row ? row.offsetHeight : 36) * 2;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var boxes = document.querySelectorAll(".news-box");

    Array.prototype.forEach.call(boxes, function (wrap) {
      var box = wrap.querySelector(".news-scroll");
      if (!box) return;

      var up = button(true);
      var down = button(false);
      var nav = document.createElement("div");
      nav.className = "news-nav";
      nav.appendChild(up);
      nav.appendChild(down);
      wrap.appendChild(nav);

      function sync() {
        /* A one-pixel tolerance: fractional scroll heights on zoomed or
           high-DPI displays keep the sum just short of the full height. */
        var atTop = box.scrollTop <= 1;
        var atEnd = box.scrollTop + box.clientHeight >= box.scrollHeight - 1;
        up.disabled = atTop;
        down.disabled = atEnd;
        box.classList.toggle("at-end", atEnd);
        /* With few enough entries to fit, the buttons have nothing to do. */
        nav.hidden = atTop && atEnd;
      }

      up.addEventListener("click", function () {
        box.scrollBy({ top: -step(box), behavior: "smooth" });
      });
      down.addEventListener("click", function () {
        box.scrollBy({ top: step(box), behavior: "smooth" });
      });

      box.addEventListener("scroll", sync, { passive: true });

      /* The fold moves when the column reflows, e.g. on rotation or when a
         long entry wraps onto another line. */
      if (window.ResizeObserver) {
        new ResizeObserver(sync).observe(box);
      } else {
        window.addEventListener("resize", sync);
      }

      sync();
    });
  });
})();
