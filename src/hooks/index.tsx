import { FavoriteProvider } from './useFavorite'

interface AppProviderProps {
  children: React.ReactNode
}

function AppProvider({ children }: AppProviderProps) {
  return <FavoriteProvider>{children}</FavoriteProvider>
}

export default AppProvider
