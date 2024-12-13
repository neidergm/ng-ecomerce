import Image from 'next/image'
import React from 'react'

type Props = {
    style?: React.CSSProperties;
    height: number;
    width: number;
    src?: string | null;
    alt: string;
    className?: string
}

export const ProductImage = ({ height, alt, src, width, className, style }: Props) => {

    const customSrc = (src)
        ? src.startsWith('http') ? src : `/imgs/products/${src}`
        : "/imgs/placeholder.jpg"

    return (
        <Image
            style={style}
            height={height}
            width={width}
            src={customSrc}
            alt={alt}
            className={className}
        />
    )
}
