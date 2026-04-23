import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  Card,
  CardContent,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useState } from "react";
import type { JSX } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { Fruit } from "../../types/Fruit";

type AddFruitFormProps = {
  onAddFruit: (fruit: Fruit) => void;
};

const benefitsOptions = [
  { value: "boosts-immunity", label: "Boosts Immunity" },
  { value: "improves-digestion", label: "Improves Digestion" },
  { value: "healthy-skin", label: "Healthy Skin" },
  { value: "eye-health", label: "Eye Health" },
];

export default function AddFruitForm({
  onAddFruit,
}: AddFruitFormProps): JSX.Element {
  const [formData, setFormData] = useState({
    fruitName: "",
    price: "",
    unit: "kg",
    discount: "",
    category: "",
    benefits: [],
  });

  const [expanded, setExpanded] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateInput = (name: string, value: string | number | string[]) => {
    const newErrors = { ...errors };
    if (name === "fruitName") {
      if (!value || (typeof value === "string" && value.length < 3)) {
        newErrors.fruitName = "Fruit name must be at least 3 characters.";
      } else delete newErrors.fruitName;
    }
    if (name === "price") {
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors.price = "Enter a valid positive price.";
      } else delete newErrors.price;
    }
    if (name === "discount") {
      const num = Number(value);
      if (!value || isNaN(num) || num < 5 || num > 95) {
        newErrors.discount = "Discount value must be between 5 and 95.";
      } else delete newErrors.discount;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string | string[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const clearFormData = () => {
    setFormData({
      fruitName: "",
      price: "",
      unit: "kg",
      discount: "",
      category: "",
      benefits: [],
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate before submit
    if (
      !validateInput("fruitName", formData.fruitName) ||
      !validateInput("price", formData.price)
    ) {
      return;
    }
    try {
      const fruitName = formData.fruitName.toLowerCase();
      const newFruit: Fruit = {
        id: Date.now(),
        name: fruitName,
        price: Number(formData.price),
        unit: formData.unit,
        discount: formData.discount ? Number(formData.discount) : undefined,
        category: formData.category,
        image: `${fruitName}.jpg`,
        benefits: formData.benefits as string[],
      };
      onAddFruit(newFruit);
      clearFormData();
    } catch (error) {
      console.error("Error submitting form:", error);
      clearFormData();
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <Card sx={{ bgcolor: "#fafafa", boxShadow: 3 }}>
        <CardContent onClick={handleExpandClick}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            Add Fruit Details
          </Typography>
          <ExpandMoreIcon
            sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Fruit Name"
                name="fruitName"
                value={formData?.fruitName}
                onChange={handleChange}
                onBlur={() => validateInput("fruitName", formData?.fruitName)}
                error={!!errors?.fruitName}
                helperText={errors.fruitName}
                fullWidth
                margin="normal"
              />

              <TextField
                label="Price (Rs)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                onBlur={() => validateInput("price", formData.price)}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="unit-label">Unit</InputLabel>
                <Select
                  labelId="unit-label"
                  name="unit"
                  value={formData.unit}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="kg">Kg</MenuItem>
                  <MenuItem value="dozen">Dozen</MenuItem>
                  <MenuItem value="piece">Piece</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Discount (%)"
                name="discount"
                type="number"
                inputProps={{ min: 0, max: 95 }}
                error={!!errors.discount}
                helperText={errors.discount}
                value={formData.discount}
                onBlur={() => validateInput("discount", formData.discount)}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="tropical">Tropical</MenuItem>
                  <MenuItem value="berries">Berries</MenuItem>
                  <MenuItem value="vine">Vine</MenuItem>
                  <MenuItem value="citrus">Citrus</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="benefits-label">Benefits</InputLabel>
                <Select
                  labelId="benefits-label"
                  name="benefits"
                  multiple
                  value={formData.benefits}
                  onChange={handleSelectChange}
                >
                  {benefitsOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Buttons */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button
                  type="button"
                  variant="outlined"
                  onClick={clearFormData}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    color: "#2F4F4F",
                    borderColor: "#2F4F4F",
                    "&:hover": { borderColor: "#1e3535", color: "#1e3535" },
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    bgcolor: "#2E7D32",
                    "&:hover": { bgcolor: "#256628" },
                  }}
                >
                  Add Fruit
                </Button>
              </Box>
            </form>
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
