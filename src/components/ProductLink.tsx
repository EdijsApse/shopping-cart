import { Link } from "react-router";

type ProductLinkProps = {
  productId: number;
  children: React.ReactElement | string;
  className?: string;
};

const ProductLink = ({ productId, children, className }: ProductLinkProps) => {
  return (
    <Link
      to={`/products/${productId}`}
      className={`text-lg font-bold cursor-pointer hover:text-cyan-400 transition-all duration-300 ${className}`}
    >
      {children}
    </Link>
  );
};

export default ProductLink;
