import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <aside className="w-64 min-h-screen p-5 bg-gradient-to-b from-purple-800 via-purple-600 to-purple-500 text-white shadow-2xl backdrop-blur-xl border-r border-white/20 transition-all duration-500 ease-in-out">
      <h2 className="text-2xl font-extrabold mb-6 tracking-wide animate-pulse text-center">
        Admin Panel
      </h2>

      <ul className="space-y-3">
        <li className="transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]">
          <Link
            className="flex items-center gap-3 px-4 py-2 pl-11 rounded-lg hover:bg-white/10 hover:text-purple-200 transition-all duration-300 bg-[url('https://api.iconify.design/lucide:layout-dashboard.svg?color=white')] bg-no-repeat bg-[length:20px] bg-[left_12px_center]"
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]">
          <Link
            className="flex items-center gap-3 px-4 py-2 pl-11 rounded-lg hover:bg-white/10 hover:text-purple-200 transition-all duration-300 bg-[url('https://api.iconify.design/lucide:help-circle.svg?color=white')] bg-no-repeat bg-[length:20px] bg-[left_12px_center]"
            to="/admin/questions"
          >
            Questions
          </Link>
        </li>

        <li className="transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]">
          <Link
            className="flex items-center gap-3 px-4 py-2 pl-11 rounded-lg hover:bg-white/10 hover:text-purple-200 transition-all duration-300 bg-[url('https://api.iconify.design/lucide:layers.svg?color=white')] bg-no-repeat bg-[length:20px] bg-[left_12px_center]"
            to="/admin/categories"
          >
            Categories
          </Link>
        </li>

        <li className="transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]">
          <Link
            className="flex items-center gap-3 px-4 py-2 pl-11 rounded-lg hover:bg-white/10 hover:text-purple-200 transition-all duration-300 bg-[url('https://api.iconify.design/lucide:users.svg?color=white')] bg-no-repeat bg-[length:20px] bg-[left_12px_center]"
            to="/admin/users"
          >
            Users
          </Link>
        </li>

        <li className="transition-all duration-300 hover:translate-x-2 hover:scale-[1.02]">
          
        </li>

        <li>
          <button
            onClick={logout}
            className="mt-6 bg-purple-900/80 hover:bg-purple-900 w-full py-2.5 pl-11 rounded-lg transition-all duration-300 hover:scale-[1.04] active:scale-95 shadow-xl bg-[url('https://api.iconify.design/lucide:log-out.svg?color=white')] bg-no-repeat bg-[length:20px] bg-[left_12px_center]"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
}
