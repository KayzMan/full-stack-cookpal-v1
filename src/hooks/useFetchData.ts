import { useQuery } from '@tanstack/react-query'

export function useFetchData({
  queryKey,
  endpoint,
  params,
}: {
  queryKey: string
  endpoint: string
  params?: object
}) {
  return useQuery({
    queryKey: [queryKey, params],
    queryFn: async () => {
      const res = await fetch(`${endpoint}`)
      return await res.json()
    },
  })
}
