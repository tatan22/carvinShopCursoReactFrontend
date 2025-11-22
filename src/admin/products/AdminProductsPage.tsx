import { Link } from "react-router";
import { AdminTitle } from "../components/AdminTitle";
import {
	Table,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableHeader,
} from "@/components/ui/table";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useProducts from "@/shop/hooks/useProducts";
import { CustomFullScreenLoading } from "@/shop/components/CustomFullScreenLoading";
import { currencyFormatter } from "@/lib/currency-formatter";

export const AdminProductsPage = () => {
	const { data, isLoading } = useProducts();
	if (isLoading) {
		return <CustomFullScreenLoading />;
	}
	return (
		<>
			{/* Navegación dentro de la tabla de productos */}
			<div className="flex justify-between items-center">
				<AdminTitle
					title="Productos"
					subtitle="Aquí puedes ver y administrar todos tus productos"
				/>
				<div className="flex justify-end mb-10 gap-4">
					<Link to="/admin/products/new">
						<Button className="btn btn-primary">
							<PlusIcon /> Nuevo Producto
						</Button>
					</Link>
				</div>
			</div>

			<Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">ID</TableHead>
						<TableHead>Imagen</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead>Categoría</TableHead>
						<TableHead>Inventario</TableHead>
						<TableHead>Tallas</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data &&
						data?.products.map((product, index) => (
							<TableRow key={product.id}>
								<TableCell className="font-medium">{index++}</TableCell>
								<TableCell>
									<img
										src={product.images[0]}
										alt={`${product.title} image`}
										className="w-20 h-20 object-cover rounded-md"
									/>
								</TableCell>
								<TableCell>
									<Link
										className="hover:text-blue-500 underline"
										to={`/admin/products/${product.slug}`}
									>
										{product.title}
									</Link>
								</TableCell>
								<TableCell>{currencyFormatter(product.price)}</TableCell>
								<TableCell>{product.gender}</TableCell>
								<TableCell>{product.stock}</TableCell>
								<TableCell>{product.sizes.join(", ")}</TableCell>
								<TableCell className="text-right">
									{" "}
									{/* <Link to="t-shirt-CarvinTypeScript"> Editar | Eliminar</Link>{" "} */}
									<Link to={`/admin/products/${product.id}`}>
										<PencilIcon className="w-4 h-4 text-blue-500" />
									</Link>{" "}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
			<CustomPagination totalPages={data?.pages || 1} />
		</>
	);
};
