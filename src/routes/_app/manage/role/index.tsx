import { RoleListPage } from '@/pages/manage/role/RoleListPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/role/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RoleListPage />
}
