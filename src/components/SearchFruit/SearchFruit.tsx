import type { JSX, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { InputAdornment } from "@mui/material";

type SearchFruitProps = {
  searchText: string;
  onSearchFruit: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearSearchFruit: () => void;
};

function SearchFruit({
  searchText,
  onSearchFruit,
  onClearSearchFruit,
}: SearchFruitProps): JSX.Element {
  console.log("SearchFruit rendered");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="5px"
      gap={1}
    >
      <TextField
        value={searchText}
        placeholder="Search for fruits"
        onChange={onSearchFruit}
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "goldenrod",
          "& .MuiOutlinedInput-root": {
            border: "none",
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchText !== "" && (
              <InputAdornment position="end">
                <IconButton onClick={onClearSearchFruit} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
}

export default SearchFruit;
