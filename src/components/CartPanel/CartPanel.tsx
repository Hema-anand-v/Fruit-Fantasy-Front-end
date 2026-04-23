import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import type { CartItem } from "../../reducers/cartReducer";
import calculateDiscountedPrice from "../../utils/calculateDiscountedPrice";

type CartPanelProps = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  totalPrice: number;
  onRemove: (id: number) => void;
  onUpdateQuantity?: (id: number, quantity: number) => void;
  onClear: () => void;
};

const CartPanel: React.FC<CartPanelProps> = ({
  open,
  onClose,
  cart,
  totalPrice,
  onRemove,
  onUpdateQuantity,
  onClear,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 320, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {cart.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Your cart is empty
          </Typography>
        ) : (
          <>
            <List>
              {cart.map((item) => (
                <ListItem
                  key={item.fruit.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onRemove(item.fruit.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
        primary={
          <Box display="flex" alignItems="center" gap={2}>
            <Typography>{item.fruit.name}</Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity?.(item.fruit.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                –
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                size="small"
                onClick={() => onUpdateQuantity?.(item.fruit.id, item.quantity + 1)}
              >
                +
              </IconButton>
            </Box>
          </Box>
        }
        secondary={`₹ ${calculateDiscountedPrice(item.fruit)}`}
      />
                </ListItem>
                
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1">
              Total: ₹{totalPrice.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 2 }}
              onClick={onClear}
            >
              Clear Cart
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartPanel;
