/* Kayden Khoo Portfolio — scripts.
   1. "More projects" cards, built from window.PROJECTS (js/projects.js).
   2. GitHub links, filled in from window.GITHUB_LINKS (js/projects.js).
   3. Video lightbox: any element with data-video="path/to/video.mp4" opens it
      (optional data-video-title="..." labels it for screen readers).
   4. Achievements carousel. */
(function () {
  const grid = document.querySelector('[data-projects]');
  if (!grid || !Array.isArray(window.PROJECTS) || !window.PROJECTS.length) return;
  // Show the section and its nav link only when there is something in it.
  document.getElementById('projects').hidden = false;
  const navLink = document.querySelector('.nav-link[href="#projects"]');
  if (navLink) navLink.hidden = false;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const ARROW = ['M7 17L17 7', 'M8 7h9v9'];
  const PLAY = 'M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z';
  const GITHUB = 'M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 2.5-.35c.85 0 1.71.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .28.18.6.69.49A10.11 10.11 0 0 0 22 12.25C22 6.58 17.52 2 12 2z';

  // Same inline icons as the hand-written cards in index.html.
  function icon(paths, size, filled) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('aria-hidden', 'true');
    if (filled) {
      svg.setAttribute('fill', 'currentColor');
    } else {
      svg.setAttribute('fill', 'none');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('stroke-width', '2');
      svg.setAttribute('stroke-linecap', 'round');
      svg.setAttribute('stroke-linejoin', 'round');
    }
    [].concat(paths).forEach(function (d) {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    });
    return svg;
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function videoTrigger(node, project) {
    node.setAttribute('data-video', project.video);
    node.setAttribute('data-video-title', project.name + ' demo');
    return node;
  }

  window.PROJECTS.forEach(function (project) {
    const card = el('article', 'mini-card');

    if (project.image) {
      const media = el('div', 'media-mini');
      const img = el('img', 'media-img');
      img.src = project.image;
      img.alt = project.name + ' screenshot';
      img.loading = 'lazy';
      media.appendChild(img);
      if (project.video) {
        const cover = videoTrigger(el('button', 'demo-cover'), project);
        cover.type = 'button';
        const pill = el('span', 'demo-play');
        pill.appendChild(icon(PLAY, 15, true));
        pill.appendChild(document.createTextNode('Watch demo'));
        cover.appendChild(pill);
        media.appendChild(cover);
      }
      card.appendChild(media);
    }

    card.appendChild(el('h3', 'mini-name', project.name));
    card.appendChild(el('p', 'project-desc', project.description));

    const tags = el('div', 'tags');
    (project.tags || []).forEach(function (t) { tags.appendChild(el('span', 'tag', t)); });
    card.appendChild(tags);

    // Link row: only the links that exist ("·" separators come from CSS).
    const row = el('div', 'project-links');
    if (project.video) {
      const b = videoTrigger(el('button', 'project-link project-link--button', 'Watch demo'), project);
      b.type = 'button';
      b.appendChild(icon(PLAY, 14, true));
      row.appendChild(b);
    }
    const links = project.links || {};
    if (links.demo) {
      const a = el('a', 'project-link', 'Live Demo');
      a.href = links.demo;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', project.name + ' live demo (opens in a new tab)');
      a.appendChild(icon(ARROW, 14, false));
      row.appendChild(a);
    }
    if (project.id) {
      // URL is filled in from GITHUB_LINKS by the GitHub block below.
      const gh = el('a', 'project-link');
      gh.href = '#';
      gh.setAttribute('data-github', project.id);
      gh.setAttribute('aria-label', project.name + ' on GitHub');
      gh.appendChild(icon(GITHUB, 14, true));
      gh.appendChild(document.createTextNode('GitHub'));
      gh.appendChild(icon(ARROW, 14, false));
      row.appendChild(gh);
    }
    if (row.children.length) card.appendChild(row);

    grid.appendChild(card);
  });
})();

/* GitHub links: every element with data-github="<key>" gets its URL from
   window.GITHUB_LINKS (js/projects.js). Keys still set to '#' are placeholders:
   shown or hidden by window.SHOW_GITHUB_PLACEHOLDERS, and inert when clicked. */
(function () {
  const urls = window.GITHUB_LINKS || {};
  const showPlaceholders = window.SHOW_GITHUB_PLACEHOLDERS !== false;
  document.querySelectorAll('[data-github]').forEach(function (link) {
    const url = urls[link.getAttribute('data-github')];
    const label = link.getAttribute('aria-label');
    if (url && url !== '#') {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      if (label) link.setAttribute('aria-label', label + ' (opens in a new tab)');
      link.hidden = false;
    } else {
      link.href = '#';
      link.removeAttribute('target');
      link.setAttribute('aria-disabled', 'true');
      if (label) link.setAttribute('aria-label', label + ' (coming soon)');
      link.hidden = !showPlaceholders;
    }
  });
  // A placeholder does nothing when clicked, instead of jumping to the top of the page.
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-github][aria-disabled="true"]')) e.preventDefault();
  });
})();

