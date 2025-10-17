"use client"

import { Button } from "@/components/ui/button"
import { LogoutButton } from "./logout"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const Page = () => {
    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const { data } = useQuery(trpc.getWorkflows.queryOptions())

    const testAi = useMutation(trpc.tastAi.mutationOptions())

    const create = useMutation(trpc.createWorkflow.mutationOptions({
        onSuccess: () => {
            toast.success("Job queued")
        }
    }))
    
    return (
        <div className="min-h-screen min-w-scren flex items-center justify-center flex-col gap-y-6">
            protected server component
            {JSON.stringify(data, null, 2)}
            <div>
                <Button disabled={testAi.isPending} onClick={() => testAi.mutate()}>
                    Test AI
                </Button>
                <Button disabled={create.isPending} onClick={() => create.mutate()}>
                    Create Workflow
                </Button>
                <LogoutButton />
            </div>
        </div>
    )
}
export default Page