export const Testloading = async () => {
  try {
    const rel: boolean | undefined = true;
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return rel;
  } catch (error) {
    console.error("Error in Testloading:", error);
  }
};
