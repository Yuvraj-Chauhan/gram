import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Advertisement</Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advertisement"
        src="http://localhost:3001/assets/info4.jpeg"
        style={{ borderRadius: "12px", margin: "12px 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Cosmetics</Typography>
        <Typography color={medium}>cosmetics.com</Typography>
      </FlexBetween>
      <Typography color={medium} margin="8px 0">
        Redefining the power of makeup, come to us for the best beauty products.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
