import gsap from "gsap";

/** Pause the code for a certain amount of time, in seconds */
export function waitFor(delayInSecs = 1): Promise<void> {
  return new Promise((resolve) => {
    gsap.delayedCall(delayInSecs, () => resolve());
  });
}
