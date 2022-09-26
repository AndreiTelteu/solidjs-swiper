
import { JSX, createSignal } from "solid-js";
import { Swiper } from '../../src/index';

export default function App(): JSX.Element {
  const [pictures, setPictures] = createSignal([
    { img: "https://picsum.photos/id/10/400/200"  },
    { img: "https://picsum.photos/id/1/400/200"   },
    { img: "https://picsum.photos/id/100/400/200" },
    { img: "https://picsum.photos/id/101/400/200" },
  ] as any);
  const [index, setIndex] = createSignal(0);
  let swiperApi;
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
        children={(item: any) => (
          <img
            src={item.img}
            alt=""
            style="width: 100%; height: 100%; object-fit: cover; display: block;"
          />
        )}
      />
    </div>
  );
};