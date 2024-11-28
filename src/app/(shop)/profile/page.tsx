import { auth } from "@/auth.config";
import { Title } from "@/components";
// import { redirect } from "next/navigation";

export default async function ProfilePage() {

    const session = await auth()

    // if (!session) redirect('/auth/login')

    return (
        <div>

            <Title title='Profile' />

            <div>
                <pre>{
                    JSON.stringify(session, null, 2)
                }</pre>
            </div>

        </div>
    );
}