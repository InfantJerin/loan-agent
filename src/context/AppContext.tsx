import { createContext, useContext, useReducer, type ReactNode } from 'react'

interface AppState {
  selectedDealId: string | null
  selectedDocumentId: string | null
  selectedItems: string[]
  sidebarOpen: boolean
  searchOpen: boolean
}

type AppAction =
  | { type: 'SET_SELECTED_DEAL'; dealId: string | null }
  | { type: 'SET_SELECTED_DOCUMENT'; documentId: string | null }
  | { type: 'TOGGLE_ITEM'; itemId: string }
  | { type: 'SELECT_ALL_ITEMS'; itemIds: string[] }
  | { type: 'CLEAR_SELECTION' }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; open: boolean }
  | { type: 'TOGGLE_SEARCH' }
  | { type: 'SET_SEARCH'; open: boolean }

const initialState: AppState = {
  selectedDealId: null,
  selectedDocumentId: null,
  selectedItems: [],
  sidebarOpen: false,
  searchOpen: false,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SELECTED_DEAL':
      return { ...state, selectedDealId: action.dealId }
    case 'SET_SELECTED_DOCUMENT':
      return { ...state, selectedDocumentId: action.documentId }
    case 'TOGGLE_ITEM': {
      const exists = state.selectedItems.includes(action.itemId)
      return {
        ...state,
        selectedItems: exists
          ? state.selectedItems.filter(id => id !== action.itemId)
          : [...state.selectedItems, action.itemId],
      }
    }
    case 'SELECT_ALL_ITEMS':
      return { ...state, selectedItems: action.itemIds }
    case 'CLEAR_SELECTION':
      return { ...state, selectedItems: [] }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.open }
    case 'TOGGLE_SEARCH':
      return { ...state, searchOpen: !state.searchOpen }
    case 'SET_SEARCH':
      return { ...state, searchOpen: action.open }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
