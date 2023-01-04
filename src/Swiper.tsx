import { createSignal, For, children, splitProps, createEffect, onMount, JSX } from 'solid-js';
import { OnReadyApi, SwiperItemsElements, SwiperProps } from './types';

export default function Swiper<P extends readonly any[], I extends JSX.Element>(attrs: SwiperProps<P, I>) {
  // const swiperSlide = children(() => attrs.children);
  const [props, rest] = splitProps(attrs, ['items', 'threshold', 'index', 'onReady', 'onChange']);
  const items = () => props?.items || [];
  const threshold = () => props?.threshold || 80;
  const [activeSlide, setActiveSlide] = createSignal(props?.index || 0);
  const state = {
    active: false,
    start: [0, 0],
    end: [0, 0],
  };

  let wrapperEl: HTMLDivElement;
  const itemsEl: SwiperItemsElements = {};

  const refreshActive = () => {
    offset = (itemsEl[0]?.clientWidth || 0) * activeSlide();
    setOffset(offset, true);
  };
  createEffect(() => setActiveSlide(props?.index || 0));
  createEffect(() => {
    items() && refreshActive();
  });
  createEffect(() => {
    props.onChange?.(activeSlide());
  });

  let offset = 0;
  const setOffset = (value: number, animated: boolean = true) => {
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
  onMount(() => {
    const api: OnReadyApi = {
      next: () => next(),
      prev: () => prev(),
    };
    props?.onReady?.(api);
  });

  const events = {
    onMouseDown: (event: MouseEvent) => {
      event.preventDefault();
      state.active = true;
      state.start = [event.clientX, event.clientY];
    },
    onMouseMove: (event: MouseEvent) => {
      event.preventDefault();
      if (!state.active) return;
      let diff = event.clientX - state.start[0];
      let normalOffset = offset;
      setOffset(normalOffset + -diff, false);
    },
    onMouseUp: (event: MouseEvent) => {
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
      <div class="swiper-container">
        <div class="swiper-wrapper" ref={wrapperEl} {...events}>
          <For each={items()}>
            {(item, index) => (
              <div class="swiper-slide" ref={(el) => (itemsEl[index()] = el)}>
                {attrs?.children?.(item, index)}
              </div>
            )}
          </For>
        </div>
      </div>
      <style>{`
        .swiper-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          overflow: hidden;
        }
        .swiper-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          transition: transform 0ms ease-in-out;
          transform: translateX(-0px);
        }
        .swiper-slide {
          flex-shrink: 0;
          width: 100%;
        }
      `}</style>
    </>
  );
}

// export default Swiper;
