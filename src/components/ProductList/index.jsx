import { useEffect, useState } from "react";

import productApi from "apis/products";

import ProductListItem from "./ProductListItem";

import { Header, PageLoader, PageNotFound } from "../commons";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await productApi.fetch();
      console.log(response);
      setProducts(response.products);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isError) return <PageNotFound />;

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex flex-col">
      <Header shouldShowBackButton={false} title="Smile Cart" />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(product => (
          <ProductListItem key={product.slug} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
