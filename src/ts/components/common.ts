import { ISize, IObject } from '../interfaces/interfaces';
import easing from './easing';

const defSize: ISize = {
  width: 0,
  height: 0
};

function transitionEvent(): string {
  const el: HTMLElement = document.createElement('fakeelement');
  const transitions: IObject = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd',
  };

  let transition: string = '';

  Object.keys(transitions).forEach((t: any) => {
    if (el.style[t] !== undefined) {
      transition = transitions[t];
    }
  });

  return transition;
}

function animationEvent(): string {
  const el: HTMLElement = document.createElement('fakeelement');
  const animations: IObject = {
    animation: 'animationend',
    OAnimation: 'oAnimationEnd',
    MozAnimation: 'animationend',
    WebkitAnimation: 'webkitAnimationEnd',
  };

  let animation: string = '';

  Object.keys(animations).forEach((a: any) => {
    if (el.style[a] !== undefined) {
      animation = animations[a];
    }
  });

  return animation;
}

export const tranEv: string = transitionEvent();
export const animEv: string = animationEvent();
export const isIE: boolean = navigator.userAgent.indexOf('MSIE') !== -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
export const isMS: boolean = isIE || navigator.userAgent.indexOf('Edge') !== -1;
export const isMobile: boolean = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|CriOS/i.test(navigator.userAgent);
export const isIOS: boolean = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
export const isSafari: boolean = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
export const isAndroid: boolean = navigator.userAgent.toLowerCase().indexOf('android') > -1;
export const unibody: Node = document.documentElement || document.body.parentNode || document.body;

export function scrollTo(where: number, timing: number = 500, element: any = unibody) {
  const header: HTMLElement | null = document.querySelector('header, .header');
  const newTop: number = where - (header ? header.offsetHeight : 0);
  const currentTop: number = element.scrollTop;
  const change: number = newTop - currentTop;
  const increment: number = timing / 60;

  let currentTime: number = 0;

  const animateScroll = () => {
    currentTime += increment;
    const currentChange: number = change * (currentTime / timing);
    const percent: number = easing.easeInOutQuint(currentChange / change);
    element.scrollTop = currentTop + change * percent;

    if (currentTime < timing) {
      setTimeout(animateScroll, increment);
    } else {
      element.scrollTop = newTop;
    }
  };

  animateScroll();
}

export function triggerChange(input: HTMLInputElement): boolean {
  let evt: any;

  if (input.getAttribute('min') || input.getAttribute('max')) {
    if (parseFloat(input.getAttribute('min')) > parseFloat(input.value)) {
      input.value = input.getAttribute('min');
      triggerChange(input);
      return false;
    }

    if (parseFloat(input.getAttribute('max')) < parseFloat(input.value)) {
      input.value = input.getAttribute('max');
      triggerChange(input);
      return false;
    }
  }

  if (isMS) {
    evt = document.createEvent('CustomEvent');
    evt.initCustomEvent('change', true, true, window);
  } else {
    evt = new Event('change', { bubbles: true });
  }

  input.dispatchEvent(evt);

  return true;
}

export function containSize(obj: HTMLElement, native: ISize, wrap: ISize, minus: ISize = defSize): void {
  const objHeightToWidth: number = native.height / native.width;
  const objWidthToHeight: number = native.width / native.height;

  const wrapHeight: number = wrap.height - minus.height;
  const wrapWidth: number = wrap.width - minus.width;

  if (wrapHeight * objWidthToHeight > wrapWidth) {
    obj.style.width = `${wrapWidth}px`;
    obj.style.height = `${wrapWidth * objHeightToWidth}px`;
  } else {
    obj.style.width = `${wrapHeight * objWidthToHeight}px`;
    obj.style.height = `${wrapHeight}px`;
  }
}

export function coverSize(obj: HTMLElement, native: ISize, wrap: ISize, minus: ISize = defSize): void {
  const objHeightToWidth: number = native.height / native.width;
  const objWidthToHeight: number = native.width / native.height;

  const wrapHeight: number = wrap.height - minus.height;
  const wrapWidth: number = wrap.width - minus.width;

  if (wrapHeight * objWidthToHeight > wrapWidth) {
    obj.style.width = `${wrapHeight * objWidthToHeight}px`;
    obj.style.height = `${wrapHeight}px`;
  } else {
    obj.style.width = `${wrapWidth}px`;
    obj.style.height = `${wrapWidth * objHeightToWidth}px`;
  }
}
export function svgSize(obj: SVGElement, native: ISize, wrap: ISize): void {
  const nativeToWrap: number = native.width / wrap.width;
  obj.style.width = `${wrap.width}px`;
  obj.style.height = `${nativeToWrap * native.height}px`;
}

export function getUrlParameter(url: string, parameterd: string): string {
  const parameter: string = parameterd.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex: RegExp = new RegExp(`[\\?|&]${parameter.toLowerCase()}=([^&#]*)`);
  const results: RegExpExecArray = regex.exec(`?${url.toLowerCase().split('?')[1]}`);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function setUrlParameter(url: string, keyd: string, valued: string): string {
  const key: string = encodeURIComponent(keyd);
  const value: string = encodeURIComponent(valued);

  const baseUrl: string = url.split('?')[0];
  const newParam: string = `${key}=${value}`;
  let params: string = `?${newParam}`;

  let urlQueryString: string;

  if (url.split('?')[1] === undefined) {
    urlQueryString = '';
  } else {
    urlQueryString = `?${url.split('?')[1]}`;
  }

  if (urlQueryString) {
    const updateRegex: RegExp = new RegExp(`([\?&])${key}[^&]*`);
    const removeRegex: RegExp = new RegExp(`([\?&])${key}=[^&;]+[&;]?`);

    if (typeof value === 'undefined' || value === null || value === '') {
      params = urlQueryString.replace(removeRegex, '$1');
      params = params.replace(/[&;]$/, '');
    } else if (urlQueryString.match(updateRegex) !== null) {
      params = urlQueryString.replace(updateRegex, `$1${newParam}`);
    } else if (urlQueryString === '') {
      params = `?${newParam}`;
    } else {
      params = `${urlQueryString}&${newParam}`;
    }
  }

  params = params === '?' ? '' : params;
  return baseUrl + params;
}
