import ArgonBox from "components/ArgonBox";
import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Offcanvas, Row, Spinner, Table } from "react-bootstrap";
import mpiangonaServ from "services/mpiangona/mpiangonaService";
import PaginationComponent from "services/Pagination";
import serv from "services/service";
import FormField from "../services/FormField";
import DetailsMpiangona from "./DetailsMpiangona";

const ListeMpiangona2 = ({ title, filterValues0, getAllMpiangona,autreTitle }) => {
    const [num, setNum] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lazyParams, setLazyParams] = useState({ first: 1, rows: 7 });
    const [filterValues, setFilterValues] = useState(filterValues0);
    const [showExtraColumns, setShowExtraColumns] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const titleTable = [
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
        { title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
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
        {
            title: "DEKONINA", data: "estdekonina", typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("estdekonina")
            }
        },
        {
            title: "DATY BATISA", data: "datebatisa", typeData: 'date', traitement: (value) => {
                return serv.converteNombreEnDate(value);
            }
        },
        { title: "TOERANA NANAOVANA BATISA", typeData: 'input', isExtra: true, data: "lieubatisa" },
        {
            title: "MPANDRAY/ KATEKOMENA", data: "estmpandray", typeData: 'select', getOptions: () => {
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
    ].concat(autreTitle);
    const renderColumnData = (rowData, column) => {
        const value = rowData[column.data];
        return column.traitementAffiche ? column.traitementAffiche(value) : value;
    };

    const fetchDataForPage = (pageNumber, pageSize, traiteApres) => {
        getAllMpiangona(
            filterValues,
            pageNumber,
            pageSize,
            (data, totalPage) => {
                traiteApres(data, totalPage);
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const onPage = (numPage) => {
        setLoading(true);
        fetchDataForPage(numPage, lazyParams.rows, (data, totalPage) => {
            setData(data);
            setTotalRecords(totalPage);
            setLoading(false);
            setNum(numPage);
        });
    };

    const filtrer = () => {
        setLazyParams((prev) => ({ ...prev, first: 0 }));
        onPage(1);
    };

    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{ padding: "10px" }}>
            <Button onClick={() => setShowExtraColumns(!showExtraColumns)} variant="info">
                {showExtraColumns ? "Afficher moins" : "Afficher plus"}
            </Button>
            <Button onClick={() => setShowFilter(!showFilter)} variant="success">
                {showFilter ? "Recherche moins" : "Recherche"}
            </Button>
            {showFilter && (
                <Card>
                    <Row>
                        {titleTable.map(
                            (column, index) =>
                                (!column.isExtra || showExtraColumns) && (
                                    <Col key={index} sm={3}>
                                        <FormField
                                            colonne={column}
                                            title={column.title}
                                            type={column.typeData}
                                            value={filterValues[column.data] || ""}
                                            onchange={(value) => setFilterValues((prev) => ({ ...prev, [column.data]: value }))}
                                        />
                                    </Col>
                                )
                        )}
                        <Col sm={12}>
                            <Button variant="primary" onClick={filtrer}>
                                Filtrer
                            </Button>
                        </Col>
                    </Row>
                </Card>
            )}
        </div>
    );

    useEffect(() => {
        onPage(1);
    }, []);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mpiangonaid,setMpiangonaid] = useState("");


    return (
        <>
        <div className="container">
            <Card header={header}>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Table striped bordered hover responsive size="sm">
                        <thead>
                            <tr>
                                {titleTable.map(
                                    (column, index) =>
                                        (!column.isExtra || showExtraColumns) && (
                                            <th key={index} style={{ backgroundColor: "#c83209", color: "#fff", border: "1px solid #fff", textAlign: 'center' }}>
                                                {column.title}
                                            </th>
                                        )
                                )}
                                <th style={{ backgroundColor: "#c83209", color: "#fff", border: "1px solid #fff", textAlign: 'center' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {titleTable.map(
                                        (column, index) =>
                                            (!column.isExtra || showExtraColumns) && (
                                                <td key={index} style={{ textAlign: 'center' }}>{renderColumnData(row, column)}</td>
                                            )
                                    )}
                                    <td>
                                        <Button variant='warning' onClick={()=>{setMpiangonaid(row['mpiangonaid']);handleShow()}}>
                                            <ArgonBox component="i" color="warning" fontSize="14px" className="ni ni-single-02" />
                                            {"Plus d'information"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                <PaginationComponent numActive={num} totalCount={totalRecords} rowsPerPage={lazyParams.rows} onPage={onPage} />
            </Card>

        </div>
        <Offcanvas show={show} onHide={handleClose}  placement={'end'} name={'end'} style={{ width: '75%' }}>
                <Offcanvas.Header closeButton>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <DetailsMpiangona mpiangonaid={mpiangonaid}/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

ListeMpiangona2.propTypes = {
    title: PropTypes.string.isRequired,
    getAllMpiangona: PropTypes.func.isRequired,
    filterValues0: PropTypes.object,
    autreTitle : PropTypes.array
};

export default ListeMpiangona2;
