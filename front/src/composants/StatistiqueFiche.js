
import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

import { Card } from "primereact/card";
import FormField from "../services/FormField";

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ficheServ from "services/fiche/ficheService";
import DistributionComposant from "./DistributionComposant";



const StatistiqueFiche = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterValues, setFilterValues] = useState({});
    const [legendes, setLegendes] = useState([{ 'min': 0, 'max': 0, 'color': 'red' },
    { 'min': 1, 'max': 1, 'color': 'yellow' },
    { 'min': 2, 'color': 'green' },
    ]);
    const titleTable = [
        { title: "N° FICHE", data: "numfichempiangona", typeData: 'input' },
        { title: "ADIRESY", data: "adressempiangona", typeData: 'input' },
    ];
    const [showExtraColumns, setShowExtraColumns] = useState(false);

    const toggleExtraColumns = () => {
        setShowExtraColumns(prevState => !prevState);
    };
    const [critereDetails,setCritereDetails] = useState({})

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    const [showFilter, setShowFilter] = useState(false);

    const toggleFilter = () => {
        setShowFilter(prevState => !prevState);
    };
    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({ ...prev, [key]: value }));
    };
    const options = {
        chart: {
            type: 'column' // Type de graphique (par exemple 'line', 'bar', 'pie', etc.)
        },
        title: {
            text: '',// Titre vide pour ne pas l'afficher
            enable: false
        },
        xAxis: {
            categories: ['Nombre dekonina']
        },
        yAxis: {
            title: {
                text: 'Nombre Fiche'
            }
        },        plotOptions: {
            series: {
                point: {
                    events: {
                        click: function () {
                            const seriesData = this.series.userOptions; // Accéder aux données de la série
                            const min = seriesData.min;
                            const max = seriesData.max;
                            let d = {}
                            if(min!== null){
                                d['nombredekoninamin'] = String(min)
                            }
                            if(max!== null){
                                d['nombredekoninamax'] = String(max)
                            }
                            //alert(`Vous avez cliqué sur ${this.series.name} avec une valeur de ${this.y}. Min: ${min}, Max: ${max} ${JSON.stringify(d)}`);                        
                            setCritereDetails(d);
                            handleShow();
                         }
                    }
                }
            }
        },
        series: data
    }
    const filtrer = async () => {
        console.log(filterValues)
        try {
            let d = await ficheServ.getStateFiche(legendes, filterValues);
            let donnee = [];
            for (let i = 0; i < d.data.length; i++) {
                let min,max = null;
                let c = d.data[i]['code'].split(";");
                console.log(c);
                if(c[0] || c[0] === 0){
                    min = parseInt(c[0]);
                }
                if(c[1] || c[1] === 0){
                    max = parseInt(c[1]);
                }
                donnee.push(
                    { name: d.data[i]['name'], data: [Number(d.data[i]['value'])], color: d.data[i]['color'] 
                        ,min:min,max:max
                    })
            }
            setData(donnee);
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        filtrer()
    }, []);
    const header = (
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Button
                onClick={toggleFilter}
                variant="success"
            >
                {showFilter ? "Recherche moins" : "Recherche"}
            </Button>
            <Button
                variant="info"
            >
                {"Change Critere"}
            </Button>
            {
                showFilter && (
                    <>
                        <Card>
                            <Col sm={12}>
                                <Button
                                    onClick={toggleExtraColumns}
                                    variant="info"
                                >
                                    {showExtraColumns ? "Afficher moins" : "Afficher plus"}
                                </Button>
                            </Col>
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

        </div>
    );

    return (
        <>
            <div className="container">
                <Card title={'Statistique Fiche distribuer au dekonina'}>
                    <Row>
                        <Col md={12}>
                            {header}
                        </Col>
                        <Col md={12}>
                            <HighchartsReact
                                highcharts={Highcharts}
                                options={options}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
            {/* MODAL */}
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Distribution</Modal.Title>
                </Modal.Header>
                <Modal.Body><DistributionComposant filterDekonina={{}} filterFiche={critereDetails} /></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StatistiqueFiche;
