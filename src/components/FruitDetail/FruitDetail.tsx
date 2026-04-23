import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  TextField,
  CardActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect, useRef } from "react";
import type { JSX } from "react";
import { Link } from "react-router-dom";
import type { SelectChangeEvent } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { fruitApi } from "../../api/fruitapi";
import type { Fruit } from "../../types/Fruit";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

// Define props type
type FruitDetailProps = {
  onEditFruit: (fruit: Fruit) => Promise<void> | void;
  onDeleteFruit: (id: number) => void;
};

export default function FruitDetail({
  onEditFruit,
  onDeleteFruit,
}: FruitDetailProps): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext)!;
  const image = useRef<string>("");
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    unit: "kg",
    discount: 0,
  });
  const [fruit, setFruit] = useState<Fruit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFruit = async () => {
      if (!id) return;
      try {
        const response = await fruitApi.getById(Number(id));
        setFruit(response.data);
      } catch (err) {
        setError("Failed to fetch fruit");
      } finally {
        setLoading(false);
      }
    };
    fetchFruit();
  }, [id]);

  // Sync fruit data to form state when fetched
  useEffect(() => {
    if (fruit) {
      setFormData({
        name: fruit.name,
        price: fruit.price || 0,
        unit: fruit.unit || "kg",
        discount: fruit.discount || 0,
      });
      image.current = `/images/fruits/${fruit.image}`;
    }
  }, [fruit]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSelectChange = (e: SelectChangeEvent<string | string[]>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const deleteFruit = () => {
    if (fruit) {
      onDeleteFruit(fruit.id);
      navigate("/home");
    }
  };

  const editFruit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fruit) return;
    try {
      const updatedFruit: Fruit = {
        ...fruit,
        price: formData.price,
        unit: formData.unit,
        discount: formData.discount,
      };
      await onEditFruit(updatedFruit);
      navigate("/home");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  // Handle loading and error states from useFetch
  if (loading) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading fruit details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4, color: "red" }}>
          {error}
        </Typography>
      </Container>
    );
  }

  if (!fruit) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" sx={{ mt: 4 }}>
          Loading fruit details...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: "95vh" }}>
      <Card
        sx={{
          maxWidth: 450,
          bgcolor: "#fafafa",
          boxShadow: 3,
          margin: 3,
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={image.current}
          alt={fruit.name}
          sx={{ objectFit: "cover" }}
        />
        <form onSubmit={editFruit}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {fruit.name}
            </Typography>

            <TextField
              variant="standard"
              margin="normal"
              label="Price"
              fullWidth
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="unit-label">Unit</InputLabel>
              <Select
                labelId="unit-label"
                id="unit"
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
              variant="standard"
              margin="normal"
              fullWidth
              type="number"
              label="Discount (%)"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              inputProps={{ min: 0, max: 95 }}
            />
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              component={Link}
              to="/home"
              sx={{ color: "#1976d2" }}
            >
              Back
            </Button>
            <Box>
              <IconButton color="success" type="submit" size="large">
                <SaveIcon />
              </IconButton>
              <IconButton color="error" onClick={deleteFruit}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
}
