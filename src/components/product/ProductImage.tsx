import Image, { ImageProps } from 'next/image'
import React from 'react'

type Props = {
    style?: React.CSSProperties;
    height: number;
    width: number;
    src?: string | null;
    alt: string;
    className?: string
} & ImageProps

export const ProductImage = ({ height, alt, src, width, className, style, ...props }: Props) => {

    const customSrc = (src)
        ? src.startsWith('http') ? src : `/products/${src}`
        : "/imgs/placeholder.jpg"
    return (
        <Image
            title={customSrc}
            style={style}
            height={height}
            width={width}
            src={customSrc}
            alt={alt}
            className={className}
            {...props}
        />
    )
}
