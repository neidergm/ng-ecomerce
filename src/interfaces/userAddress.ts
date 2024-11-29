import { UserAddress as UA } from '@prisma/client';

export type UserAddress = UA;

export type UserAddressBase = Pick<UserAddress, 'name' | 'lastName' | 'address' | 'address2' | 'postalCode' | 'city' | 'phone' >;

export type UserAddressFormFields = UserAddressBase & {
    country: string;
    saveAddress?: boolean;
    address2?: string | null | undefined;
}

export type UserAddressServerAction = UserAddressBase & {
    saveAddress?: boolean;
    country: string;
}