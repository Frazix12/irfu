"use client";

import { useEffect, useState } from "react";
import { UnicornScene } from "unicornstudio-react";

function CubeFallback() {
  return (
    <div className="cube-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export function CubeUnicorn() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const canvas = document.createElement("canvas");
      const hasWebGL = Boolean(
        canvas.getContext("webgl2") || canvas.getContext("webgl"),
      );
      setCanRender(hasWebGL && !reducedMotion.matches);
    };

    update();
    reducedMotion.addEventListener("change", update);
    return () => reducedMotion.removeEventListener("change", update);
  }, []);

  return (
    <div
      className="cube-stage"
      role="img"
      aria-label="Interactive three-dimensional cube"
    >
      {canRender ? (
        <UnicornScene
          jsonFilePath="/unicorn/cube-unicorn.json"
          sdkUrl="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.5/dist/unicornStudio.umd.js"
          width="100%"
          height="100%"
          lazyLoad
          ariaLabel="Interactive three-dimensional cube"
          placeholder={<CubeFallback />}
          showPlaceholderOnError
          showPlaceholderWhileLoading
          onError={() => setCanRender(false)}
        />
      ) : (
        <CubeFallback />
      )}
    </div>
  );
}
