import '../scss/main.scss';

(function () {
  if (typeof (NodeList as any).prototype.forEach !== 'function') {
    (NodeList as any).prototype.forEach = Array.prototype.forEach;
  }

  return false;
})();

const onLoad = (e: Event) => {
  inits();
  onResize(e);
};

const onResize = (e: Event) => {
  onScroll(e);
};

const onScroll = (e: Event) => {
  console.log('bliot');
};

const inits = () => {};

window.addEventListener('load', onLoad);
window.addEventListener('resize', onResize);
window.addEventListener('scroll', onScroll);
