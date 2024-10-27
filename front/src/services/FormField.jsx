import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

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
    }else if (type === "date") {
        return (
            <FloatingLabel controlId="floatingInput" label={title} className="mb-3">
                <Form.Control type="date" value={value} onChange={e => onchange(e.target.value)} />
            </FloatingLabel>
        );
    }
    return null;
};

export default FormField;
