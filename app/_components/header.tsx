"use client";
import { useState, useEffect, useCallback } from "react";
import { FiSearch, FiX, FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { debounce } from "lodash";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dummyNavigationItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Dashboard", href: "/dashboard" },
    { id: 3, label: "Analytics", href: "#" },
    { id: 4, label: "Login", href: "/login" }
  ];

  const dummySuggestions = [
    "React Development",
    "Tailwind CSS",
    "Frontend Design",
    "Web Development"
  ];

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      setIsLoading(true);
      setTimeout(() => {
        const filtered = dummySuggestions.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
      }, 300);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      debouncedSearch(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      setSearchQuery(suggestions[selectedIndex]);
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".search-container")) {
        setSuggestions([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className={`w-full fixed top-0 z-50 ${isDarkMode ? "dark bg-gray-900" : "bg-white"} shadow-lg transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9"
              alt="Company Logo"
              className="h-10 w-auto cursor-pointer transition-transform hover:scale-105"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9";
                e.target.alt = "Fallback Logo";
              }}
            />
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:block flex-1 mx-8 relative search-container">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full py-2 px-4 pl-10 pr-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                aria-label="Search input"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
              {isLoading && (
                <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                </div>
              )}
            </div>
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer ${index === selectedIndex ? "bg-blue-50 dark:bg-gray-700" : "hover:bg-gray-50 dark:hover:bg-gray-700"} ${isDarkMode ? "text-white" : "text-gray-800"}`}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDarkModeToggle}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FiSun className="text-white" /> : <FiMoon />}
            </button>

            <nav className="hidden md:flex items-center space-x-6">
              {dummyNavigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium hover:text-blue-500 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              <FiMenu className={isDarkMode ? "text-white" : "text-gray-800"} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              {dummyNavigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium hover:text-blue-500 transition-colors ${isDarkMode ? "text-white" : "text-gray-700"}`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;