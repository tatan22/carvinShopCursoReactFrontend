import type { Product } from "@/interfaces/products.interface";
import { getProductByAction } from "../actions/get-products-by-id.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUpdateProductAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["products", id],
		queryFn: () => getProductByAction(id),
		retry: false,
		staleTime: 5 * 60 * 1000, // 5 minutes
		enabled: !!id,
	});

	// Todo Maneja la mutación
	const mutation = useMutation({
		mutationFn: createUpdateProductAction,
		onSuccess: (product: Product) => {
			// Invalidar la cache de la query
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({
				queryKey: ["product", { id: product.id }],
			});
			// Actualizar el QueryData
			queryClient.setQueryData(["products", { id: product.id }], product);
		},
		onError: () => {
			console.log("algo salio mal");
		},
	});

	// // Todo: Por eliminar
	// // El Partial es para decirle que puede ser undefined / Puede venir o no
	// const handleSubmitForm = async (productLike: Partial<Product>) => {
	// 	console.log(`onsubmit: ${JSON.stringify(productLike)}`);
	// };

	return {
		...query,
		// handleSubmitForm,
		mutation,
	};
};
