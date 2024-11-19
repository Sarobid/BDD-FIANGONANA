import { Icon } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import PropTypes from 'prop-types';
import { useState } from "react";
import { Badge, Button, Col, ListGroup, Offcanvas, Row, Tab, Tabs } from "react-bootstrap";
import dekoninaServ from "services/dekonina/dekoninaService";
import DetailsMpiangona from "./DetailsMpiangona";


function DekoninaFicheAffectation({ dekonina, setDekonina, fiches, setFiches,actionApresValidation }) {
    const titleTableFiche = [
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
    const [showExtraColumns, setShowExtraColumns] = useState(false);

    const toggleExtraColumns = () => {
        setShowExtraColumns(prevState => !prevState);
    };
    const handleCheckboxChange = (mpiangona) => {
        setFiches((prevState) => {
            const isAlreadyChecked = prevState.some(item => item.numfichempiangona === mpiangona.numfichempiangona);
            if (isAlreadyChecked) {
                // Si l'élément est déjà coché, on le retire
                return prevState.filter(item => item.numfichempiangona !== mpiangona.numfichempiangona);
            } else {
                // Sinon, on l'ajoute
                return [...prevState, mpiangona];
            }
        });

    };
    const itemTemplate = (mpiangona, index) => {
        let head = (
            <>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <h3 style={{ fontWeight: "bold" }}>{renderColumnData(mpiangona, titleTableFiche[0])}</h3>
                    <ArgonBox mr={1}>
                        <div onClick={() => { handleCheckboxChange(mpiangona) }}>
                            <ArgonButton variant="text" color="error">
                                <Icon>delete</Icon>&nbsp;Enlever
                            </ArgonButton>
                        </div>
                    </ArgonBox>
                </div>
            </>
        )
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-12 p-2" key={index}>
                <Card header={head} style={{ backgroundColor: '#c7d2d2' }}>
                    {titleTableFiche.map((column, index2) => (
                        (!column.isExtra || showExtraColumns) && (
                            index2 > 0 && (
                                <div key={index2}>
                                    {column.modeAffiche ? (
                                        column.modeAffiche(mpiangona)
                                    ) : (
                                        <>
                                            {column.title}:&nbsp;&nbsp;<strong>{renderColumnData(mpiangona, column)}</strong>
                                        </>
                                    )}
                                </div>
                            )
                        )
                    ))}
                </Card>
            </div >
        );
    };

    const listTemplate = (items) => {
        if (!items || items.length === 0) return null;
        let list = items.map((mpiangona, index) => {
            return itemTemplate(mpiangona, index);
        });

        return <div className="grid grid-nogutter" style={{ maxHeight: '450px', 'overflow': 'auto' }}>{list}</div>;
    };
    const header = (
        <>
            <h7>Fiche affecter : <Badge bg="primary">{fiches.length.toLocaleString()}</Badge></h7>
        </>
    )
    const handleValider = async ()=>{
        let est = true;
        if(dekonina === null){
            est = false;
            alert("veuiller choisir un dekonina")
        }
        if(fiches.length === 0){
            est = false;
            alert("veuiller choisir au moins une fiche")
        }
        if(est === true){
            for (let i = 0; i < fiches.length; i++) {
                let data = await dekoninaServ.addFicheDekonina({numfichempiangona:fiches[i]['numfichempiangona'],mpiangonaid:dekonina['mpiangonaid']});    
                console.log(data)
            }
            setFiches([])
            alert("affectation avec succes")
            actionApresValidation();
        }
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mpiangonaid, setMpiangonaid] = useState("");
    return (
        <>
            <Card title={"Affectation dekonina au fiche"}>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Dekonina">
                        <div className="col-12 sm:col-12 lg:col-12 xl:col-12 p-2">
                            {
                                dekonina && (
                                    <Card>
                                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                                            <h3 style={{ fontWeight: "bold" }}>{renderColumnData(dekonina, titleTable[0])}</h3>
                                            <ArgonBox mr={1}>
                                                <div>
                                                    <Button variant='warning' onClick={()=>{setMpiangonaid(dekonina['mpiangonaid']); handleShow()}}>
                                                        <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
                                                        {"Plus d'information"}
                                                    </Button>

                                                </div>
                                            </ArgonBox>
                                        </div>
                                        {titleTable.map((column, index2) => (
                                            (!column.isExtra || showExtraColumns) && (
                                                index2 > 0 && (
                                                    <div key={index2}>
                                                        {column.title}:&nbsp;&nbsp;<strong>{renderColumnData(dekonina, column)}</strong>
                                                    </div>
                                                )
                                            )
                                        ))}
                                    </Card>
                                )
                            }

                        </div>
                    </Tab>
                    <Tab eventKey="profile" title={header}>
                        <Row>
                            <Col md={12}>
                                <DataView
                                    value={fiches}
                                    lazy
                                    layout={'grid'}
                                    listTemplate={listTemplate}
                                >
                                </DataView>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="validation" title={"Valider"}>
                        <div className="d-grid gap-2">
                            <Button variant="success" onClick={handleValider}>
                                Valider
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </Card>
            <Offcanvas show={show} onHide={handleClose}  placement={'end'} name={'end'} style={{ width: '75%' }}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DetailsMpiangona mpiangonaid={mpiangonaid}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
DekoninaFicheAffectation.propTypes = {
    dekonina: PropTypes.object,
    setDekonina: PropTypes.func,
    fiches: PropTypes.array,
    setFiches: PropTypes.func,
    actionApresValidation : PropTypes.func
}

export default DekoninaFicheAffectation;