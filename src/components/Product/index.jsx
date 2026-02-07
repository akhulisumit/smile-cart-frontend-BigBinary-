import { useEffect, useState } from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import productApi from "apis/products";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

import i18n from "../../common/i18n";
import { AddToCart, Header, PageLoader } from "../commons";

const Product = () => {
  const { slug } = useParams();
  const cartItems = useCartItemsStore(store => store.cartItems);
  const [selectedQuantity, setSelectedQuantity] = useSelectedQuantity(slug);

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

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
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
            <AddToCart {...{ availableQuantity, slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy Now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, i18n.t("product.title"));
