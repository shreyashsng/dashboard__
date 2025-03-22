'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostsTable } from '@/components/dashboard/posts-table';
import { Card } from "@/components/ui/card";
import { Search, Filter, FileText, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Fetch posts when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchPosts();
  }, [router]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
      setLoading(false);
    } catch (error) {
      setError('Failed to load posts. Please try again later.');
      setLoading(false);
    }
  };

  // Handle search and filtering
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching

    if (!value.trim()) {
      setFilteredPosts(posts); // If search is empty, show all posts
      return;
    }

    const searchResults = posts.filter((post) => {
      const searchLower = value.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchLower) || // Search in title
        post.id.toString().includes(value) // Search by ID
      );
    });

    setFilteredPosts(searchResults);
  };

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Add this helper function at the top of your component
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-3 min-w-0">
      {/* Page Header with Stats Combined - Made more mobile friendly */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Left side - Title */}
        <div className="min-w-0 flex-1">
          <h1 className="text-lg sm:text-xl font-semibold text-foreground truncate">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage your content</p>
        </div>
        
        {/* Right side - Stats Card */}
        <Card className="bg-card border-border w-full sm:w-auto">
          <div className="px-3 py-2 flex items-center gap-3">
            <div className="flex-1 sm:flex-initial">
              <p className="text-sm font-medium text-card-foreground">Total Posts</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">{posts.length}</span>
                <div className="flex items-center text-green-500 text-xs">
                  <Activity className="h-3 w-3 mr-0.5" />
                  <span>+12.5%</span>
                </div>
              </div>
            </div>
            <FileText className="h-4 w-4 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Content Section */}
      <div className="bg-card border border-border rounded-lg shadow">
        {/* Search Bar Section - Made more mobile friendly */}
        <div className="p-2 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex flex-1 gap-2">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-8 h-8 w-full bg-background/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon"
                className="shrink-0 h-8 w-8"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="outline"
              onClick={() => handleSearch('')}
              className="h-8 sm:w-auto"
              size="sm"
            >
              Reset
            </Button>
          </div>
        </div>
        
        {/* Table Section */}
        <div className="overflow-x-auto">
          <div className="min-w-[640px] p-2">
            <PostsTable posts={currentPosts} loading={loading} />
          </div>
        </div>
      </div>

      {/* Pagination - Better mobile layout */}
      <div className="flex items-center justify-between sm:justify-center gap-2 py-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="h-9 px-2 sm:px-4" // Smaller padding on mobile
          >
            <span className="sm:hidden">Prev</span>
            <span className="hidden sm:inline">Previous</span>
          </Button>
          
          {/* Current page indicator for mobile */}
          <span className="sm:hidden text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          
          {/* Page numbers for desktop */}
          <div className="hidden sm:flex items-center gap-2">
            {getPageNumbers(currentPage, totalPages).map((pageNum, i) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  key={i}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum as number)}
                  className={cn(
                    "h-9 min-w-[2.25rem]",
                    currentPage === pageNum 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-background/50 text-foreground hover:bg-border"
                  )}
                >
                  {pageNum}
                </Button>
              )
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="h-9 px-2 sm:px-4" // Smaller padding on mobile
          >
            <span className="sm:hidden">Next</span>
            <span className="hidden sm:inline">Next</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 