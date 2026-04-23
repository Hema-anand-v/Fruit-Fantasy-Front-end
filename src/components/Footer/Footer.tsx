import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedinIn from "@mui/icons-material/LinkedIn";
import type { JSX } from "react";
import { Box, Typography, IconButton, Stack } from "@mui/material";

function Footer(): JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "goldenrod",
        color: "whitesmoke",
        textAlign: "center",
        py: 2,
      }}
    >
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mb: 1 }}>
        <IconButton
          component="a"
          href="https://facebook.com"
          target="_blank"
          sx={{ color: "common.white", '&:hover': { color: 'success.main' } }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://instagram.com"
          target="_blank"
          sx={{ color: "common.white", '&:hover': { color: 'success.main' } }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com"
          target="_blank"
          sx={{ color: "common.white", '&:hover': { color: 'success.main' } }}
        >
          <LinkedinIn />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        &copy; 2024 FruitFantasy. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;