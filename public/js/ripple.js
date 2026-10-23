(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const TRANSITION_CLASS = 'ripple-transitioning';
  const OVERLAY_CLASS = 'ripple-transition';
  let navigationTimer = null;
  let activeOverlay = null;
  let navigating = false;

  // Back/forward navigation can restore this document from the browser's
  // back-forward cache. Always clear transient transition state on restore;
  // otherwise the completed ripple can remain over the page indefinitely.
  function clearTransition() {
    if (navigationTimer !== null) {
      window.clearTimeout(navigationTimer);
      navigationTimer = null;
    }
    activeOverlay?.remove();
    activeOverlay = null;
    document.documentElement.classList.remove(TRANSITION_CLASS);
    navigating = false;
  }

  window.addEventListener('pageshow', clearTransition);
  window.addEventListener('pagehide', () => {
    // Don't leave a fixed overlay behind if the browser preserves this page.
    // The next pageshow also performs a defensive cleanup.
    if (activeOverlay) activeOverlay.style.visibility = 'hidden';
  });
  window.addEventListener('popstate', clearTransition);
  reducedMotion.addEventListener?.('change', clearTransition);

  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element
      ? event.target.closest('a[data-ripple-link]')
      : null;

    if (
      !link || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      link.target === '_blank' || link.hasAttribute('download')
    ) return;

    const destination = new URL(link.href, window.location.href);
    if (destination.origin !== window.location.origin) return;
    if (destination.href === window.location.href) return;
    if (reducedMotion.matches) return; // Native navigation, no animation.

    // Ignore a repeated click while the first transition is in flight, but
    // never leave a stale lock behind if animation events are skipped.
    if (navigating) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    navigating = true;
    document.documentElement.classList.add(TRANSITION_CLASS);

    const overlay = document.createElement('div');
    overlay.className = OVERLAY_CLASS;
    overlay.setAttribute('aria-hidden', 'true');
    const x = Number.isFinite(event.clientX) && event.clientX > 0
      ? event.clientX : window.innerWidth / 2;
    const y = Number.isFinite(event.clientY) && event.clientY > 0
      ? event.clientY : window.innerHeight / 2;
    overlay.style.setProperty('--ripple-x', `${x}px`);
    overlay.style.setProperty('--ripple-y', `${y}px`);
    document.body.append(overlay);
    activeOverlay = overlay;

    let hasNavigated = false;
    const navigate = () => {
      if (hasNavigated) return;
      hasNavigated = true;
      if (navigationTimer !== null) {
        window.clearTimeout(navigationTimer);
        navigationTimer = null;
      }
      // The destination URL is real and shareable; the ripple is only a
      // decorative transition and must never be required for navigation.
      window.location.assign(destination.href);
    };

    overlay.addEventListener('animationend', navigate, { once: true });
    // Fallback for reduced rendering, background tabs, or browsers that skip
    // animationend. Keep this slightly longer than the CSS animation.
    navigationTimer = window.setTimeout(navigate, 650);
  });
})();
