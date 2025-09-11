import FirstPage from '@/pages/auth/FirstPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/signup')({
    component: RouteComponent,
})

function RouteComponent() {
    return <FirstPage />;
}
