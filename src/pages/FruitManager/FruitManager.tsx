import { Box, Typography } from "@mui/material";
import FruitList from "../../components/FruitList/FruitList.tsx";
import type { Fruit } from "../../types/Fruit.ts";
import type { JSX } from "react";
import AddFruitForm from "../../components/AddFruitForm/AddFruitForm.tsx";

interface FruitManagerProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  onDeleteFruit: (id: number) => void;
  onAddToCart: (fruit: Fruit) => void;
  onToggleWishlist: (fruit: Fruit) => void;
  onClearWishlist: () => void;
  role: string; 
}

export default function FruitManager({
  fruits,
  onAddFruit,
  onDeleteFruit,
  onAddToCart,
  onToggleWishlist,
  onClearWishlist,
  role,
}: FruitManagerProps): JSX.Element {
  console.log("FruitManager rendered", fruits);

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}
      >
        Fantasy Picks: Farm-Fresh Organic Fruits
      </Typography>
      {role === "admin" && (
      <AddFruitForm onAddFruit={onAddFruit} />
      )}
      <FruitList
        fruits={fruits}
        onDeleteFruit={onDeleteFruit}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        onClearWishlist={onClearWishlist}
      />
    </Box>
  );
}
