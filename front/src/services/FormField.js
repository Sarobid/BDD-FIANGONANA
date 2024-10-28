import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';

const FormField = ({ colonne, title, type, onchange, value }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            if (colonne.getOptions && type === "select") {
                const fetchedOptions = await colonne.getOptions();
                setOptions(fetchedOptions);
            }
        };
        fetchOptions();
    }, [colonne, type]);

    if (type === "input") {
        return (
            <FloatingLabel controlId="floatingInput" label={title} className="mb-3">
                <Form.Control type="input" value={value} onChange={e => onchange(e.target.value)} />
            </FloatingLabel>
        );
    } else if (type === "select") {
        return (
            <FloatingLabel controlId="floatingSelect" label={title} className="mb-3">
                <Form.Select value={value} onChange={e => onchange(e.target.value)}>
                    <option>Choisir</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.code}>{option.value}</option>
                    ))}
                </Form.Select>
            </FloatingLabel>
        );
    } else if (type === "date") {
        return (
            <FloatingLabel controlId="floatingInput" label={title} className="mb-3">
                <Form.Control type="date" value={value} onChange={e => onchange(e.target.value)} />
            </FloatingLabel>
        );
    } else if (type === "number") {
        let vmin = value[colonne.data + "min"] || "";
        let vmax = value[colonne.data + "max"] || "";

        return (
            <Row>
                <Col sm={6}>
                    <FloatingLabel controlId="floatingInput" label={"Min " + title} className="mb-1">
                        <Form.Control type="text" value={vmin} onChange={e => onchange(e.target.value, 'min')} />
                    </FloatingLabel>
                </Col>
                <Col sm={6}>
                    <FloatingLabel controlId="floatingInput" label={"Max " + title} className="mb-1">
                        <Form.Control type="text" value={vmax} onChange={e => onchange(e.target.value, 'max')} />
                    </FloatingLabel>
                </Col>
            </Row>
        );
    }
    return null;
};

// Définition des types de props pour le composant FormField
FormField.propTypes = {
    colonne: PropTypes.shape({
        getOptions: PropTypes.func,  // Laisser non requis pour éviter l'avertissement
        data: PropTypes.string,      // Même chose ici
    }),
    title: PropTypes.string,
    type: PropTypes.string,
    onchange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};


export default FormField;
