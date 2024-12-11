import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"

export const IsPaid = ({ paid }: { paid: boolean }) => {
    return <div className={
        clsx(
            "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
            paid ? 'bg-green-700' : 'bg-red-500',
        )
    }>
        <IoCardOutline size={30} />
        <span className="mx-2">
            {paid ? 'Paid' : 'Pending payment'}
        </span>
    </div>
}