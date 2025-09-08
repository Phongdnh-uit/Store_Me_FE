import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar";

interface AppHeaderProps {
  className?: string;
}

export default function AppHeader({ className }: AppHeaderProps) {
  return (
    <header
      className={cn("w-full border-b bg-white px-4 py-2 shadow-sm", className)}
    >
      <div className="flex w-full items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2"></div>

        {/* Center: Search */}
        <div className="hidden w-full max-w-md px-4 md:flex">
          <SearchBar onSearch={() => {}} />
        </div>

        {/* Right: Notification + User */}
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
