import { Card, Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import StatistiqueDekonina from "composants/StatistiqueDekonina";
import StatistiqueFiche from "composants/StatistiqueFiche";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function StatistiqueDistribution() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <ArgonBox mb={3}>
                    <Card>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <ArgonTypography variant="h2">Statistique Distribution</ArgonTypography>
                        </ArgonBox>
                        <ArgonBox
                            sx={{
                                "& .MuiTableRow-root:not(:last-child)": {
                                    "& td": {
                                        borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                            `${borderWidth[1]} solid ${borderColor}`,
                                    },
                                },
                            }}
                        >
                            <Grid container spacing={3} mb={3}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <StatistiqueFiche />
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Card>
                                        <StatistiqueDekonina />
                                    </Card>
                                </Grid>
                            </Grid>
                        </ArgonBox>
                    </Card>
                </ArgonBox>
            </ArgonBox>
            <Footer />

        </DashboardLayout>


    );
}

export default StatistiqueDistribution;
