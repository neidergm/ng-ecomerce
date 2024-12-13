import { getPaginatedOrders } from "@/actions";
import { IsPaid, Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AllOrdersPage() {

    const {error, orders} = await getPaginatedOrders();

    if (error) redirect('/auth/login')

    return (
        <>
            <Title title='All Orders' />

            <div className="mb-10">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Nombre completo
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Estado
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order =>
                                <tr key={order.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id.split('-').pop()}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {order.OrderAddress?.name} {order.OrderAddress?.lastName}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <IsPaid paid={order.isPaid} />
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link href={`/orders/${order.id}`} className="hover:underline">
                                            Ver orden
                                        </Link>
                                    </td>

                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
}