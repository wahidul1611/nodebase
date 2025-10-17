import { Loginform } from "@/features/auth/components/login-form";
import { requireUnauth } from "@/lib/auth-utils";

const Page = async () => {
    await requireUnauth() 

    return (
        <div>
            <Loginform />
        </div>
    )
}

export default Page;