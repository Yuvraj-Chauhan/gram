import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
   const theme = useTheme();
   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
   return (
      <Box>
         <Box
            width="100%"
            backgroundColor={theme.palette.background.alt}
            padding="16px 6%"
            textAlign="center"
         >
            <Typography fontWeight="bold" fontSize="32px" color="primary">
               Gram
            </Typography>
         </Box>

         <Box
            width={isNonMobileScreens ? "50%" : "93%"}
            padding="32px"
            margin="32px auto"
            borderRadius="24px"
            backgroundColor={theme.palette.background.alt}
         >
            <Typography fontWeight="600" variant="h5" sx={{ marginBottom: "24px" }}>
               Welcome to Gram!
            </Typography>
            <Form />
         </Box>
      </Box>
   )
}

export default LoginPage;