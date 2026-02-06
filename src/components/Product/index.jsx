import { useContext, useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import productApi from "apis/products";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

import CartItemsContext from "../../contexts/CartItemsContext";
import { AddToCart, Header, PageLoader } from "../commons";

const Product = () => {
  const { slug } = useParams();
  const [cartItems] = useContext(CartItemsContext);

  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const product = await productApi.show(slug);
      setProduct(product);
    } catch (error) {
      console.log("Error fetching product data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(2);

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-6 pb-6">
      <Header cartItemsCount={cartItems.length} title={name} />
      <div className="mt-16 flex gap-4 ">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel imageUrls={append(imageUrl, imageUrls)} title={name} />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
