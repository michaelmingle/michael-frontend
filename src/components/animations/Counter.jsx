import { useRef } from "react";
import { useInView } from "framer-motion";
import * as CountUpModule from "react-countup";

// react-countup's CJS build gets pre-bundled by Vite in a way that leaves
// the whole exports object as the default export in some environments —
// unwrap defensively rather than assuming the shape.
const CountUp = CountUpModule.default?.default ?? CountUpModule.default;

export function Counter({ value, suffix = "", prefix = "", duration = 2.2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp end={value} duration={duration} prefix={prefix} suffix={suffix} separator="," />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}
