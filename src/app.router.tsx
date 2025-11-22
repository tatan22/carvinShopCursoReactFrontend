import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ShopLayout } from "./shop/layout/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from "./shop/pages/product/ProductPage";
import { GenderPage } from "./shop/pages/gender/GenderPage";
import { LoginPage } from "./auth/pages/login/LoginPage";
import { DashboardPage } from "./admin/pages/DashboardPage";
import { AdminProductsPage } from "./admin/products/AdminProductsPage";
import { LoginRegister } from "./auth/pages/register/RegisterPage";
import { AdminProductPage } from "./admin/product/AdminProductPage";
import { AdminRoute, NotAuthenticatedRoute } from "./components/routes/ProtectedRoutes";
// import { AdminLayout } from "./admin/layouts/AdminLayout";
// import { AuthLayout } from './auth/layouts/AuthLayout';

//? Implementación de carga lazy 'Perezosa'
// Para que no marque error en el import debe ser por defecto
const AuthLayout = lazy(() => import("./auth/layouts/AuthLayout"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));

export const appRouter = createBrowserRouter([
	//Public routes o Main routes
	{
		path: "/",
		element: <ShopLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "product/:idSlug",
				element: <ProductPage />,
			},
			{
				path: "gender/:gender",
				element: <GenderPage />,
			},
		],
	},
	// Auth routes
	{
		path: "/auth",
		element: <NotAuthenticatedRoute><AuthLayout /></NotAuthenticatedRoute>,
		children: [
			// Para redireccionar automáticamente al login
			{
				index: true,
				element: <Navigate to="/auth/login" />, // No se usa comodín porque la ruta si existe
			},
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <LoginRegister />,
			},
		],
	},
	//Admin routes
	{
		path: "/admin",
		element: <AdminRoute><AdminLayout /></AdminRoute>,
		children: [
			{
				index: true,
				element: <DashboardPage />,
			},
      {
        path: "products",
        element: <AdminProductsPage />,
      },
			{
				path: "products/:id",
				element: <AdminProductPage />,
			},
			
		],
	},
	// Comodín si no encuentra ninguna ruta
	{
		path: "*",
		element: <Navigate to="/" />, // se usa el comodín para redireccionar
	},
]);
//? Mostrar las rutas en el TesloShopApp
