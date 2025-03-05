const payment = async (
  previousState: { success: boolean; error: boolean; address: null | string },
  formData: FormData
) => {
  const address = formData.get("address");
  if (typeof address === "string" && address.length > 0) {
    return { ...previousState, success: true, error: false, address };
  } else {
    return { ...previousState, success: false, error: true, address: null };
  }
};

export { payment };
