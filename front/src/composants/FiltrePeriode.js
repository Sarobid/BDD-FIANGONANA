import { Card } from "primereact/card";
import PropTypes from "prop-types";
import { useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

function FiltrePeriode({ setTypePeriodeChoisi, setDebut, setFin }) {
    const [typePeriodes, setTypePeriodes] = useState([{ code: "journaliere", name: "journaliere" }
        , { code: "mensuel", name: "mensuel" }, { code: "annuel", name: "annuel" }])
    const [typePeriode, setTypePeriode] = useState('mensuel');
    const [deb, setDeb] = useState(null);
    const [fin2, setFin2] = useState(null);
    const [anneeDeb, setAnneeDeb] = useState(new Date().getFullYear());
    const [anneeFin, setAnneeFin] = useState(new Date().getFullYear());
    return (
        <>
            <Card>
                <Row>
                    <Col md={12}>
                        <FloatingLabel controlId="floatingSelect" label={"Type Periode"} className="mb-3">
                            <Form.Select value={typePeriode} onChange={e => { setTypePeriode(e.target.value); setTypePeriodeChoisi(e.target.value) }}>
                                <option>Choisir</option>
                                {typePeriodes.map((option, index) => (
                                    <option key={index} value={option.code}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md={12}>
                        {
                            typePeriode === "journaliere" && (
                                <Row>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingInput" label={"date Debut"} className="mb-3">
                                            <Form.Control type="date" value={deb} onChange={e => { setDeb(e.target.value); setDebut(e.target.value) }} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingInput" label={"date Fin"} className="mb-3">
                                            <Form.Control type="date" value={fin2} onChange={e => { setFin2(e.target.value); setFin(e.target.value) }} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            )
                        }
                        {
                            typePeriode === "mensuel" && (
                                <Row>
                                    <Col md={6}>

                                        <FloatingLabel controlId="floatingInput" label={"Debut"} className="mb-3">
                                            <Form.Control type="month" value={deb} onChange={e => { setDeb(e.target.value); setDebut(e.target.value + "-" + anneeDeb) }} placeholder="mois" />
                                            <Form.Control type="year" value={anneeDeb} onChange={e => { setAnneeDeb(e.target.value); setDebut(deb + "-" + e.target.value) }} placeholder="annee" />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingInput" label={"Fin"} className="mb-3">
                                            <Form.Control type="month" value={fin2} onChange={e => { setFin2(e.target.value); setFin(e.target.value + "-" + anneeFin) }} placeholder="mois" />
                                            <Form.Control type="year" value={anneeFin} onChange={e => { setAnneeFin(e.target.value); setFin(fin2 + e.target.value) }} placeholder="annee" />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            )
                        }
                        {
                            typePeriode === "annuel" && (
                                <Row>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingInput" label={"Annee Debut"} className="mb-3">
                                            <Form.Control type="year" value={deb} onChange={e => { setDeb(e.target.value); setDebut(e.target.value) }} />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md={6}>
                                        <FloatingLabel controlId="floatingInput" label={"Annee Fin"} className="mb-3">
                                            <Form.Control type="year" value={fin2} onChange={e => { setFin2(e.target.value); setFin(e.target.value) }} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            )
                        }
                    </Col>
                </Row>
            </Card>
        </>
    )
}
FiltrePeriode.propTypes = {
    setTypePeriodeChoisi: PropTypes.func,
    setDebut: PropTypes.func,
    setFin: PropTypes.func,
};
export default FiltrePeriode;