(function () {
  const dialog = document.querySelector('.lightbox');
  if (!dialog) return;
  const video = dialog.querySelector('.lightbox-video');
  let opener = null;

  function open(src, title, trigger) {
    opener = trigger;
    dialog.setAttribute('aria-label', title || 'Project demo video');
    video.src = src; // only now does the browser start loading the file
    document.documentElement.classList.add('lightbox-open');
    dialog.showModal();
    video.play().catch(function () { /* muted autoplay can still be blocked; controls stay available */ });
  }

  function close() {
    if (dialog.open) dialog.close();
  }

  // Runs for every way of closing: close button, overlay click, Esc.
  dialog.addEventListener('close', function () {
    video.pause();
    video.removeAttribute('src');
    video.load(); // stops any download still in progress
    document.documentElement.classList.remove('lightbox-open');
    if (opener) opener.focus();
    opener = null;
  });

  // The dialog fills the screen; a click on it (not on the video or button) is a click on the overlay.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) close();
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', close);

  // Delegated, so it also works for cards added later (e.g. from js/projects.js).
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-video]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.getAttribute('data-video'), trigger.getAttribute('data-video-title'), trigger);
  });
})();

/* Achievements carousel: copies the cards so the CSS drift (transform) loops seamlessly.
   Add an achievement by adding one <article> to .carousel-track in index.html. */
(function () {
  const root = document.querySelector('[data-carousel]');
  if (!root) return;
  const viewport = root.querySelector('.carousel-viewport');
  const track = root.querySelector('.carousel-track');
  const originals = Array.from(track.children);
  const arrows = document.querySelector('.carousel-arrows');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const SPEED = 18; // px per second: about 45s per loop for three cards
  let period = 0;   // width of one full set of cards, including the gap after it
  let resumeTimer = 0;
  let lastWidth = 0;

  function appendCopy() {
    originals.forEach(function (card) {
      const copy = card.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true'); // not read twice by screen readers
      copy.inert = true;                         // and not reachable with Tab
      copy.removeAttribute('tabindex');
      copy.setAttribute('data-clone', '');
      track.appendChild(copy);
    });
  }

  function build() {
    track.querySelectorAll('[data-clone]').forEach(function (n) { n.remove(); });
    root.classList.remove('is-looping');
    period = 0;
    lastWidth = viewport.clientWidth;
    if (arrows) arrows.hidden = false;
    if (reduceMotion.matches || !originals.length) {
      viewport.scrollLeft = 0; // plain scrollable row
      if (arrows) arrows.hidden = viewport.scrollWidth <= viewport.clientWidth; // nothing to scroll to
      return;
    }
    appendCopy();
    period = track.children[originals.length].offsetLeft - originals[0].offsetLeft;
    // The drift moves one set to the right while the scroll position stays within
    // [period, 2 * period), so the track needs 3 sets plus one screen of cards.
    const sets = Math.ceil(3 + viewport.clientWidth / period);
    for (let i = 2; i < sets; i++) appendCopy();
    track.style.setProperty('--drift-distance', period + 'px');
    track.style.setProperty('--drift-duration', (period / SPEED) + 's');
    root.classList.add('is-looping');
    viewport.scrollLeft = period;
  }

  // Keep manual scrolling (swipe, trackpad, arrows) endless by jumping one identical set.
  function wrap() {
    if (!period) return;
    if (viewport.scrollLeft < period) viewport.scrollLeft += period;
    else if (viewport.scrollLeft >= 2 * period) viewport.scrollLeft -= period;
  }
  if ('onscrollend' in window) {
    viewport.addEventListener('scrollend', wrap);
  } else {
    let t = 0;
    viewport.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(wrap, 150); });
  }

  function pauseFor(ms) {
    root.classList.add('is-paused');
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(function () { root.classList.remove('is-paused'); }, ms);
  }
  // Touch pauses while the finger is down and for a moment after (hover and focus are handled in CSS).
  root.addEventListener('touchstart', function () {
    root.classList.add('is-paused');
    clearTimeout(resumeTimer);
  }, { passive: true });
  root.addEventListener('touchend', function () { pauseFor(3000); }, { passive: true });

  document.querySelectorAll('[data-carousel-dir]').forEach(function (button) {
    button.addEventListener('click', function () {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = originals[0].getBoundingClientRect().width + gap;
      viewport.scrollBy({ left: Number(button.getAttribute('data-carousel-dir')) * step, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      pauseFor(4000);
    });
  });

  let resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (viewport.clientWidth !== lastWidth) build(); // ignore height-only changes (mobile URL bar)
    }, 200);
  });
  reduceMotion.addEventListener('change', build);
  build();
})();
