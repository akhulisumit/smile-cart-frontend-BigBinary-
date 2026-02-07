import { Typography, Button } from "@bigbinary/neetoui";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

import i18n from "../../common/i18n";
import { AddToCart, Header, PageLoader, PageNotFound } from "../commons";

const Product = () => {
  const { slug } = useParams();
  const { data: product, isLoading, isError } = useShowProduct(slug);
  const cartItems = useCartItemsStore(store => store.cartItems);
  const [selectedQuantity, setSelectedQuantity] = useSelectedQuantity(slug);
  if (isError) return <PageNotFound />;

  if (isLoading) return <PageLoader />;

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscount = mrp - offerPrice;
  const discountPercentage = ((totalDiscount / mrp) * 100).toFixed(2);

  return (
    <div className="px-6 pb-6">
      <Header cartItemsCount={cartItems.length} title={name} />
      <div className="mt-16 flex gap-4 ">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
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
            <AddToCart slug={slug} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy Now"
              size="large"
              to={routes.products.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, i18n.t("product.title"));
