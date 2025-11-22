import React from "react";
import {
	Home,
	Users,
	BarChart3,
	Settings,
	FileText,
	ShoppingCart,
	Bell,
	HelpCircle,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { CustomLogo } from "@/components/custom/CustomLogo";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "@/auth/store/auth.store";

interface SidebarProps {
	isCollapsed: boolean;
	onToggle: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
	const { pathname } = useLocation();
	const { user} = useAuthStore();
	const getInitials = (fullName: string = "") => {
  const parts = fullName.trim().split(" ");

  const firstName = parts[0] || "";
  const lastName  = parts[1] || "";

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
	const menuItems = [
		{ icon: Home, label: "Dashboard", to: "/admin" },
		{ icon: BarChart3, label: "Productos", to: "/admin/products" },
		{ icon: Users, label: "Usuarios", to: "" },
		{ icon: ShoppingCart, label: "Ordenes", to: "" },
		{ icon: FileText, label: "Reportes", to: "" },
		{ icon: Bell, label: "Notificaciones", to: "" },
		{ icon: Settings, label: "Ajustes", to: "" },
		{ icon: HelpCircle, label: "Ayuda", to: "" },
	];
	// Función helper para determinar la ruta activa
	const isActiveRoute = (to: string) => {
    // TODO : ajustar cuando estemos en la pantalla de producto
    if(pathname.includes('admin/products/') && to === '/admin/products'){
      return true
    }
		// return window.location.pathname === to;// pathname es la ruta actual sin el uso de useLocation
    return pathname === to;
	};

	return (
		<div
			className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out 
      ${isCollapsed ? "w-18" : "w-64"} flex flex-col`}
		>
			{/* Header */}
			<div className="p-4 border-b border-gray-200 flex items-center justify-between h-18">
				{!isCollapsed && <CustomLogo subtitle="Dashboard" />}
				<button
					onClick={onToggle}
					className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
				>
					{isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
				</button>
			</div>

			{/* Navigation */}
			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{menuItems.map((item, index) => {
						const Icon = item.icon;
						return (
							<li key={index}>
								<Link
									to={item.to || "/admin"}
									className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
										// item.active
                    isActiveRoute(item.to || "/NotFound")
											? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
											: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
									}`}
								>
									<Icon size={20} className="shrink-0" />
									{!isCollapsed && (
										<span className="font-medium">{item.label}</span>
									)}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>

			{/* User Profile */}
			{!isCollapsed && (
				<div className="p-4 border-t border-gray-200">
					<div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
						<div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
							{
								getInitials(user?.fullName)
							}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900 truncate">
								{user?.fullName}
							</p>
							<p className="text-xs text-gray-500 truncate">{user?.email}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminSidebar;
