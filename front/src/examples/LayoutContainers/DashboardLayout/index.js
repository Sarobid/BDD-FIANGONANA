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

import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI context
import { setLayout, useArgonController } from "context";

function DashboardLayout({ bgColor, children, ...rest }) {
  const [controller, dispatch] = useArgonController();
  const { miniSidenav, darkMode } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  const background = darkMode && !bgColor ? "transparent" : bgColor;
  const imageUrl = '/fond.jpg'
  return (
    <ArgonBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,

        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {/* <ArgonBox
        bgColor={background || "info"}
        height="200px"
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        sx={{
          backgroundImage: `url(${imageUrl})`, // Remplacez `imageUrl` par le lien de votre image
          backgroundSize: "cover",              // Pour couvrir tout l'espace
          backgroundPosition: "center",         // Centrer l'image
          ...(darkMode && { backgroundImage: `url(${darkImageUrl})` }) // Image différente pour le mode sombre, si nécessaire
        }}
        // sx={darkMode && { bgColor: ({ palette: { background } }) => background.default }}
        {...rest}
      /> */}
      <ArgonBox
        height="150px"
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        display="flex" // Utilise flexbox pour diviser l'espace en deux
      >
        {/* Demi-gauche avec une couleur de fond */}
        <ArgonBox
          flex={2} // Utilise 50% de la largeur
          bgColor={background || "info"}
          height="100%" // Prend toute la hauteur du conteneur parent
        />

        {/* Demi-droite avec une image en fond */}
        <ArgonBox
          flex={1} // Utilise 50% de la largeur
          height="100%" // Prend toute la hauteur du conteneur parent
          sx={{
            backgroundImage: `url(${imageUrl})`, // Remplacez `imageUrl` par l'URL de votre image
            backgroundSize: "cover",              // Couvre l'espace
            backgroundPosition: "center",         // Centre l'image
            ...(darkMode && { backgroundImage: `url(${darkImageUrl})` }) // Image pour le mode sombre
          }}
        />
      </ArgonBox>

      {children}
    </ArgonBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
