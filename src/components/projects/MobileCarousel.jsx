import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './MobileCarousel.css';

export default function MobileCarousel({ items, interval = 3500 }) {
  return (
    <div className="mc">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        centeredSlides={true}
        spaceBetween={14}
        loop={true}
        autoplay={{
          delay: interval,
          disableOnInteraction: false,
        }}
        speed={450}
        grabCursor={true}
        className="mc-swiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="mc-slide">
            <div className="mc-card">
              <div className="mc-img-wrap">
                <img src={item.image} alt={item.text} draggable={false} />
              </div>
              <p className="mc-name">{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
