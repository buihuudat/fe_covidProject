import { toast } from "react-toastify";

export const notification = (type, message) => {
  return toast(message, {
    type,
    position: "top-right",
  });
};
