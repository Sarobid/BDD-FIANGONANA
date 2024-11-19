import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Offcanvas, Row } from "react-bootstrap";


import { Icon } from '@mui/material';
import ArgonBox from 'components/ArgonBox';
import ArgonButton from 'components/ArgonButton';
import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import dekoninaServ from 'services/dekonina/dekoninaService';
import FormField from "../services/FormField";
import ficheServ from "../services/fiche/ficheService";
import DetailsFiche from './DetailsFiche';


//  const [ficheCheckeds, setFicheChecked] = useState([]);
const ListeFicheDrag = ({ title, filterValue0, ficheCheckeds, setFicheChecked, afficheChecked,eventApresDesaffectation }) => {
    const [num, setNum] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lazyParams, setLazyParams] = useState({ first: 0, rows: 5 });
    const [filterValues, setFilterValues] = useState(filterValue0);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [numFiche, setNumFiche] = useState(null)
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
    const fetchDataForPage = (pageNumber, pageSize, traiteApres) => {
        //alert(JSON.stringify(filterValues))
        ficheServ.getAllFiche(filterValues, pageNumber, pageSize, (data, totalPage) => {
            traiteApres(data, totalPage)
            setNum(num)
        }, (error) => {
            console.log(error);
        })
    };

    const onPage = async (event) => {
        setLoading(true);
        const pageNumber = event.first / event.rows + 1;
        console.log("Numéro de page :", pageNumber);
        fetchDataForPage(pageNumber, event.rows, (data, totalPage) => {
            setData(data);
            setTotalRecords(totalPage);
            setLoading(false);
            setLazyParams(event);
        });
    };
    const [showExtraColumns, setShowExtraColumns] = useState(false);

    const toggleExtraColumns = () => {
        setShowExtraColumns(prevState => !prevState);
    };

    const [showFilter, setShowFilter] = useState(false);

    const toggleFilter = () => {
        setShowFilter(prevState => !prevState);
    };
    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({ ...prev, [key]: value }));
    };
    const filtrer = () => {
        console.log(filterValues)
        setLazyParams((prev) => ({ ...prev, first: 0 }));
        onPage(lazyParams);
    }

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Button
                onClick={toggleExtraColumns}
                variant="info"
            >
                {showExtraColumns ? "Afficher moins" : "Afficher plus"}
            </Button>
            <Button
                onClick={toggleFilter}
                variant="success"
            >
                {showFilter ? "Recherche moins" : "Recherche"}
            </Button>
            {
                showFilter && (
                    <>
                        <Card>
                            <Row>
                                {titleTable.map((column, index) => (
                                    (!column.isExtra || showExtraColumns) && (
                                        <Col key={index} sm={column.typeData !== 'number' ? 12 : 12}>
                                            <FormField
                                                colonne={column}
                                                title={column.title}
                                                type={column.typeData}
                                                value={column.typeData !== 'number' ? filterValues[column.data] || "" : filterValues}
                                                onchange={column.typeData !== 'number' ? (value) => handleFilterChange(column.data, value) : (value, id) => handleFilterChange(column.data + id, value)}
                                            />
                                        </Col>
                                    )
                                ))}
                                <Col sm={12}>
                                    <div className="d-grid gap-2">
                                        <Button variant="primary" onClick={filtrer}>
                                            Filter
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </>
                )
            }
            {/* <input type="file" onChange={e => setFile(e.target.files[0])} />
            <Button type="button" onClick={importerFile}>Importer</Button> 
            </div> */}
        </div>
    );
    const footer = `TOTAL : ${totalRecords.toLocaleString()}`;
    const handleCheckboxChange = (mpiangona) => {
        setFicheChecked((prevState) => {
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

    const handleDesaffecter = async (numfiche) => {
        let data = await dekoninaServ.finFicheDekonina(numfiche);
        onPage(lazyParams);
        if(eventApresDesaffectation){
            eventApresDesaffectation();
        }
    }
    const itemTemplate = (mpiangona, index) => {
        const handleDetails = () => {
            setNumFiche(mpiangona.numfichempiangona)
            handleShow()
        }
        let head = (
            <>

                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <h3 style={{ fontWeight: "bold" }}>
                        <Form.Check
                            type="switch"
                            id={"custom-switch" + mpiangona.numfichempiangona}
                            label={renderColumnData(mpiangona, titleTable[0])}
                            checked={ficheCheckeds.some(item => item.numfichempiangona === mpiangona.numfichempiangona)}
                            onChange={() => handleCheckboxChange(mpiangona)}
                        />
                        </h3>
                    <ArgonBox mr={1}>
                        <div>
                            <Button variant='warning' onClick={handleDetails}>
                                <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
                                {"Plus d'information"}
                            </Button>
                        </div>
                    </ArgonBox>
                </div>
            </>
        )
        let head2 = (
            <>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    <h3 style={{ fontWeight: "bold" }}>{renderColumnData(mpiangona, titleTable[0])}</h3>
                    <ArgonBox mr={1}>
                        <div onClick={()=>{handleDesaffecter(mpiangona.numfichempiangona)}}>
                            <ArgonButton variant="text" color="error">
                                <Icon>delete</Icon>&nbsp;Desaffecter
                            </ArgonButton>
                            </div>
                            <Button variant='warning' onClick={handleDetails}>
                                <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
                                {"Plus d'information"}
                            </Button>
                        
                    </ArgonBox>
                </div>
            </>
        )

        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-12 p-2" key={index}>
                <Card title={afficheChecked === false ? mpiangona['nombredekonina'] === '0' ? head : head2: mpiangona['nombredekonina'] === '0' ? head : head2}>
                    {titleTable.map((column, index2) => (
                        (!column.isExtra || showExtraColumns) && (
                            index2 > 0 && (
                                <div key={index2}>
                                    {column.modeAffiche ? (
                                        column.modeAffiche(mpiangona)
                                    ) : (
                                        <>
                                            {column.title}: &nbsp;&nbsp;<strong> {renderColumnData(mpiangona, column)}</strong>
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

        return <div className="grid grid-nogutter" style={{ maxHeight: '350px', 'overflow': 'auto' }}>{list}</div>;
    };

    useEffect(() => {
        // Met à jour filterValues lorsque filterValue0 change
        setFilterValues(filterValue0);
    }, [filterValue0]);

    useEffect(() => {
        // Relancer la recherche lorsque filterValues change
        onPage(lazyParams);
    }, [filterValues]);
    
    return (
        <>
            <div className="container">
                <Card title={title}>
                    <Row>
                        <Col md={12}>
                            <DataView
                                value={data}
                                lazy
                                paginator
                                layout={'grid'}
                                totalRecords={totalRecords}
                                rows={lazyParams.rows}
                                first={lazyParams.first}
                                loading={loading}
                                header={header}
                                listTemplate={listTemplate}
                                footer={footer}
                                onPage={onPage}
                            >
                            </DataView>
                        </Col>
                    </Row>
                </Card>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'} style={{ width: '75%' }}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DetailsFiche numfiche={numFiche} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

ListeFicheDrag.propTypes = {
    title: PropTypes.string,

    filterValue0: PropTypes.object,
    ficheCheckeds: PropTypes.func,
    setFicheChecked: PropTypes.object,
    afficheChecked: PropTypes.bool,
    eventApresDesaffectation : PropTypes.func
}

export default ListeFicheDrag;
