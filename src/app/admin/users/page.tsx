import { Title } from "@/components";
import UsersTable from "./ui/UsersTable";
import { getPaginatedUsers } from "@/actions";
import { redirect } from "next/navigation";

export default async function UsersPage() {

    const { error, users } = await getPaginatedUsers()

    if (error) {
        redirect('/auth/login')
    }

    return (
        <>
            <Title title="Users" />

            <div className="mb-20">
                <UsersTable users={users} />
            </div>

        </>
    );
}