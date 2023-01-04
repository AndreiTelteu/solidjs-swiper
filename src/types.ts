import { JSX, Component, Signal, Accessor } from 'solid-js';

export declare function Swiper<P extends readonly any[], I extends JSX.Element>(props: SwiperProps<P, I>): Component;

export type SwiperProps<P extends readonly any[], I extends JSX.Element> = {
  children?: (item: P[number], index: Accessor<number>) => I;
  items: P | undefined | null | false;
  threshold?: number;
  index?: number;
  onReady?: OnReadyEvent;
  onChange?: OnChangeEvent;
};

export interface SwiperItemsElements {
  [key: number | string]: HTMLDivElement;
}

export interface OnReadyEvent {
  (api: OnReadyApi): void;
}
export interface OnReadyApi {
  next: () => void;
  prev: () => void;
}

export interface OnChangeEvent {
  (newIndex: number): void;
}
