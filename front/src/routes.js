import ArgonBox from "components/ArgonBox";
import Distribution from "layouts/distribution/Distribution";
import StatistiqueDistribution from "layouts/distribution/StatistiqueDistribution";
import GestionMpiangona from "layouts/Mpiangona/GestionMpiangona";
import StatistiqueMpiangona from "layouts/Mpiangona/StatistiqueMpiangona";

const routes = [
  {
    type: "route",
    name: "Statistique Distribution",
    key: "dashboard",
    route: "/dashboard",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-chart-bar-32" />
    ),
    component: <StatistiqueDistribution />,
  },
  {
    type: "route",
    name: "Statistique Mpiangona",
    key: "Statistique-Mpiangona",
    route: "/Statistique-Mpiangona",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
    ),
    component: <StatistiqueMpiangona />,
  },
  {
    type: "route",
    name: "Distribution Dekonina",
    key: "Distribution",
    route: "/Distribution",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-settings" />
    ),
    component: <Distribution />,
  },
  {
    type: "route",
    name: "Gestion Mpiangona",
    key: "Gestion-Mpiangona",
    route: "/Gestion-Mpiangona",
    icon: (
      <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
    ),
    component: <GestionMpiangona />,
  },
  // {
  //   type: "route",
  //   name: "Dashboard",
  //   key: "dashboard",
  //   route: "/dashboard",
  //   icon: <ArgonBox component="i" color="primary" fontSize="14px" className="ni ni-tv-2" />,
  //   component: <Dashboard />,
  // },
  // {
  //   type: "route",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-calendar-grid-58" />
  //   ),
  //   component: <Tables />,
  // },

  // {
  //   type: "route",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <ArgonBox component="i" color="success" fontSize="14px" className="ni ni-credit-card" />,
  //   component: <Billing />,
  // },
  // {
  //   type: "route",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-app" />,
  //   component: <VirtualReality />,
  // },
  // {
  //   type: "route",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <ArgonBox component="i" color="error" fontSize="14px" className="ni ni-world-2" />,
  //   component: <RTL />,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "route",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <ArgonBox component="i" color="dark" fontSize="14px" className="ni ni-single-02" />,
  //   component: <Profile />,
  // },
  // {
  //   type: "route",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: (
  //     <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-copy-04" />
  //   ),
  //   component: <SignIn />,
  // },
  // {
  //   type: "route",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <ArgonBox component="i" color="info" fontSize="14px" className="ni ni-collection" />,
  //   component: <SignUp />,
  // },
];

export default routes;
