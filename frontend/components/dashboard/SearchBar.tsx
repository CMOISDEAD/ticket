import { Input } from "../ui/input";
import { SidebarTrigger } from "../ui/sidebar";

export const SearchBar = () => {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border px-6">
      <SidebarTrigger />
      <div className="flex-1">
        <form>
          <div className="relative">
            <Input
              className="w-full pl-8"
              placeholder="Search events, tickets, users..."
              type="search"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </form>
      </div>
    </header>
  );
};
