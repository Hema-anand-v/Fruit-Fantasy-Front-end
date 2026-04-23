import { useState, type ChangeEvent } from "react";
import useFetch from "../../hooks/useFetch";
import type { Fruit } from "../../types/Fruit";
import ErrorMessage from "../ErrorMessage";
import FruitManager from "../../pages/FruitManager/FruitManager";

import { Box, Typography, TextField, Button, Grid, Paper } from "@mui/material";

export default function AdvancedSearchFruit() {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  const buildSearchUrl = (): string => {
    if (!shouldSearch) return "";

    const url = "http://localhost:3000/fruits?";
    const params: string[] = [];

    if (category.trim()) {
      params.push(`category=${encodeURIComponent(category)}`);
    }

    if (minPrice && !isNaN(Number(minPrice))) {
      params.push(`price_gte=${minPrice}`);
    }

    return url + params.join("&");
  };

  const searchUrl = buildSearchUrl();
  const { data: fetchedResults, loading, error } = useFetch<Fruit[]>(searchUrl);

  const handleSearch = () => {
    if (category.trim() || minPrice) {
      setShouldSearch(true);
      setSearchCount((prev) => prev + 1);
      console.log(`Search triggered! URL will be: ${buildSearchUrl()}`);
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

        {shouldSearch && (
          <Box sx={{ fontSize: "0.85rem", color: "#e65100" }}>
            <strong>Current Search URL: </strong>
            <code>{searchUrl || "No active search"}</code>
          </Box>
        )}
      </Paper>

      {error && <ErrorMessage message={`Search failed: ${error}`} />}

      {shouldSearch && fetchedResults && !loading && (
        <Box>
          {Array.isArray(fetchedResults) ? (
            <FruitManager fruits={fetchedResults} />
          ) : (
            <ErrorMessage message="We couldn’t load the search results. Please try again." />
          )}
        </Box>
      )}
    </Box>
  );
}
