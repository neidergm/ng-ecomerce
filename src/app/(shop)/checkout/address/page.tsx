import { Title } from '@/components';
import { AddressForm } from '../ui/AddressForm';
import { getUserAddress } from '@/actions';

export default async function AddressPage() {

  const savedAddress = await getUserAddress();

  const address = savedAddress ? {
    address: savedAddress.address,
    address2: savedAddress.address2,
    city: savedAddress.city,
    country: savedAddress.countryId,
    lastName: savedAddress.lastName,
    name: savedAddress.name,
    phone: savedAddress.phone,
    postalCode: savedAddress.postalCode,
    saveAddress: true
  } : undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">


      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Address" subTitle="Delivery address" />

        <AddressForm defaultValues={address} />

      </div>
    </div>
  );
}