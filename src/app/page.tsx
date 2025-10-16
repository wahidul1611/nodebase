import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { Client } from "./client"

const Page = async () => {
    const queryClient  = getQueryClient()

    void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

    return (
        <div className="min-h-screen min-w-scren flex items-center justify-center">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<p>loading...</p>}>
                    <Client />
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}
export default Page