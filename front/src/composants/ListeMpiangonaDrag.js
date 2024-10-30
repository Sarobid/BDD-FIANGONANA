import PropTypes from 'prop-types';

import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import mpiangonaServ from "../services/mpiangona/mpiangonaService";
import serv from "../services/service";

import { Card } from "primereact/card";
import { DataView } from "primereact/dataview";
import FormField from "../services/FormField";



const ListeMpiangonaDrag = ({title,filterValue0})=> {
    const [num, setNum] = useState(1);
    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [lazyParams, setLazyParams] = useState({ first: 0, rows: 5 });
    const [filterValues, setFilterValues] = useState(filterValue0);
    const titleTable = [
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
        { title: "Nom/Prenom", data: "nomcompletmpiangona", typeData: 'input' },
        { title: "ANARANA", data: "nommpiangona",isExtra:true, typeData: 'input' },
        { title: "FANAMPINY 1", data: "prenommpiangona",isExtra:true, typeData: 'input' },
        
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
            title: "LAHY/ VAVY", data: "codegenrempiangona", typeData: 'select',isExtra:true, getOptions: () => {
                return mpiangonaServ.getAllOpions("codegenrempiangona")
            }
        },
        {
            title: "DEKONINA", data: "estdekonina", typeData: 'select', getOptions: () => {
                return mpiangonaServ.getAllOpions("estdekonina")
            }
        },
        { title: "Famille distribue", data: "nombrefiche", typeData: 'number' },
        {
            title: "DATY BATISA", data: "datebatisa", typeData: 'date',isExtra:true, traitement: (value) => {
                return serv.converteNombreEnDate(value);
            }
        },
        { title: "TOERANA NANAOVANA BATISA", typeData: 'input', isExtra: true, data: "lieubatisa" },
        {
            title: "MPANDRAY/ KATEKOMENA", data: "estmpandray",isExtra:true, typeData: 'select', getOptions: () => {
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
    const fetchDataForPage = (pageNumber, pageSize, traiteApres) => {
        console.log("lsiete drag mpoiangona",filterValues)
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
                                        <Col key={index} sm={12}>
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
    const footer = `TOTAL : ${totalRecords.toLocaleString()} `;
    const itemTemplate = (mpiangona, index) => {
        return (
            <div className="col-12 sm:col-12 lg:col-12 xl:col-12 p-2">
                <Card title={renderColumnData(mpiangona, titleTable[0])}>
                    {titleTable.map((column, index2) => (
                        (!column.isExtra || showExtraColumns) && (
                            index2 > 0 && (
                                <div key={index2}>
                                    <strong>{column.title}:</strong> {renderColumnData(mpiangona, column)}
                                </div>
                            )
                        )
                    ))}
                </Card>
            </div>
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
        onPage(lazyParams);
    }, []);
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
        </>
    );
}

ListeMpiangonaDrag.propTypes = {
    title: PropTypes.string,
    filterValue0 : PropTypes.object
}


export default ListeMpiangonaDrag;
