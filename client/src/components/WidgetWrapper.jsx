import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
   padding: "24px 24px 12px 24px",
   backgroundColor: theme.palette.background.alt,
   borderRadius: "12px"
}));

export default WidgetWrapper;
