import { titleFont } from '@/config/fonts'
import Image from 'next/image'
import Link from 'next/link'

export function NotFoundPage() {
    return (
        <div className='sm:h-[800px] flex justify-center items-center text-center gap-4 flex-wrap-reverse'>
            <div>
                <div className={`${titleFont.className} text-9xl`}>404</div>
                <span>Woops, page not found</span><br/>
                <span>Go back to the <Link href="/" className='hover:underline'>Homepage</Link></span>
            </div>

            <div>
                <Image
                    src="/imgs/starman_750x750.png"
                    alt="404"
                    width={400}
                    height={400}
                />
            </div>

        </div>
    )
}
