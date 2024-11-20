
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ficheServ from 'services/fiche/ficheService';
import FiltrePeriode from './FiltrePeriode';

function StatistiqueNombreSuivie({ title, filterValues0, refresh }) {

    const [filterValues, setFilterValues] = useState(filterValues0);
    const [periodes, setPeriodes] = useState([]);
    const [serieData, setSerieData] = useState([]);
    const [typePeriode, setTypePeriode] = useState('mensuel');
    
    const options = {
        chart: {
            type: 'column', // Peut être 'column' pour un graphique en barres
            height: 300,
        },
        title: {
            text: title,
        },
        xAxis: {
            categories: periodes,
            title: {
                text: '',
            },
        },
        yAxis: {
            title: {
                text: 'Nombre',
            },
        },
        series: serieData,
        credits: {
            enabled: false,
        },
    };

    const getStateSuivie = async () => {
        try {
            let d = await ficheServ.getStateSuivie(filterValues, typePeriode,{debut:debut,fin:fin});
            let data = d.data;
            console.log(data);
            setPeriodes(data.map(row => row.periode))
            setSerieData([
                {
                    name: "Nombre Famangina",
                    data: data.map(row => Number(row.nombre))
                }
            ])
        } catch (error) {
            console.log(error);
            //alert("err")
        }

    }
    const [showFilterPeriode, setShowFilterPeriode] = useState(false);
    const [debut, setDebut] = useState(null);
    const [fin, setFin] = useState(null);
    const header = (<>
        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <Row>
                <Col md={12}>
                    <Button
                        onClick={() => { setShowFilterPeriode((prev) => !prev) }}
                        variant="info"
                    >
                        {showFilterPeriode ? "annuler Filtre Periode" : "Filtre Periode"}
                    </Button>
                </Col>
                <Col md={12}>
                    {
                        showFilterPeriode && (
                            <FiltrePeriode setTypePeriodeChoisi={setTypePeriode}
                                setDebut={setDebut}
                                setFin={setFin} />
                        )
                    }
                </Col>
            </Row>
        </div>
    </>);
    useEffect(() => {
        setFilterValues(filterValues0)
    }, [filterValues0])
    useEffect(() => {
        getStateSuivie()
    }, [filterValues, refresh,typePeriode,debut,fin])
    return (
        <div className="container">
            <Card title={title}>
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
    )
}
StatistiqueNombreSuivie.propTypes = {
    filterValues0: PropTypes.object,
    title: PropTypes.string,
    refresh: PropTypes.string
};
export default StatistiqueNombreSuivie;