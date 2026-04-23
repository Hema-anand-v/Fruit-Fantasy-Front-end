// src/pages/AdminDashboard/AdminDashboard.tsx
import { Box, Typography } from "@mui/material";
import type { Fruit } from "../../types/Fruit";
import FruitList from "../../components/FruitList/FruitList";
import AddFruitForm from "../../components/AddFruitForm/AddFruitForm";
import type { JSX } from "react";

interface AdminDashboardProps {
  fruits: Fruit[];
  onAddFruit: (fruit: Fruit) => void;
  onDeleteFruit: (id: number) => void;
}

export default function AdminDashboard({
  fruits,
  onAddFruit,
  onDeleteFruit,
}: AdminDashboardProps): JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Admin-only Add Fruit form */}
      <AddFruitForm onAddFruit={onAddFruit} />

      {/* Fruit list with admin privileges */}
      <FruitList
        fruits={fruits}
        onDeleteFruit={onDeleteFruit}
        onAddToCart={() => {}}
        onToggleWishlist={() => {}}
        onClearWishlist={() => {}}
      />
    </Box>
  );
}
