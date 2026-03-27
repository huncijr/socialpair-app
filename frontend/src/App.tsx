/**
 * Main application component with routing configuration
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PlatformDetailPage } from './pages/PlatformDetailPage';
import { ComparePage } from './pages/ComparePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProfilePage } from './pages/ProfilePage';
import { SavedComparisonsPage } from './pages/SavedComparisonsPage';
import { AlertsPage } from './pages/AlertsPage';
import { NotesPage } from './pages/NotesPage';
import { TemplatesPage } from './pages/TemplatesPage';

/**
 * Root App component that sets up routing, layout, and providers
 */
function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/platform/:id" element={<PlatformDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/saved" element={<SavedComparisonsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
            </Routes>
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
