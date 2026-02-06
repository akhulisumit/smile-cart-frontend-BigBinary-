import { Button } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

const AddToCart = ({ slug }) => {
  const { cartItems, toggleCartItem } = useCartItemsStore();

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleCartItem(slug);
  };

  return (
    <Button
      label={cartItems.includes(slug) ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={handleClick}
    />
  );
};

export default AddToCart;
