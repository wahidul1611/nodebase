import { requireAuth } from "@/lib/auth-utils"
import { caller } from "@/trpc/server"
import { LogoutButton } from "./logout"

const Page = async  () => {
    await requireAuth()
    
    const data = await caller.getUsers()
    return (
        <div className="min-h-screen min-w-scren flex items-center justify-center flex-col gap-y-6">
            protected server component
            {JSON.stringify(data)}
            <div>
                <LogoutButton />
            </div>
        </div>
    )
}
export default Page