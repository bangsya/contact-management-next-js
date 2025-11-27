import Swal from "sweetalert2";

export const alertSuccess = async (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

export const alertError = async (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

export const alertConfirm = async (message: string) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: message,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "oklch(62.3% 0.214 259.815)",
    cancelButtonText: "No",
    cancelButtonColor: "#d33",
  });
  return result.isConfirmed;
};
