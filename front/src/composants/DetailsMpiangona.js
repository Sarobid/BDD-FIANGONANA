
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import mpiangonaServ from 'services/mpiangona/mpiangonaService';

import { Tab, Tabs } from "react-bootstrap";
import serv from "../services/service";
import DekoninaFicheAffectation from "./DekoninaFicheAffectation";
import ListeFicheDrag from "./ListeFicheDrag";
function DetailsMpiangona({ mpiangonaid }) {
    const [mpiangona, setMpiangona] = useState(null)
    const getDetails = async () => {
        let data = await mpiangonaServ.getDeatilsMpiangona(mpiangonaid);
        if (data.length > 0) {
            setMpiangona(data[0]);
            setDekoninaSelected(data[0]);
        }
    }
    const titleTable = [
        { title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
        { title: "N° FICHE", data: "numfichempiangona", isExtra: true, typeData: 'input' },
        { title: "ANARANA", data: "nommpiangona", isExtra: true, typeData: 'input' },
        { title: "FANAMPINY 1", data: "prenommpiangona", isExtra: true, typeData: 'input' },

        {
            title: "DATY NAHATERAHANA", data: "datenaissancempiangona", typeData: 'date', isExtra: true, traitement: (value) => {
                return serv.converteNombreEnDate(value);
            }, traitementAffiche: (value) => {
                if (value) {
                    return serv.formatageDateTypeDate(new Date(value))
                } else {
                    return value;
                }
            }
        },
        {
            title: "LAHY/ VAVY", data: "codegenrempiangona", typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("codegenrempiangona")
            }
        },
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },

        {
            title: "DEKONINA", data: "estdekonina", typeData: 'select', isExtra: true, getOptions: () => {
                return mpiangonaServ.getAllOpions("estdekonina")
            }
        },
        { title: "Famille distribue", data: "nombrefiche", typeData: 'number' },
        {
            title: "DATY BATISA", data: "datebatisa", typeData: 'date', isExtra: true, traitement: (value) => {
                return serv.converteNombreEnDate(value);
            }
        },
        { title: "TOERANA NANAOVANA BATISA", typeData: 'input', isExtra: true, data: "lieubatisa" },
        {
            title: "MPANDRAY/ KATEKOMENA", data: "estmpandray", isExtra: true, typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("estmpandray")
            }
        },
        {
            title: "DATY NANDRAISANA MFT", data: "datempandray", isExtra: true, typeData: 'date', traitement: (value) => {
                return serv.converteNombreEnDate(value);
            }, traitementAffiche: (value) => {
                if (value) {
                    return serv.formatageDateTypeDate(new Date(value))
                } else {
                    return value;
                }
            }
        },
        { title: "TOERANA NANDRAISANA", data: "lieumpandray", typeData: 'input', isExtra: true },
        { title: "N° KARATRA MPANDRAY", data: "karatrampandray", isExtra: true, typeData: 'input' },
        { title: "RAY", data: "nompere", isExtra: true, typeData: 'input' },
        { title: "RENY", data: "nommere", isExtra: true, typeData: 'input' },
        {
            title: "Telephone", data: "telephone", isExtra: true, typeData: 'input', traitement: (value) => {
                return value;
            }
        },
        { title: "EMAIL", data: "email", isExtra: true, typeData: 'input' },
        {
            title: "MANAMBADY VITA SORATRA", data: "estvadysoratra", isExtra: true, typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("estvadysoratra")
            }
        },
        {
            title: "MANAMBADY VITA FANAMASINANA", data: "estvadymasina", isExtra: true, typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("estvadymasina")
            }
        },
        {
            title: "MATY VADY", data: "matyvady", isExtra: true, typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("matyvady")
            }
        },
        {
            title: "NISARAKA", data: "nisarabady", isExtra: true, typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("nisarabady")
            }
        },
        { title: "ASA", data: "asampiangona", isExtra: true, typeData: 'input' },
        { title: "TOERANA IASANA", data: "lieuasa", isExtra: true, typeData: 'input' }
    ];
    const renderColumnData = (rowData, column) => {
        const value = rowData[column.data];
        return column.traitementAffiche ? column.traitementAffiche(value) : value;
    };
    const [dekoninaSelected, setDekoninaSelected] = useState(null);
    const [ficheCheckeds, setFicheCheCkeds] = useState([]);
    useEffect(() => {
        getDetails();
    }, [mpiangonaid])
    return (
        <>
            {
                mpiangona && (
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
                                                <span style={{ color: "#c83209" }}>{renderColumnData(mpiangona, titleTable[0])}</span>
                                            </ArgonTypography>
                                            {titleTable.map((column, index2) => (
                                                (!column.isExtra) && (
                                                    index2 > 0 && (
                                                        <>
                                                            <ArgonTypography variant="button" color="text" fontWeight="medium" >
                                                                {column.title}: &nbsp;&nbsp; <strong>{renderColumnData(mpiangona, column)}</strong>
                                                            </ArgonTypography>
                                                            <br></br>
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
                                            <Tab eventKey="home" title="Plus d'information">
                                                <div style={{ backgroundColor: "white" }}>
                                                    {titleTable.map((column, index2) => (
                                                        (column.isExtra) && (
                                                            index2 > 0 && (
                                                                <>
                                                                    <ArgonTypography variant="button" color="text" fontWeight="medium">
                                                                        {column.title}: &nbsp;&nbsp; <strong>{renderColumnData(mpiangona, column)}</strong>
                                                                    </ArgonTypography>
                                                                    <br></br>
                                                                </>
                                                            )
                                                        )
                                                    ))}
                                                </div>
                                            </Tab>
                                            {
                                                mpiangona['estdekonina'] === 'ENY' && (

                                                    <Tab eventKey="dekonina" title="Liste des fiches">
                                                        <ListeFicheDrag
                                                            title=""
                                                            filterValue0={{ dekoninaid: mpiangona['mpiangonaid'] , nombredekoninamin:'1' }}
                                                            ficheCheckeds={[]}
                                                            setFicheChecked={(s) => { }}
                                                            afficheChecked={false}
                                                            eventApresDesaffectation={()=>{getDetails()}}
                                                        />
                                                    </Tab>

                                                )
                                            }
                                            {
                                                mpiangona['estdekonina'] === 'ENY' && (
                                                    <Tab eventKey="affectation" title="Nouveau fiche">
                                                        <Grid container spacing={3} mb={3}>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                <Card>
                                                                    <DekoninaFicheAffectation
                                                                        dekonina={dekoninaSelected}
                                                                        setDekonina={setDekoninaSelected}
                                                                        fiches={ficheCheckeds}
                                                                        setFiches={setFicheCheCkeds}
                                                                        actionApresValidation={()=>{getDetails() }}
                                                                    />
                                                                </Card>
                                                            </Grid>
                                                            <Grid item xs={12} md={6} lg={6}>
                                                                <Card>
                                                                    <ListeFicheDrag
                                                                        title="Liste des Fiche de Recenssements"
                                                                        filterValue0={{ nombredekoninamin: "0", nombredekoninamax: "0" }}
                                                                        ficheCheckeds={ficheCheckeds}
                                                                        setFicheChecked={setFicheCheCkeds}
                                                                        afficheChecked={true}
                                                                    />
                                                                </Card>
                                                            </Grid>
                                                        </Grid>


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
DetailsMpiangona.propTypes = {
    mpiangonaid: PropTypes.string
}
export default DetailsMpiangona;