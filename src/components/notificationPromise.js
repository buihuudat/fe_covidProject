import { toast } from "react-toastify";

export const notificationPromise = (
  func,
  peddingMess,
  successMess,
  errorMess
) => {
  toast.promise(func, {
    pending: peddingMess,
    success: successMess,
    error: errorMess,
  });
};
