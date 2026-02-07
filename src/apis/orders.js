import axios from "axios";

const create = payload => axios.post("orders", payload);

const orderApi = { create };

export default orderApi;
