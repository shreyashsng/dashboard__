import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Search, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsTableProps {
  posts: Post[];
  loading: boolean;
}

export function PostsTable({ posts, loading }: PostsTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-gray-400">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="rounded-full bg-[#1C1C1C] p-3 mb-3">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
        <p className="text-sm text-gray-200 mb-2">No posts found</p>
        <p className="text-xs text-gray-400">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  const formatDate = (id: number) => {
    // Simulating dates based on ID for demo
    const date = new Date();
    date.setDate(date.getDate() - id);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg bg-card">
      <div className="min-w-[720px]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-t border-border">
              <TableHead className="w-[80px] text-muted-foreground">ID</TableHead>
              <TableHead className="w-[30%] text-muted-foreground">Title</TableHead>
              <TableHead className="text-muted-foreground">Content</TableHead>
              <TableHead className="w-[120px] text-muted-foreground">Date</TableHead>
              <TableHead className="w-[46px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow 
                key={post.id} 
                className="hover:bg-muted/50 cursor-pointer border-0"
              >
                <TableCell className="font-medium">#{post.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-muted-foreground text-sm md:hidden line-clamp-1">{post.body}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <p className="text-muted-foreground line-clamp-1">{post.body}</p>
                </TableCell>
                <TableCell>
                  <p className="text-muted-foreground text-sm">{formatDate(post.id)}</p>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 hover:bg-[#333333] text-gray-400"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      className="w-[160px] bg-[#2A2A2A] border-[#333333] text-gray-200"
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-[#333333]" />
                      <DropdownMenuItem className="hover:bg-[#333333] cursor-pointer">
                        Edit Post
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-[#333333] cursor-pointer">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="hover:bg-[#333333] cursor-pointer text-red-400 focus:text-red-400"
                      >
                        Delete Post
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 