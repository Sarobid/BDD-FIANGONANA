
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Icon } from "@mui/material";
import ArgonButton from "components/ArgonButton";
import { ListGroup, Tab, Tabs } from "react-bootstrap";
import dekoninaServ from "services/dekonina/dekoninaService";
import ficheServ from "services/fiche/ficheService";
import mpiangonaServ from "services/mpiangona/mpiangonaService";
import DekoninaFicheAffectation from "./DekoninaFicheAffectation";
import ListeMpiangona2 from "./ListeMpiangona2";
import ListeMpiangonaDrag from "./ListeMpiangonaDrag";

function DetailsFiche({ numfiche }) {
    const [fiche, setFiche] = useState(null)
    const getDetails = async () => {
        // let data = await mpiangonaServ.getDeatilsMpiangona(mpiangonaid);
        // if (data.length > 0) {
        //     setMpiangona(data[0]);
        //     setDekoninaSelected(data[0]);
        // }
        ficheServ.getAllFiche({ 'numfichempiangona': numfiche }, 1, 1, (data, totalPage) => {
            if (totalPage > 0) {
                setFiche(data[0])
                setFicheCheCkeds([data[0]])
            }
        }, (error) => {
            console.log(error);
        })
    }
    const titleTable = [
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
        { title: "Nombre famille", data: "nombrempiangona", typeData: 'number' },
        { title: "Nombre Adresse", data: "nombreadresse", typeData: 'number' },
        { title: "Nombre Dekonina Mpiahy", data: "nombredekonina", typeData: 'number' },
        {
            title: "ADIRESY", data: "adressempiangona", typeData: 'input', modeAffiche: (value) => {
                return (
                    <ListGroup>
                        {
                            value['adressempiangona'].map((row) => {
                                return (
                                    <>
                                        <ListGroup.Item>{row['adressempiangona']}</ListGroup.Item>
                                    </>
                                )
                            })
                        }
                    </ListGroup>
                );
            }
        },
    ];
    const renderColumnData = (rowData, column) => {
        const value = rowData[column.data];
        return column.traitementAffiche ? column.traitementAffiche(value) : value;
    };
    const [dekoninaSelected, setDekoninaSelected] = useState(null);
    const [ficheCheckeds, setFicheCheCkeds] = useState([]);
    const handleDesaffecter = async (numfiche) => {
        let data = await dekoninaServ.finFicheDekonina(numfiche);
        getDetails()
    }
    useEffect(() => {
        getDetails();
    }, [numfiche])
    return (
        <>
            {
                fiche && (
                    <>
                        {/* HEADER */}
                        <ArgonBox position="relative">
                            <Card
                                sx={{
                                    py: 2,
                                    px: 2,
                                    boxShadow: ({ boxShadows: { md } }) => md,
                                }}
                            >
                                <Grid container spacing={3} alignItems="center">
                                    <Grid item >
                                        <ArgonBox height="100%" mt={0.5} lineHeight={1}>
                                            <ArgonTypography variant="h5" fontWeight="medium">
                                                <span style={{ color: "#c83209" }}>Fiche N° : &nbsp;&nbsp;{renderColumnData(fiche, titleTable[0])}</span>
                                            </ArgonTypography>
                                            {titleTable.map((column, index2) => (
                                                (!column.isExtra) && (
                                                    index2 > 0 && (
                                                        <>
                                                            {
                                                                column.modeAffiche ? (
                                                                    column.modeAffiche(fiche)
                                                                ) : (
                                                                    <>
                                                                        <ArgonTypography variant="button" color="text" fontWeight="medium" >
                                                                            {column.title}: &nbsp;&nbsp; <strong>{renderColumnData(fiche, column)}</strong>
                                                                        </ArgonTypography>
                                                                        <br></br>
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                )
                                            ))}

                                        </ArgonBox>
                                    </Grid>
                                    <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
                                        <Tabs
                                            defaultActiveKey="home"
                                            id="uncontrolled-tab-example"
                                            className="mb-3"
                                        >
                                            <Tab eventKey="home" title="Liste des familles">
                                                <ListeMpiangona2 title={""} filterValues0={{ numfichempiangona: fiche['numfichempiangona'] }} getAllMpiangona={mpiangonaServ.getAllMpiangona} autreTitle={[]} />
                                            </Tab>

                                            {
                                                fiche['nombredekonina'] !== '0' && (
                                                    <Tab eventKey="dekonina" title="Dekonina Miahy">
                                                        <ListeMpiangona2 title={""} filterValues0={{ numfiche: fiche['numfichempiangona'] }} getAllMpiangona={mpiangonaServ.getAllDekoninaMpiahy} autreTitle={[{ title: "Date debut", data: "datedebut", typeData: 'date' }, { title: "Date Fin", data: "datefin", typeData: 'date' }]} />
                                                    </Tab>

                                                )
                                            }
                                            {
                                                fiche['nombredekonina'] === '0' && (
                                                    <Tab eventKey="affectation" title="affectation a un dekonina">
                                                        <>
                                                            <Grid container spacing={3} mb={3}>

                                                                <Grid item xs={12} md={6} lg={6}>
                                                                    <Card>
                                                                        <DekoninaFicheAffectation
                                                                            dekonina={dekoninaSelected}
                                                                            setDekonina={setDekoninaSelected}
                                                                            fiches={ficheCheckeds}
                                                                            setFiches={setFicheCheCkeds}
                                                                            actionApresValidation={() => { getDetails() }}
                                                                        />
                                                                    </Card>
                                                                </Grid>
                                                                <Grid item xs={12} md={6} lg={6}>
                                                                    <Card>
                                                                        <ListeMpiangonaDrag
                                                                            title="Liste des Dekonina"
                                                                            filterValue0={{ estdekonina: "ENY" }}
                                                                            setSelectedDekonina={setDekoninaSelected}
                                                                            selectedDekonina={dekoninaSelected}
                                                                        />
                                                                    </Card>
                                                                </Grid>
                                                            </Grid>
                                                        </>
                                                    </Tab>
                                                )
                                            }{
                                                fiche['nombredekonina'] !== '0' && (
                                                    <Tab eventKey="desaffectation" title="Desaffecter">
                                                        <div onClick={() => { handleDesaffecter(fiche['numfichempiangona']) }}>
                                                            <ArgonButton variant="text" color="error">
                                                                <Icon>delete</Icon>&nbsp;Desaffecter
                                                            </ArgonButton>
                                                        </div>
                                                    </Tab>
                                                )
                                            }
                                        </Tabs>
                                    </Grid>
                                </Grid>
                            </Card>
                        </ArgonBox>
                        {/* FIN HEADER */}
                    </>
                )
            }
        </>
    );
}
DetailsFiche.propTypes = {
    numfiche: PropTypes.string
}
export default DetailsFiche;