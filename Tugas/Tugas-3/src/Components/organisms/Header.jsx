import { useState, useEffect, useRef } from "react";

const Header = ({ title, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const initial = (user.name || "?").charAt(0).toUpperCase();

  // Tutup dropdown kalau klik di luar menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md relative z-20">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="relative" ref={menuRef}>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold focus:outline-none cursor-pointer">
            {initial}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <button type="button" onClick={onLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
