import { Link } from "react-router";

interface Props {
  subtitle?: string
}

export const CustomLogo = ({ subtitle= 'Shop'}: Props) => {
	return (
		<Link to="/" className="flex items-center whitespace-nowrap ">
      {/* whitespace-nowrap: Evita que el texto se divida en varias líneas */}
			<span className="font-montserrat text-2xl font-bold m-0 whitespace-nowrap">Carvin | </span>
      <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">{subtitle}</p>
		</Link>
	);
};
