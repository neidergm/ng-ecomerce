'use server'

import { auth } from "@/auth.config";
import { ValidSizes, UserAddressServerAction } from "@/interfaces";
import prisma from "@/lib/prisma";

type ProductsToBuy = {
    id: string;
    quantity: number;
    size: ValidSizes;
}

type Totals = {
    total: number;
    subTotal: number;
    tax: number;
    itemsInOrder: number;
}

type ProductsForTransaction = ProductsToBuy & {
    price: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const placeOrder = async (productsToBuy: ProductsToBuy[], { saveAddress, ...address }: UserAddressServerAction) => {

    const session = await auth()

    if (!session) return {
        error: true,
        message: "User not authenticated"
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                id: { in: productsToBuy.map(p => p.id) }
            }
        });


        const productsForTransaction: ProductsForTransaction[] = []

        // totals
        const totals = productsToBuy.reduce((totals, prod) => {

            const product = products.find(p => p.id === prod.id)

            if (!product) return totals;
            const price = product.price * prod.quantity;
            totals.subTotal += price;
            totals.tax += price * 0.15
            totals.total += price * 1.15
            totals.itemsInOrder += prod.quantity

            productsForTransaction.push({
                id: product.id,
                quantity: prod.quantity,
                size: prod.size,
                price: product.price
            })

            return totals
        }, { total: 0, subTotal: 0, tax: 0, itemsInOrder: 0 })

        const result = await placeOrderTx(totals, session.user.id, productsForTransaction, address)

        return {
            error: false,
            message: "Order placed successfully",
            data: result
        }

    } catch (error) {
        return {
            error: true,
            message: (error as { message: string }).message
        }
    }

}

// Order transaction (Tx)
const placeOrderTx = async (totals: Totals, userId: string, products: ProductsForTransaction[], address: UserAddressServerAction) => {

    return await prisma.$transaction(async (tx) => {

        //  Update Product stock
        const productsToUpdate = products.map(product => {

            const productQuantity = products
                .filter((p) => p.id === product.id)
                .reduce((acc, item) => item.quantity + acc, 0);

            if (productQuantity === 0) {
                throw new Error(`${product.id} no tiene cantidad definida`);
            }

            return tx.product.update({
                where: { id: product.id },
                data: {
                    inStock: {
                        decrement: product.quantity
                    }
                }
            })
        })

        const updatedProducts = await Promise.all(productsToUpdate)

        updatedProducts.forEach((p) => {
            if (p.inStock < 0) {
                throw new Error(`There is not enough stock for product ${p.name}`);
            }
        });

        // Create order
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: totals.itemsInOrder,
                total: totals.total,
                subTotal: totals.subTotal,
                tax: totals.tax,
                OrderItem: {
                    createMany: {
                        data: products.map(({ id, ...prod }) => ({ ...prod, productId: id }))
                    }
                }
            }
        })

        // Order address
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                countryId: country,
                orderId: order.id,
            },
        });

        return {
            productsToUpdate,
            order,
            orderAddress
        };
    })
}