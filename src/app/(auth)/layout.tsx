import { AuthLayout } from "@/components/auth-layout"

const Layout = ({ children }: { children: React.ReactNode } ) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}
export default Layout