import useCartItemsStore from "stores/useCartItemsStore";

const useSelectedQuantity = slug => {
  const { cartItems, setSelectedQuantity } = useCartItemsStore();
  const selectedQuantity = cartItems[slug];

  const updateQuantity = quantity => setSelectedQuantity(slug, quantity);

  return [selectedQuantity, updateQuantity];
};

export default useSelectedQuantity;
