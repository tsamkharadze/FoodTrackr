// export interface Food {
//   id: string;
//   product_name: string;
//   brands?: string;
//   categories?: string;
//   nutriments: {
//     energy_kcal_100g?: number;
//     proteins_100g?: number;
//     carbohydrates_100g?: number;
//     fat_100g?: number;
//     fiber_100g?: number;
//   };
//   image_url?: string;
//   serving_size?: string;
// }

import { Database } from "@/supabase/supabase.types";

export type Food = Database["public"]["Tables"]["foods_database"]["Row"];
