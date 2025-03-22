'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { LogOut, Moon, Sun } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border bg-card sticky top-0 z-10">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden shrink-0 p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-xl text-foreground font-medium truncate">Welcome back, User!</h1>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="p-4 md:p-6">
          <div className="min-w-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 