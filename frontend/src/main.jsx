import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import "leaflet/dist/leaflet.css";
import { AuthProvider } from './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './components/ui/provider'
import { Container } from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <Container maxWidth={'sm'} margin={'auto'}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
      </Container>
    </Provider>
  </StrictMode>,
)
