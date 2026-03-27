/**
 * Main application component with routing configuration
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DarkModeProvider } from './context/DarkModeContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { PlatformDetailPage } from './pages/PlatformDetailPage';
import { ComparePage } from './pages/ComparePage';

/**
 * Root App component that sets up routing, layout, and providers
 */
function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/platform/:id" element={<PlatformDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
          </Routes>
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: 'dark:bg-gray-800 dark:text-white',
            }}
          />
        </div>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
