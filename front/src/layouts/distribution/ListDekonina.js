import { Card, Grid } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ListeMpiangonaDrag from "composants/ListeMpiangonaDrag";
import StatistiqueDekonina from "composants/StatistiqueDekonina";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";

function ListDekonina() {
    const [filter,setfilter] = useState({})
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <ArgonBox mb={3}>
                    <Card>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <ArgonTypography variant="h2">Repartition Dekonina</ArgonTypography>
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
                                <Grid item xs={12} md={12} lg={12}>
                                    <Card>
                                        <StatistiqueDekonina onClickChart={(f)=>{
                                            setfilter(f)
                                        }} />
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                <Card>
                                    <ListeMpiangonaDrag title={"Liste des Dekonina"} filterValue0={{ 'estdekonina': 'ENY',...filter }} />
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

export default ListDekonina;
