// import { Food } from "@/types/food";

// const API_URL = "https://world.openfoodfacts.org/api/v2";

// export async function getPopularFoods(): Promise<Food[]> {
//   try {
//     const response = await fetch(
//       `${API_URL}/search?sort_by=popularity_key&page_size=1000&fields=id,product_name,brands,categories,nutriments,image_url,serving_size`,
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch foods");
//     }

//     const data = await response.json();
//     return data.products.map((product: any) => ({
//       id: product.id,
//       product_name: product.product_name,
//       brands: product.brands,
//       categories: product.categories,
//       nutriments: {
//         energy_kcal_100g: product.nutriments.energy_kcal_100g,
//         proteins_100g: product.nutriments.proteins_100g,
//         carbohydrates_100g: product.nutriments.carbohydrates_100g,
//         fat_100g: product.nutriments.fat_100g,
//         fiber_100g: product.nutriments.fiber_100g,
//       },
//       image_url: product.image_url,
//       serving_size: product.serving_size,
//     }));
//   } catch (error) {
//     console.error("Error fetching foods:", error);
//     throw error;
//   }
// }
