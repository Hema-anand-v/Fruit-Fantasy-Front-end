import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Person,
  Home,
  Menu as MenuIcon,
  Login,
  Logout,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";
import AuthContext from "../../context/AuthContext";
import Badge from "@mui/material/Badge";
import CartPanel from "../CartPanel/CartPanel";
import { useContext } from "react";
import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "../../reducers/cartReducer";

type HeaderProps = {
  children?: ReactNode;
  cart: CartItem[];
  totalPrice?: number;
  onRemoveFromCart: (id: number) => void;
  onClearCart: () => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
};

export default function Header({
  children,
  cart,
  totalPrice = 0,
  onRemoveFromCart,
  onClearCart,
  onUpdateQuantity,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, logout, rootState } = useContext(AuthContext)!;
  const [cartOpen, setCartOpen] = useState(false);

  console.log("Header re-rendered");

  const navigateToHome = () => navigate(isLoggedIn ? "/home" : "/");

  const cartCount: number = useMemo(
    () => rootState.cart.cart.length,
    [rootState.cart.cart]
  );

  const wishlistCount = useMemo(
    () => rootState.wishlist.wishlist.length,
    [rootState.wishlist.wishlist]
  );

  const handleMobileMenuOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileOpen(false);
  };
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "goldenrod",
        color: "#fff",
        padding: "12px 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          noWrap
          component="h5"
          sx={{
            fontFamily: "Montserrat Alternates, sans-serif",
            display: { xs: "none", md: "block" },
            color: "red",
          }}
        >
          FruitFantasy
        </Typography>

        {children}

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="Menu"
            color="inherit"
            onClick={handleMobileMenuOpen}
            sx={{ minWidth: "100px" }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Icons */}
        {isLoggedIn && (
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="Home"
              sx={{ color: "white" }}
              onClick={navigateToHome}
            >
              <Home />
            </IconButton>
            <Link to="/profile">
              <IconButton
                size="large"
                aria-label="Account"
                sx={{ color: "white" }}
              >
                <Person />
              </IconButton>
            </Link>
            {/* Cart Icon */}
            <IconButton
              size="large"
              aria-label="Cart"
              sx={{ color: "white" }}
              onClick={() => setCartOpen(true)}
            >
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            {/* WishList Icon*/}
            <IconButton size="large" aria-label="Cart" sx={{ color: "white" }}>
              <Badge badgeContent={wishlistCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <IconButton
                size="large"
                aria-label="Login"
                sx={{ color: "white" }}
                onClick={() => logout()}
              >
                <Logout />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                sx={{ color: "white" }}
                onClick={navigateToHome}
              >
                <Login />
              </IconButton>
            )}
          </Box>
        )}
        {/* Cart Panel */}
        {isLoggedIn && (
          <CartPanel
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cart={cart}
            totalPrice={totalPrice}
            onRemove={onRemoveFromCart}
            onClear={onClearCart}
            onUpdateQuantity={onUpdateQuantity}
          />
        )}
        {/* Mobile Menu Icons */}
        {isLoggedIn && (
          <Menu
            open={mobileOpen}
            onClose={handleMobileMenuClose}
            sx={{ display: { xs: "flex", md: "none" } }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleMobileMenuClose}>
              <Link to="/home">
                <IconButton size="large" aria-label="Home" color="inherit">
                  <Home />
                </IconButton>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Link to="/profile">
                <IconButton size="large" aria-label="Person" color="inherit">
                  <Person />
                </IconButton>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Link to="/cart">
                <IconButton size="large" aria-label="Cart" color="inherit">
                  <Badge badgeContent={cartCount} color="secondary">
                    <Favorite />
                  </Badge>
                </IconButton>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              <Link to="/cart">
                <IconButton size="large" aria-label="Cart" color="inherit">
                  <Badge badgeContent={wishlistCount} color="secondary">
                    <Favorite />
                  </Badge>
                </IconButton>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMobileMenuClose}>
              {isLoggedIn ? (
                <IconButton
                  size="large"
                  aria-label="Login"
                  sx={{ color: "white" }}
                  onClick={() => logout()}
                >
                  <Logout />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  sx={{ color: "white" }}
                  onClick={navigateToHome}
                >
                  <Login />
                </IconButton>
              )}
            </MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
}
