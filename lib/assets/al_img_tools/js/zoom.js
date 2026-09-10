document.addEventListener("DOMContentLoaded", () => {
  if (typeof mediumZoom !== "function") {
    return;
  }

  const getZoomContainer = () => {
    const viewportHeight = document.documentElement.clientHeight;
    const navbar = document.querySelector("#navbar.fixed-top");
    const footer = document.querySelector("footer.fixed-bottom");

    return {
      width: document.documentElement.clientWidth,
      height: viewportHeight,
      left: 0,
      right: 0,
      top: navbar ? Math.max(0, navbar.getBoundingClientRect().bottom) : 0,
      bottom: footer ? Math.max(0, viewportHeight - footer.getBoundingClientRect().top) : 0,
    };
  };

  const medium_zoom = mediumZoom("[data-zoomable]", {
    margin: 24,
    container: getZoomContainer(),
    // Append alpha to theme background color to keep content visible under zoom.
    background: `${getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color")}ee`,
  });

  window.addEventListener("resize", () => {
    medium_zoom.update({ container: getZoomContainer() });
  });
});
