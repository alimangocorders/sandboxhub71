import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  lazy,
  memo,
} from "react";

// ─────────────────────────────────────────────────────────────
// ABOVE-THE-FOLD — always in the initial bundle
// ─────────────────────────────────────────────────────────────
import Nav          from "./components/Nav";
import Hero         from "./components/Hero";
import ImpactReport from "./components/ImpactReport";
import LeadSlider   from "./components/LeadSlider";

// ─────────────────────────────────────────────────────────────
// BELOW-THE-FOLD — each is its own JS chunk, loaded on demand
// ─────────────────────────────────────────────────────────────
const ImpactSection     = lazy(() => import("./components/ImpactSection"));
const BusinessSection   = lazy(() => import("./components/BusinessSection"));
const HubSection        = lazy(() => import("./components/HubSection"));
const DeliveringImpact  = lazy(() => import("./components/DeliveringImpact"));
const ProgressSection   = lazy(() => import("./components/ProgressSection"));
const Sectors           = lazy(() => import("./components/Sectors"));
const Programs          = lazy(() => import("./components/programs"));
const GrowthSection     = lazy(() => import("./components/GrowthSection"));
const GatewaySection    = lazy(() => import("./components/GatewaySection"));
const CollabSection     = lazy(() => import("./components/CollabSection"));
const EmpowerSection    = lazy(() => import("./components/EmpowerSection"));
const KnowledgeBuilding = lazy(() => import("./components/KnowledgeBuilding"));
const Footer            = lazy(() => import("./components/Footer"));

// ─────────────────────────────────────────────────────────────
// DEBOUNCED SCROLL-TRIGGER REFRESH
// Coalesces all refresh calls within one animation frame into
// a single reflow instead of one per section mount.
// ─────────────────────────────────────────────────────────────
let _refreshRaf = null;

const debouncedRefresh = (ScrollTrigger) => {
  if (_refreshRaf) cancelAnimationFrame(_refreshRaf);
  _refreshRaf = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    _refreshRaf = null;
  });
};

// ─────────────────────────────────────────────────────────────
// INTERSECTION-BASED LAZY SECTION
//
// HOW IT WORKS:
//   1. On mount, only a lightweight placeholder div is rendered
//      (correct height, zero JS cost).
//   2. An IntersectionObserver watches the placeholder.
//   3. When the placeholder is rootMargin away from the viewport
//      (300 px ahead by default), `triggered` flips to true.
//   4. React.lazy() + Suspense then render the real component.
//   5. The observer disconnects immediately after triggering —
//      no ongoing CPU cost.
//
// RESULT:
//   • Only the first 3 sections below the fold load on page load
//     (because they are already within 300 px of the viewport).
//   • Every subsequent section loads only as the user scrolls
//     toward it — never before.
// ─────────────────────────────────────────────────────────────
const LazySection = memo(({ children, height = "min-h-[60vh]", rootMargin = "300px" }) => {
  const [triggered, setTriggered] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    // If IntersectionObserver isn't supported (very old browsers),
    // just load everything immediately as a safe fallback.
    if (!("IntersectionObserver" in window)) {
      setTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect(); // fire once, then stop watching
        }
      },
      {
        // Start loading this many pixels before the section
        // enters the viewport so there's no visible pop-in.
        rootMargin,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin]);

  // After triggering, also refresh ScrollTrigger so pins
  // recalculate now that real content has replaced the placeholder.
  useEffect(() => {
    if (!triggered) return;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      debouncedRefresh(ScrollTrigger);
    });
  }, [triggered]);

  // ── NOT YET TRIGGERED: render a correctly-sized placeholder ──
  // The placeholder height should match the section's approximate
  // height so the page layout (and scroll positions) remain stable.
  if (!triggered) {
    return (
      <div
        ref={placeholderRef}
        className={`w-full ${height} bg-[#14151d]`}
        aria-hidden="true"
      />
    );
  }

  // ── TRIGGERED: render the real component via Suspense ──
  // The placeholder ref is no longer needed; Suspense takes over.
  return (
    <Suspense
      fallback={
        <div className={`w-full ${height} bg-[#14151d] opacity-0`} />
      }
    >
      {children}
    </Suspense>
  );
});

LazySection.displayName = "LazySection";

// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
const App = () => {
  useEffect(() => {
    let scrollTriggerRef = null;

    // GSAP + ScrollTrigger load dynamically after first paint —
    // completely absent from the initial JS bundle.
    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.defaults({
          ignoreMobileResize: true,
          preventOverlaps: true,
        });
        // normalizeScroll() removed — it fired on every scroll event
        // and added ~300-400 ms to main-thread work.

        scrollTriggerRef = ScrollTrigger;
        debouncedRefresh(ScrollTrigger);
      });
    });

    const handleLoad = () => {
      if (scrollTriggerRef) debouncedRefresh(scrollTriggerRef);
    };

    window.addEventListener("load", handleLoad);

    const ro = new ResizeObserver(() => {
      if (scrollTriggerRef) debouncedRefresh(scrollTriggerRef);
    });

    if (document.body) ro.observe(document.body);

    return () => {
      window.removeEventListener("load", handleLoad);
      ro.disconnect();
      if (_refreshRaf) cancelAnimationFrame(_refreshRaf);
    };
  }, []);

  return (
    <div className="bg-[#14151d] min-h-screen text-white antialiased selection:bg-[#00b0f5]/30">

      {/* ── ABOVE THE FOLD — rendered immediately, no lazy loading ── */}
      <Nav />
      <Hero />
      <ImpactReport />
      <LeadSlider />

      {/* ── BELOW THE FOLD — intersection-triggered lazy loading ──
          rootMargin="300px"  → starts loading 300 px before viewport
          Sections far down the page use a smaller rootMargin so they
          load even later, reducing unnecessary early network requests.
      ── */}

      {/* First 3 below-fold sections — load close to viewport */}
      <LazySection height="min-h-[80vh]" rootMargin="300px">
        <ImpactSection />
      </LazySection>

      <LazySection height="min-h-[70vh]" rootMargin="300px">
        <BusinessSection />
      </LazySection>

      <LazySection height="min-h-[100vh]" rootMargin="300px">
        <HubSection />
      </LazySection>

      {/* Mid-page sections — load 200 px before viewport */}
      <LazySection height="min-h-[60vh]" rootMargin="200px">
        <DeliveringImpact />
      </LazySection>

      <LazySection height="min-h-[100vh]" rootMargin="200px">
        <ProgressSection />
      </LazySection>

      <LazySection height="min-h-[80vh]" rootMargin="200px">
        <Sectors />
      </LazySection>

      <LazySection height="min-h-[90vh]" rootMargin="200px">
        <Programs />
      </LazySection>

      {/* Bottom sections — load 150 px before viewport */}
      <LazySection height="min-h-[70vh]" rootMargin="150px">
        <GrowthSection />
      </LazySection>

      <LazySection height="min-h-[85vh]" rootMargin="150px">
        <GatewaySection />
      </LazySection>

      <LazySection height="min-h-[65vh]" rootMargin="150px">
        <CollabSection />
      </LazySection>

      <LazySection height="min-h-[75vh]" rootMargin="150px">
        <EmpowerSection />
      </LazySection>

      <LazySection height="min-h-[80vh]" rootMargin="150px">
        <KnowledgeBuilding />
      </LazySection>

      <LazySection height="min-h-[40vh]" rootMargin="150px">
        <Footer />
      </LazySection>

    </div>
  );
};

export default App;