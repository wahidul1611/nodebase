import { requireAuth } from "@/lib/auth-utils";

interface PageProps {
    params: Promise<{
        credentialsId: string;
    }>
}

const Page = async ({ params }: PageProps) => {
    await requireAuth()

    const { credentialsId } = await params
    return  <p>Credentials: {credentialsId}</p>
}
export default Page;