import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import mpiangonaServ from "../services/mpiangona/mpiangonaService";
import serv from "../services/service";

import { Card } from "primereact/card";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import FormField from "../services/FormField";

const titleSheet = [
    //{title:"NUMERO",
    { title: "N° FICHE", data: "numfichempiangona" },
    //{title:"MPANAO SAISIE",
    //{title:"DIAKONA MPIAHY",
    { title: "ADIRESY", data: "adressempiangona" },
    { title: "ANARANA", data: "nommpiangona" },
    { title: "FANAMPINY 1", data: "prenommpiangona" },
    {
        title: "DATY NAHATERAHANA", data: "datenaissancempiangona", isExtra: true, traitement: (value) => {
            return serv.converteNombreEnDate(value);
        }, traitementAffiche: (value) => {
            if (value) {
                return serv.formatageDateTypeDate(new Date(value))
            } else {
                return value;
            }
        }
    },
    { title: "LAHY/ VAVY", data: "codegenrempiangona" },
    {
        title: "DATY BATISA", data: "datebatisa", traitement: (value) => {
            return serv.converteNombreEnDate(value);
        }
    },
    { title: "TOERANA NANAOVANA BATISA", isExtra: true, data: "lieubatisa" },
    { title: "MPANDRAY/ KATEKOMENA", data: "estmpandray" },
    {
        title: "DATY NANDRAISANA MFT", data: "datempandray", isExtra: true, traitement: (value) => {
            return serv.converteNombreEnDate(value);
        }, traitementAffiche: (value) => {
            if (value) {
                return serv.formatageDateTypeDate(new Date(value))
            } else {
                return value;
            }
        }
    },
    { title: "TOERANA NANDRAISANA", data: "lieumpandray", isExtra: true },
    { title: "N° KARATRA MPANDRAY", data: "karatrampandray" },
    //{title:"FG 2019-2023",
    //{title:"SAMPANA/ FIKAMBANANA",
    //{title:"SAMPANA",
    //{title:"SAMPANA2",
    //{title:"SAMPANA3",
    //{title:"SAMPANA FIFOHAZANA",
    //{title:"SAMPANA4",
    { title: "RAY", data: "nompere", isExtra: true },
    { title: "RENY", data: "nommere", isExtra: true },
    {
        title: "TEL 33", data: "telephone", isExtra: true, traitement: (value) => {
            return value;
        }
    },
    {
        title: "TEL 34/38", data: "telephone", isExtra: true, traitement: (value) => {
            return value;
        }
    },
    {
        title: "TEL 032", data: "telephone", isExtra: true, traitement: (value) => {
            return value;
        }
    },
    { title: "EMAIL", data: "email", isExtra: true },
    { title: "MANAMBADY VITA SORATRA", data: "estvadysoratra", isExtra: true },
    { title: "MANAMBADY VITA FANAMASINANA", data: "estvadymasina", isExtra: true },
    { title: "MATY VADY", data: "matyvady", isExtra: true },
    { title: "NISARAKA", data: "nisarabady", isExtra: true },
    //{title:"MPITOVO",
    { title: "ASA", data: "asampiangona", isExtra: true },
    { title: "TOERANA IASANA", data: "lieuasa", isExtra: true }
    // {title:"FANAMARIHANA",
    // {title:"FANAMARIHANA 2"
];


function ListeMpiangona() {
    // const [file, setFile] = useState(null);
    // const importerFile = () => {
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const data = new Uint8Array(e.target.result);
    //             const workbook = XLSX.read(data, { type: 'array' });
    //             const donnee = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    //             //console.log("donnee", donnee);
    //             donnee.forEach(value => {
    //                 let d = {};
    //                 for (let i = 0; i < titleSheet.length; i++) {
    //                     if (value[titleSheet[i].title]) {
    //                         if (titleSheet[i].traitement) {
    //                             d[titleSheet[i].data] = titleSheet[i].traitement(value[titleSheet[i].title])
    //                         } else {
    //                             d[titleSheet[i].data] = value[titleSheet[i].title];
    //                         }
    //                     }
    //                 }
    //                 console.log("d", d);
    //                 mpiangonaServ.addMpiangona(d, (data) => {
    //                     console.log("data", data);
    //                 }, (error) => {
    //                     console.log("error", error);
    //                 })
    //             })
    //         };
    //         reader.readAsArrayBuffer(file);
    //     }
    // };
    const [num, setNum] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lazyParams, setLazyParams] = useState({ first: 0, rows: 10 });
    const [filterValues, setFilterValues] = useState({});
    const titleTable = [
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
        { title: "ANARANA", data: "nommpiangona", typeData: 'input' },
        { title: "FANAMPINY 1", data: "prenommpiangona", typeData: 'input' },
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
        { title: "N° KARATRA MPANDRAY", data: "karatrampandray", typeData: 'input' },
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
    const fetchDataForPage = (pageNumber, pageSize, traiteApres) => {
        //console.log(filterValues)
        mpiangonaServ.getAllMpiangona(filterValues, pageNumber, pageSize, (data, totalPage) => {
            console.log("data", data);
            console.log("data", totalPage);
            traiteApres(data, totalPage)
            setNum(num)
        }, (error) => {
            console.log(error);
        })
    };

    const onPage = async (event) => {
        setLoading(true);
        const pageNumber = event.first
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
                                        <Col key={index} sm={3}>
                                            <FormField
                                                colonne={column}
                                                title={column.title}
                                                type={column.typeData}
                                                value={filterValues[column.data] || ""}
                                                onchange={(value) => handleFilterChange(column.data, value)}
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
    const footer = `Fitambarany : ${totalRecords.toLocaleString()} Mpiangona`;
    useEffect(() => {
        onPage(lazyParams);
    }, []);
    return (
        <>
            <div className="container">
                <Card>
                    <Row>
                        <Col md={12}>
                            <DataTable
                                value={data}
                                lazy
                                paginator
                                scrollable
                                scrollHeight="500px"
                                className="datatable-gridlines"
                                totalRecords={totalRecords}
                                rows={lazyParams.rows}
                                first={lazyParams.first}
                                loading={loading}
                                header={header}
                                footer={footer}
                                onPage={onPage}
                            >
                                {titleTable.map((column, index) => (
                                    (!column.isExtra || showExtraColumns) && (
                                        <Column
                                            key={index}
                                            field={column.data}
                                            header={column.title}
                                            headerStyle={{ backgroundColor: '#0a53be', color: '#fff', border: '1px solid #fff' }}
                                            body={(rowData) => renderColumnData(rowData, column)}
                                        />
                                    )
                                ))}
                            </DataTable>
                        </Col>
                    </Row>
                </Card>
            </div>
        </>
    );
}

export default ListeMpiangona;
