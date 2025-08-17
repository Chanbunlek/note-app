import { createToast } from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'

export const openToast = (message: string, type: "success" | "danger") => {
  createToast(message, {
    type: type,
  });
};
