import type { JSX } from "react";
import type { Fruit } from "../../types/Fruit";
import calculateDiscountedPrice from "../../utils/calculateDiscountedPrice";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext, useRef } from "react";
import AuthContext from "../../context/AuthContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import React from "react";

type FruitCardProps = {
  fruit: Fruit;
  onDeleteFruit: (id: number) => void; // delete handler
  onAddToCart?: (fruit: Fruit) => void;
  onToggleWishlist?: (fruit: Fruit) => void;
};

function FruitCard({
  fruit,
  onDeleteFruit,
  onAddToCart,
  onToggleWishlist,
}: FruitCardProps): JSX.Element {
  const { name, image, price, discount = 0, unit } = fruit;
  const isDiscountAvailable = !!discount;
  const discountedPrice = calculateDiscountedPrice(fruit);
  const { role, rootState } = useContext(AuthContext)!;
  const isInWishlist = rootState.wishlist.wishlist.some(item => item.id === fruit.id);

  const renderCount = useRef(0);
  renderCount.current++;
  console.log(`🍎 FruitCard [${fruit.name}] rendered: ${renderCount.current} times`);


  return (
    <Card
      sx={{
        position: "relative",
        width: 280,
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        backgroundColor: "whitesmoke",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      {/* Discount Badge */}
      {isDiscountAvailable && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "success.main",
            color: "white",
            px: 1,
            py: 0.5,
            fontSize: "0.75rem",
            fontWeight: "bold",
            borderRadius: 1,
            zIndex: 1,
          }}
        >
          {discount}% OFF
        </Box>
      )}

      {/* Fruit Image */}
      <CardMedia
        component="img"
        height="250"
        image={`/images/fruits/${image}`}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      {/* Card Content */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" fontWeight={600} color="green">
          {isDiscountAvailable ? (
            <>
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#888",
                }}
              >
                ₹{price}{" "}
              </span>
              <span> ₹{discountedPrice} </span>/ {unit}
            </>
          ) : (
            <>
              ₹{price} / {unit}
            </>
          )}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        {role === "admin" ? (
          <>
            <Link
              style={{ textDecoration: "none" }}
              color="inherit"
              to={`/fruits/${fruit.id}`}
            >
              <IconButton sx={{ color: "#1976d2" }}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton color="error" onClick={() => onDeleteFruit?.(fruit.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              sx={{
                color: "#757575", // default gray
                "&:hover": { color: "#4caf50" }, // green on hover
              }}
              onClick={() => onAddToCart?.(fruit)}
            >
              <ShoppingCartIcon />
            </IconButton>

            <IconButton
              sx={{
                color: isInWishlist ? "#f44336" : "#757575", // red if in wishlist
                "&:hover": { color: "#f44336" },
              }}
              onClick={() => onToggleWishlist?.(fruit)}
            >
              <FavoriteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default React.memo(FruitCard);
