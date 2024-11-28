'use client'

import { generatePaginationNumbers } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'

type Props = {
    totalPages: number,
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageUrl = (page: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (page === "...") {
            return `${pathname}?${params.toString()}`
        }

        if (+page === 0) {
            return `${pathname}`
        }

        if (+page > totalPages) {
            return `${pathname}?${params.toString()}`
        }

        params.set('page', page.toString());

        return `${pathname}?${params.toString()}`
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const disableNavigation = (enabled: boolean): string => {
        return enabled ?
            'pointer-events-none focus:shadow-none text-gray-500'
            : "text-gray-800 hover:text-gray-800 hover:bg-gray-200"
    }

    return (
        <div>
            <div className="flex justify-center">
                <nav aria-label="Page navigation example">
                    <ul className="flex list-style-none">
                        <li className="page-item disabled">
                            <Link
                                href={createPageUrl(currentPage - 1)}
                                className={clsx(
                                    "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded ",
                                    disableNavigation(currentPage <= 1)
                                )}
                                aria-disabled={currentPage <= 1}
                                tabIndex={-1}
                            >
                                <IoChevronBack size={30} />
                            </Link>
                        </li>

                        {
                            allPages.map((page, i) => {
                                return (
                                    <li key={`${page}-${i}`} className="page-item">
                                        <Link
                                            href={createPageUrl(page)}
                                            className={clsx(
                                                "page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded ",
                                                currentPage === page ? "bg-blue-600 text-white" : "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                                            )}
                                        >
                                            {page}
                                        </Link>
                                    </li>
                                )
                            })
                        }

                        <li className="page-item">
                            <Link
                                href={createPageUrl(currentPage + 1)}
                                className={clsx(
                                    "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded ",
                                    disableNavigation(currentPage >= totalPages)
                                )}
                                aria-disabled={currentPage >= totalPages}
                            >
                                <IoChevronForwardOutline size={30} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
