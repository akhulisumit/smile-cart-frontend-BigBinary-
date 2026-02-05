import axios from "axios";

const show = () => axios.get("products/infinix-inbook-2");

const fetch = () => axios.get("products");

const productApi = {
  show,
  fetch,
};

export default productApi;
