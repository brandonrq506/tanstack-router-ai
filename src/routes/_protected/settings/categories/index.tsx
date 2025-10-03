import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/settings/categories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/settings/categories/"!</div>
}
