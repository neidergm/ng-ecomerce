import { titleFont } from '@/config/fonts'
import React from 'react'

type Props = {
    title: string
    subTitle?: string,
    className?: string
}

export function Title({ title, subTitle, className }: Props) {
    return (
        <div className={`${className} mb-10`}>
            <h1 className={`${titleFont.className} text-2xl font-bold`}>{title}</h1>
            {subTitle && <h2 className="mt-4">{subTitle}</h2>}
        </div>
    )
}
