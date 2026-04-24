import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";
import type { JSX, ChangeEvent } from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SearchFruit from "./components/SearchFruit/SearchFruit.tsx";
import type { Fruit } from "./types/Fruit.ts";
import filterFruits from "./utils/FilterFruits.ts";
import { fruitApi } from "./api/fruitapi.ts";
import AuthContext from "./context/AuthContext.tsx";
import { useContext } from "react";

// ✅ MUI imports
import { Box, Button, Alert, Snackbar } from "@mui/material";
import AppRoutes from "./routes/AppRoutes.tsx";
import calculateDiscountedPrice from "./utils/calculateDiscountedPrice.ts";

export default function App(): JSX.Element {
  const renderCount = useRef(0);
  renderCount.current++;
  console.log(`App render count: ${renderCount.current}`);

  const [filteredFruits, setFilteredFruits] = useState<Fruit[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  //  const [role, setRole] = useState<string | null>(() =>
  //   localStorage.getItem("role")
  // );

  // useEffect(() => {
  //   if (role) {
  //     localStorage.setItem("role", role);
  //   } else {
  //     localStorage.removeItem("role");
  //   }
  // }, [role]);

  const { isLoggedIn, role, rootDispatch, rootState } =
    useContext(AuthContext)!;

  const totalPrice = useMemo(() => {
    return rootState.cart.cart.reduce((sum, item) => {
      // const price = Number(item.fruit.price) || 0; // defensive cast
      const price = calculateDiscountedPrice(item.fruit);
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);
  }, [rootState.cart.cart]);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    type: "success" | "error";
    msg: string;
  }>({
    open: false,
    type: "success",
    msg: "",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await fruitApi.getAll();
        setFruits(response.data);
      } catch (err) {
        setError(
          `Failed to fetch fruits: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    };
    fetchFruits();
  }, []);

  // Update filtered fruits (basic view only)
  useEffect(() => {
    if (!isAdvancedSearch) {
      const updatedList = filterFruits(fruits ?? [], searchText);
      setFilteredFruits(updatedList);
    }
  }, [searchText, fruits, isAdvancedSearch]);
  // Update document title
  useEffect(() => {
    if (isAdvancedSearch) {
      document.title = "Advanced Search - Fruit Fantasy";
    } else if (searchText.trim()) {
      document.title = `Searching for: ${searchText}`;
    } else {
      document.title = "Fruit Fantasy";
    }
  }, [searchText, isAdvancedSearch]);

  function handleSearchFruit(e: ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  function handleClearSearchFruit(): void {
    setSearchText("");
  }

  const handleToggleWishList = useCallback(
    (fr: Fruit) => {
      // Here you can find the fruit object by ID from your state
      const fruit = fruits?.find((f) => f.id === fr.id);
      if (fruit) {
        rootDispatch({ type: "TOGGLE_WISHLIST", payload: fruit });
      }
    },
    [rootDispatch, fruits],
  );

  const handleClearWishlist = () => {
    rootDispatch({ type: "CLEAR_WISHLIST" }); // ✅ dispatch clear action
  };

  const handleAddToCart = useCallback(
    (fr: Fruit) => {
      console.log("handleAddToCart created");
      const fruit = fruits?.find((f) => f.id === fr.id);
      if (fruit) {
        rootDispatch({ type: "ADD_TO_CART", payload: fruit });
      }
    },
    [rootDispatch, fruits],
  );

  // --- Reference comparison logic ---
  const prevHandlerRef = useRef<typeof handleAddToCart | null>(null);

  useEffect(() => {
    if (prevHandlerRef.current === handleAddToCart) {
      console.log("✅ handleAddToCart reference is STABLE");
    } else {
      console.log(
        "⚠️ handleAddToCart reference CHANGED (new function created)",
      );
      prevHandlerRef.current = handleAddToCart;
    }
  });

  const handleRemoveFromCart = useCallback(
    (fruitId: number) => {
      const fruit = fruits?.find((f) => f.id === fruitId);
      if (fruit) {
        rootDispatch({ type: "REMOVE_FROM_CART", payload: fruitId });
      }
    },
    [rootDispatch, fruits],
  );

  const handleClearCart = () => {
    rootDispatch({ type: "CLEAR_CART" });
  };

  const handleUpdateQuantity = useCallback(
    (fruitId: number, quantity: number) => {
      rootDispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: fruitId, quantity },
      });
    },
    [rootDispatch],
  );

  const handleAddFruit = async (newFruit: Fruit) => {
    try {
      const response = await fruitApi.create(newFruit);
      setFruits((prev) => [...prev, response.data]);
      setSnackbar({
        open: true,
        type: "success",
        msg: "Fruit added successfully!",
      });
    } catch (err) {
      setError(
          `Failed to add fruit: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to add fruit. Try again.",
      });
    }
  };

  const handleEditFruit = async (fruit: Fruit) => {
    try {
      const response = await fruitApi.update(fruit.id, fruit);
      setFruits((prev) =>
        prev.map((f) => (f.id === fruit.id ? response.data : f)),
      );
      setSnackbar({
        open: true,
        type: "success",
        msg: "Fruit updated successfully!",
      });
    } catch (err) {
      setError(
          `Failed to update fruit: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to edit fruit. Try again.",
      });
    }
  };

  const handleDeleteFruit = async (id: number) => {
    try {
      await fruitApi.delete(id);
      setFruits((prev) => prev.filter((f) => f.id !== id));
      setSnackbar({
        open: true,
        type: "success",
        msg: "Fruit deleted successfully!",
      });
    } catch (err) {
      setError(
          `Failed to delete fruit: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      setSnackbar({
        open: true,
        type: "error",
        msg: "Failed to delete fruit. Try again.",
      });
    }
  };

  const toggleButton = isAdvancedSearch ? "advanced" : "basic";

  return (
    <Box>
      <Header
        cart={rootState.cart.cart}
        totalPrice={totalPrice}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onUpdateQuantity={handleUpdateQuantity}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {isLoggedIn && (
            <>
              {!isAdvancedSearch && (
                <SearchFruit
                  searchText={searchText}
                  onSearchFruit={handleSearchFruit}
                  onClearSearchFruit={handleClearSearchFruit}
                />
              )}
              <Button
                variant="contained"
                onClick={() => setIsAdvancedSearch((prev) => !prev)}
                sx={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  bgcolor: toggleButton === "basic" ? "#4caf50" : "#f1f1f1",
                  color: toggleButton === "basic" ? "white" : "black",
                  "&:hover": {
                    bgcolor: toggleButton === "basic" ? "#43a047" : "#e0e0e0",
                  },
                }}
              >
                {isAdvancedSearch
                  ? "⬅ Back to Basic View"
                  : "🔍 Advanced Search"}
              </Button>
            </>
          )}
        </Box>
      </Header>

      <Box
        component="main"
        sx={{
          minHeight: "95vh",
          backgroundColor: "#f0e9d6",
          padding: 2,
        }}
      >
        <AppRoutes
          isAdvancedSearch={isAdvancedSearch}
          fruits={fruits ?? []}
          filteredFruits={filteredFruits}
          loading={loading}
          error={error}
          onAddFruit={handleAddFruit}
          onEditFruit={handleEditFruit}
          onDeleteFruit={handleDeleteFruit}
          role={role ?? ""}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishList}
          onClearWishlist={handleClearWishlist}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.type}
          sx={{ width: "100%", fontSize: "1.2rem" }}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
      <Footer />
    </Box>
  );
}
