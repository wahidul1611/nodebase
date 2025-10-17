import { Registerform } from "@/features/auth/components/register-form"
import { requireUnauth } from "@/lib/auth-utils"

const Page = async () => {
    await requireUnauth()

    return <Registerform />
       
}
export default Page