import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './MobileCarousel.css';
import CldImage from '../ui/CldImage';

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
          pauseOnMouseEnter: true,
        }}
        speed={450}
        grabCursor={true}
        className="mc-swiper"
      >
        {items.map((item, i) => (
          <SwiperSlide key={i} className="mc-slide">
            <div className="mc-card">
              <CldImage
                publicId={item.publicId}
                alt={item.text}
                width={400}
                options={item.options || {}}
                wrapperClassName="mc-img-wrap"
                imgClassName="mc-img"
                decoding="async"
              />
              <p className="mc-name">{item.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
