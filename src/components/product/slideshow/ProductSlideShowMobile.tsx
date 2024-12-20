'use client'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Product } from '@/interfaces';
import { ProductImage } from '../ProductImage';

type Props = {
    className?: string,
    images: Product['images']
}

export const ProductSlideShowMobile = ({ images, className = "" }: Props) => {

    return (<div className={className}>
        <Swiper
            style={{
                width: '100vw',
                height: '500px'
            }}
            pagination
            modules={[FreeMode, Pagination, Autoplay]}
            className="mySwiper2"
            autoplay={{ delay: 2500 }}
        >
            {images.map((image) => (
                <SwiperSlide key={image}>
                    <ProductImage
                        width={500}
                        height={600}
                        src={image}
                        alt="Product Image"
                        className='object-fill'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
};