import { useMemo, useState } from "react";
import type { JSX } from "react";
import FruitCard from "../FruitCard/FruitCard";
import type { Fruit } from "../../types/Fruit";
import type { SelectChangeEvent } from "@mui/material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
} from "@mui/material";
//import Grid from "@mui/material/Grid"; // ✅ Classic Grid that supports item/container

type FruitListProps = {
  fruits: Fruit[];
  onDeleteFruit: (id: number) => void; // delete handler
  onAddToCart: (fruit: Fruit) => void;
  onToggleWishlist: (fruit: Fruit) => void;
  onClearWishlist: () => void;
};

function FruitList({
  fruits,
  onDeleteFruit,
  onAddToCart,
  onToggleWishlist,
  onClearWishlist
}: FruitListProps): JSX.Element {
  const [sortBy, setSortBy] = useState<string>("");

  function handleSortChange(e: SelectChangeEvent<string>): void {
    setSortBy(e.target.value);
  }

  // const sortedFruits = [...fruits].sort((a, b) => {
  //   if (sortBy === "name") return a.name.localeCompare(b.name);
  //   if (sortBy === "price") return a.price - b.price;
  //   return 0;
  // });
  const sortedFruits = useMemo(() => {
    console.log("Sorting by:", sortBy);
    if (!sortBy) return fruits;           // early exit
    const copy = [...fruits];
    copy.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });
    return copy;
  }, [fruits, sortBy]);

  return (
    <>
      {/* Sort Dropdown */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          m: "1rem 2.2rem 1.5rem",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort by"
          >
            <MenuItem value="">
              <em>--Select--</em>
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={onClearWishlist} // ✅ attach clear wishlist handler here passed as prop from App
          sx={{
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "#ffebee" },
          }}
        >
          🗑️ Clear Wishlist
        </Button>
      </Box>

      {/* Fruit List */}
      <Grid
        container
        spacing={2}
        sx={{
          pb: "30px",
          mx: "30px",
        }}
      >
        {sortedFruits.map((fruit: Fruit) => (
          <Grid key={fruit.id}>
            <FruitCard
              fruit={fruit}
              onDeleteFruit={onDeleteFruit}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FruitList;
