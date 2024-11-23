export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1); //[1, 2, 3, 4, 5, 6, 7]

    } else {
        if (currentPage <= 3) { //current page is in the first 3 pages 
            return [1, 2, 3, 4, "...", totalPages]; //[1, 2, 3, 4, "...", 10]

        } else if (currentPage > totalPages - 3) { //current page is in the last 3 pages
            return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]; //[1, "...", 7, 8, 9, 10]

        } else {
            //current page is in the another place
            return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]; //[1, "...", 4, 5, 6, "...", 10]
        }
    }
}