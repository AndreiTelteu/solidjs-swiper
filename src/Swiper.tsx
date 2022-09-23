import {
  Component,
  createSignal,
  For,
  children,
  splitProps,
  createEffect,
  onMount,
} from 'solid-js';
import './swiper.css';

const Swiper: Component = (attrs: any) => {
  const swiperSlide = children(() => attrs.children);
  const [props, rest] = splitProps(attrs, ['items', 'threshold', 'index']);
  const items = () => props?.items || [];
  const itemsEl: any = {};
  const threshold = () => props?.threshold || 80;
  const [activeSlide, setActiveSlide] = createSignal(props?.index || 0);
  const state = {
    active: false,
    start: [0, 0],
    end: [0, 0],
  };
  createEffect(() => {
    items().forEach((item: any, index: any) => {
      itemsEl[index] = document.getElementById('swiper-slide-' + index);
    });
  });
  createEffect(() => {
    offset = (itemsEl[0]?.clientWidth || 0) * activeSlide();
    setOffset(offset, true);
  });
  let wrapperEl: any;
  onMount(() => {
    wrapperEl = document.getElementById('swiper-wrapper');
  });

  let offset = 0;
  const setOffset = (value: any, animated: boolean = true) => {
    if (wrapperEl?.style) {
      wrapperEl.style.transform = `translateX(-${value}px)`;
      wrapperEl.style.transitionDuration = animated ? '250ms' : '0ms';
    }
  };

  const prev = () => {
    let slide = activeSlide() - 1;
    if (slide <= 0) {
      setActiveSlide(0);
      return false;
    }
    setActiveSlide(slide);
    return true;
  };
  const next = () => {
    let slide = activeSlide() + 1;
    let maxSlide = (items()?.length || 1) - 1;
    if (slide >= maxSlide) {
      setActiveSlide(maxSlide);
      return false;
    }
    setActiveSlide(slide);
    return true;
  };

  const events = {
    onMouseDown: (event: any) => {
      event.preventDefault();
      state.active = true;
      state.start = [event.clientX, event.clientY];
    },
    onMouseMove: (event: any) => {
      event.preventDefault();
      if (!state.active) return;
      let diff = event.clientX - state.start[0];
      let normalOffset = offset;
      setOffset(normalOffset + -diff, false);
    },
    onMouseUp: (event: any) => {
      event.preventDefault();
      if (!state.active) return;
      state.end = [event.clientX, event.clientY];
      state.active = false;
      let diff = event.clientX - state.start[0];
      if (diff > threshold()) {
        if (prev()) return true;
      } else if (diff < -threshold()) {
        if (next()) return true;
      }
      setOffset(offset);
    },
  };

  return (
    <>
      active slide: {activeSlide()}
      <br />
      <button onClick={() => prev()}>prev</button>
      <button onClick={() => next()}>next</button>
      <div class="swiper-container">
        <div class="swiper-wrapper" id="swiper-wrapper" {...events}>
          <For
            each={items()}
            children={(item: any, index: any) => (
              <div class="swiper-slide" id={'swiper-slide-' + index()}>
                {(swiperSlide() as any)(item)}
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default Swiper;
