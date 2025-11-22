import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomJumbotron } from "@/shop/components/CustomJumbotron";
import { ProductsGrid } from "@/shop/components/ProductsGrid";
import useProducts from "@/shop/hooks/useProducts";
import { useParams } from "react-router";

export const GenderPage = () => {
  const { gender } = useParams();
	const { data } = useProducts();
  const generalLabel = gender === "men" ? "Hombres" : gender === "women" ? "Mujeres" : "Niños";
	return (
		<>
			<CustomJumbotron
				title={`Productos para ${generalLabel}`}
				subTitle="Encuentra la camiseta perfecta para ti"
			/>
			<ProductsGrid products={data?.products || []} />
			<CustomPagination totalPages={data?.pages || 1} />
		</>
	);
};
