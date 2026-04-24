import { useMemo, useEffect, useState, type ChangeEvent } from "react";
import { fruitApi } from "../../api/fruitapi";
import type { Fruit } from "../../types/Fruit";
import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";
import FruitList from "../FruitList/FruitList";

export default function AdvancedSearchFruit() {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Replace the buildSearchUrl and useFetch logic with:
  const [allFruits, setAllFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fruitApi.getAll();
        setAllFruits(response.data);
      } catch (err) {
        console.error("Failed to fetch fruits:", err);
        setError(
          `Failed to fetch fruits: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFruits();
  }, []);

  const filteredResults = useMemo(() => {
    if (!shouldSearch || !allFruits) return [];

    return allFruits.filter((fruit) => {
      const matchesCategory =
        !category.trim() ||
        fruit.name.toLowerCase().includes(category.toLowerCase());
      const matchesPrice = !minPrice || Number(fruit.price) >= Number(minPrice);
      return matchesCategory && matchesPrice;
    });
  }, [allFruits, category, minPrice, shouldSearch]);

  const handleSearch = () => {
    if (category.trim() || minPrice) {
      setShouldSearch(true);
      setSearchCount((prev) => prev + 1);
    }
  };

  const handleClear = () => {
    setCategory("");
    setMinPrice("");
    setShouldSearch(false);
    console.log("Search cleared - no API call will be made");
  };

  const isSearchEnabled = category.trim().length >= 2 || minPrice;

  return (
    <Box sx={{ padding: 3, maxWidth: "95%", margin: "0 auto" }}>
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        🔍 Advanced Fruit Search - By Category & Price
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Paper
        sx={{
          backgroundColor: "#f9f9f9",
          width: { xs: "100%", md: "60%" },
          margin: "0 auto",
          padding: 3,
          borderRadius: 2,
          border: "1px solid #ddd",
          mb: 3,
        }}
      >
        {!shouldSearch && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter a category or minimum price and click "Search" to begin.
          </Typography>
        )}

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid>
            <TextField
              fullWidth
              label="Category"
              value={category}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCategory(e.target.value)
              }
              placeholder="e.g., tropical, citrus..."
            />
          </Grid>
          <Grid>
            <TextField
              fullWidth
              label="Min Price (₹)"
              type="number"
              value={minPrice}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMinPrice(e.target.value)
              }
              placeholder="e.g., 100"
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleSearch}
            disabled={!isSearchEnabled}
          >
            🔍 Search Fruits
          </Button>
          <Button variant="contained" color="error" onClick={handleClear}>
            Clear
          </Button>
          <Typography variant="body2" color="text.secondary">
            Searches performed: {searchCount}
          </Typography>
        </Box>
        {shouldSearch && filteredResults && !loading && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Search Results ({filteredResults.length} found)
            </Typography>
            <FruitList
              fruits={filteredResults}
              onDeleteFruit={() => {}} // No-op for search results
              onAddToCart={() => {}} // No-op for search results
              onToggleWishlist={() => {}} // No-op for search results
              onClearWishlist={() => {}} // No-op for search results
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
