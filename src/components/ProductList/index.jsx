import { useState } from "react";

import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import withTitle from "utils/withTitle";

import ProductListItem from "./ProductListItem";

import i18n from "../../common/i18n";
import useDebounce from "../../hooks/useDebounce";
import { Header, PageLoader, PageNotFound } from "../commons";

const ProductsList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);

  const {
    data: { products = [] } = {},
    isLoading,
    isError,
  } = useFetchProducts({
    searchTerm: debouncedSearchKey,
  });
  const cartItems = useCartItemsStore(store => store.cartItems);
  if (isError) return <PageNotFound />;

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex h-screen flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => setSearchKey(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withTitle(ProductsList, i18n.t("productList.title"));
