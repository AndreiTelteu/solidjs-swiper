import { createSignal, Component } from 'solid-js';
import { OnReadyApi, Swiper } from '../../src/index';

const App: Component = () => {
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
