import { IsPaid, PaypalButton, ProductImage, Title } from '@/components';
import { getOrdersById } from '@/actions';
import { redirect } from 'next/navigation';
import { currencyFormat } from '@/utils';

interface Props {
    params: Promise<{
        id: string;
    }>
}

export default async function OrdersPage({ params }: Props) {

    const { id } = await params;

    const order = await getOrdersById(id);

    if (!order) redirect("/orders");

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${id}`} />


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Carrito */}
                    <div className="flex flex-col mt-5">

                        <IsPaid paid={order.isPaid} />

                        {/* Items */}
                        {
                            order.OrderItem.map(item => (

                                <div key={item.Product.slug + item.size} className="flex mb-5">
                                    <ProductImage
                                        src={item.Product.ProductImage[0].url}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        alt={item.Product.name}
                                        className="mr-5 rounded"
                                    />

                                    <div>
                                        <p>{item.Product.name}</p>
                                        <p>{currencyFormat(item.price)} x {item.quantity}</p>
                                        <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                                    </div>

                                </div>


                            ))
                        }
                    </div>




                    {/* Checkout - Resumen de orden */}
                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2">Dirección de entrega</h2>
                        <div className="mb-10">
                            <p className="text-xl">{order.OrderAddress?.name} {order.OrderAddress?.lastName}</p>
                            <p>{order.OrderAddress?.address}</p>
                            <p>{order.OrderAddress?.city}</p>
                            <p>{order.OrderAddress?.countryId}</p>
                            <p>{order.OrderAddress?.postalCode}</p>
                            <p>{order.OrderAddress?.phone}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


                        <h2 className="text-2xl mb-2">Resumen de orden</h2>

                        <div className="grid grid-cols-2">

                            <span>No. Productos</span>
                            <span className="text-right">{order.itemsInOrder} artículos</span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order.subTotal)}</span>

                            <span>Impuestos (15%)</span>
                            <span className="text-right">{currencyFormat(order.tax)}</span>

                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order.total)}</span>


                        </div>

                        <div className="mt-5 mb-2 w-full">

                            {
                                order.isPaid ?
                                    <IsPaid paid />
                                    :
                                    <PaypalButton
                                        amount={order.total}
                                        orderId={id}
                                    />
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}