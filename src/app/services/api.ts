export const APIs = (param?: { [x: string]: any }) => {
  const BASE_URL: string = `https://fakestoreapi.com`

  const endPoints = {
    products: `${BASE_URL}/products`,
    productDetails: `${BASE_URL}/products/${param?.Product_ID}`,
  }

  return endPoints
}
