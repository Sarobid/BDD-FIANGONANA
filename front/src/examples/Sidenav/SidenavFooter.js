/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI context
import { useArgonController } from "context";

// Images

function SidenavFooter() {
  const [controller] = useArgonController();
  const { miniSidenav, darkSidenav } = controller;

  return (
    <ArgonBox opacity={miniSidenav ? 0 : 1} sx={{ transition: "opacity 200ms linear" }}>
      <ArgonBox position="relative" textAlign="center">
        <ArgonBox component="img" src={'/fond.jpg'} alt="sidebar_illustration" width="60%" />
        <ArgonBox
          width="100%"
          pb={2}
          px={2}
          color={darkSidenav ? "white" : "dark"}
          textAlign="center"
          lineHeight={0}
        >
          <ArgonTypography color="inherit" variant="h6">
            FJKM Isotry Fitiavana
          </ArgonTypography>
          <ArgonTypography color="inherit" variant="caption">
            
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </ArgonBox>
  );
}

export default SidenavFooter;
