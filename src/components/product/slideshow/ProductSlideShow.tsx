'use client'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObj } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Product } from '@/interfaces';
import { ProductImage } from '../ProductImage';

type Props = {
    images: Product['images'],
    className?: string,
}

export const ProductSlideShow = ({ images, className = "" }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObj>();

    return (<div className={className}>
        <Swiper
            style={{
                // height: '700px',
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
            } as React.CSSProperties}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
            autoplay={{ delay: 2500 }}
        >
            {images.map((image) => (
                <SwiperSlide key={image}>
                    <ProductImage
                        width={1024}
                        height={800}
                        src={image}
                        alt="Product Image"
                        className='object-fill rounded-lg'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
        >
            {images.map((image) => (
                <SwiperSlide key={image}>
                    <ProductImage
                        width={300}
                        height={300}
                        src={image}
                        alt="Product Image"
                        className='object-fill rounded-lg'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
};