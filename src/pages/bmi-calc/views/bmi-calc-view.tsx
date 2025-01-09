import BmiCalc from "../components/bmi-calc";

const BmiCalcView = () => {
  // fetch(
  //   "https://world.openfoodfacts.org/cgi/search.pl?search_terms=Buckwheat&json=true"
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     const essentialData = data.products.map((product) => ({
  //       product_name: product.product_name,
  //       brands: product.brands,
  //       energy_kcal: product.nutriments?.["energy-kcal_100g"],
  //       sugars: product.nutriments?.["sugars_100g"],
  //       fat: product.nutriments?.["fat_100g"],
  //       carbohydrates: product.nutriments?.["carbohydrates_100g"], // Added carbs here
  //       image_url: product.image_url,
  //     }));
  //     console.log(essentialData);
  //   });

  return <BmiCalc />;
};

export default BmiCalcView;
