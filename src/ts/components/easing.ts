export default {
  linear(t: number) {
    return t;
  },
  easeInQuad(t: number) {
    return t * t;
  },
  easeOutQuad(t: number) {
    return t * (2 - t);
  },
  easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  easeInCubic(t: number) {
    return t * t * t;
  },
  easeOutCubic(t: number) {
    const tm = t - 1;
    return tm * tm * tm + 1;
  },
  easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  easeInQuart(t: number) {
    return t * t * t * t;
  },
  easeOutQuart(t: number) {
    const tm = t - 1;
    return 1 - tm * tm * tm * tm;
  },
  easeInOutQuart(t: number) {
    const tm = t - 1;
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * tm * tm * tm * tm;
  },
  easeInQuint(t: number) {
    return t * t * t * t * t;
  },
  easeOutQuint(t: number) {
    const tm = t - 1;
    return 1 + tm * tm * tm * tm * tm;
  },
  easeInOutQuint(t: number) {
    const tm = t - 1;
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * tm * tm * tm * tm * tm;
  },
};
