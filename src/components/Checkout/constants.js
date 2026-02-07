import { t } from "i18next";
import * as yup from "yup";

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(t("validations.emailInvalid"))
    .required(t("validations.emailRequired")),
});

export const CHECKOUT_FORM_INITIAL_VALUES = {
  email: "",
  country: { code: "US", name: "United States" },
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: null,
  zipCode: "",
};
