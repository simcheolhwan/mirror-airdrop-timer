import { ApolloClient, gql, InMemoryCache, useQuery } from "@apollo/client"
import { useEffect } from "react"

const LAST_SYNCED_HEIGHT = gql`
  query {
    LastSyncedHeight
  }
`

const client = new ApolloClient({
  uri: "https://mantle.terra.dev",
  cache: new InMemoryCache(),
})

const useMantleHeight = () => {
  const { data, startPolling } = useQuery<{ LastSyncedHeight: number }>(
    LAST_SYNCED_HEIGHT,
    { client, fetchPolicy: "network-only" }
  )

  useEffect(() => {
    startPolling(1000)
  }, [startPolling])

  return data?.LastSyncedHeight
}

export default useMantleHeight
