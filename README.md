# solidjs-swiper

A simple image swiper built in Solid-JS. This is not Swiper.js ! it's a custom package inspired by swiper.js

Demo here: https://codesandbox.io/s/solidjs-swiper-demo-2r25of?file=/src/App.tsx

## Install

```bash
npm install solidjs-swiper
```

```bash
yarn add solidjs-swiper
```

## Usage example

```tsx
import { createSignal, Component } from 'solid-js';
import { OnReadyApi, Swiper } from 'solidjs-swiper';

const App: Component = () => {
  // You can specity the type of each item here. Optional. Works evem witout it.
  const demoImages = [
    { img: 'https://picsum.photos/id/10/400/200' },
    { img: 'https://picsum.photos/id/1/400/200' },
    { img: 'https://picsum.photos/id/100/400/200' },
    { img: 'https://picsum.photos/id/101/400/200' },
  ];

  const [pictures, setPictures] = createSignal(demoImages);
  const [index, setIndex] = createSignal(0);
  let swiperApi: OnReadyApi;
  setTimeout(() => swiperApi?.next(), 1600);
  setTimeout(() => swiperApi?.prev(), 2000);

  return (
    <div style="width: 400px">
      <Swiper
        items={pictures()}
        index={index()}
        onReady={(api) => {
          swiperApi = api;
        }}
        onChange={(i) => setIndex(i)}
      >
        {(item, index) => (
          <img
            src={item.img}
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
            alt={'Item: ' + index()}
          />
        )}
      </Swiper>
      Active index: {index()}
    </div>
  );
};
export default App;
```

## Roadmap:

|          |                                                    |
| :------- | :------------------------------------------------- |
| ✅       | First version out 🎉🥳                             |
| ✅       | Export api with `prev` and `next` methods          |
| ✅       | Add `onChange` event                               |
| &#x2610; | Autoplay with delay config and stop on interaction |
| &#x2610; | Support for loop                                   |

## Changelog

### v1.0.14

- Fixed onMouseLeave bug

### v1.0.13

- Type-safety for props and children item.
  Heavy inspiration from solid's [For component](https://github.com/solidjs/solid/blob/main/packages/solid/src/render/flow.ts#L29). Thank you solidjs !
