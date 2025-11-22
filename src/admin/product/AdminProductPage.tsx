// https://github.com/Klerith/bolt-product-editor

import { Navigate, useNavigate, useParams } from "react-router";

import { CustomFullScreenLoading } from "@/shop/components/CustomFullScreenLoading";
import { useProduct } from "../hook/useProduct";
import { ProductForm } from "./ui/ProductForm";
import type { Product } from "@/interfaces/products.interface";
import { toast } from "sonner";

export const AdminProductPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: product, isError, isLoading, mutation } = useProduct(id ?? "");

	const title = id === "new" ? "Nuevo producto" : "Editar producto";
	const subtitle =
		id === "new"
			? "Aquí puedes crear un nuevo producto."
			: "Aquí puedes editar el producto.";

	const handleSubmit = async(productLike: Partial<Product> & { files?: File[] }) => {
		await mutation.mutateAsync(productLike,{
			onSuccess: (data) => {
				toast.success('Producto actualizado correctamente',{
					duration: 2000,
					position: 'top-right'
				});
				navigate(`/admin/products/${data.id}`);
				
			},
			onError: (error) => {
				toast.error('Error al actualizar el producto: ' + error.message, {
					duration: 2000,
					position: 'top-right'
				});

				
			},
		});
	};

	if (isError) {
		return <Navigate to="/admin/products" />;
	}
	if (isLoading) return <CustomFullScreenLoading />;

	if (!product) {
		return <Navigate to="/admin/products" />;
	}
	return <ProductForm tittle={title} subTitle={subtitle} product={product} onSubmit={handleSubmit} isPending={mutation.isPending}/>;
};
