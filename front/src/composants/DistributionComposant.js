import PropTypes from 'prop-types';

import { Card, Grid } from "@mui/material";
import ListeFicheDrag from "composants/ListeFicheDrag";
import ListeMpiangonaDrag from "composants/ListeMpiangonaDrag";

function DistributionComposant({filterDekonina,filterFiche}) {
    return (
        <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={6} lg={6}>
                <Card>
                    <ListeMpiangonaDrag title={"Liste des Dekonina"} filterValue0={{ 'estdekonina': 'ENY',...filterDekonina }} />
                </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                <Card>
                    <ListeFicheDrag title={"Liste des Fiche de Recenssements"} filterValue0={{ ...filterFiche }} />
                </Card>
            </Grid>
        </Grid>

    );
}
DistributionComposant.propTypes = {
    filterDekonina : PropTypes.object,
    filterFiche : PropTypes.object
}
export default DistributionComposant;
