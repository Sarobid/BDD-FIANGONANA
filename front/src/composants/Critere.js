import PropTypes from 'prop-types';
import { Button, Col, Row } from "react-bootstrap";
import FormField from "services/FormField";

function Critere({ legendes, setLegendes }) {

    // Fonction pour mettre à jour une légende existante
    const handleChange = (index, key, value) => {
        const updatedLegendes = [...legendes];
        updatedLegendes[index] = {
            ...updatedLegendes[index],
            [key]: value,
        };
        setLegendes(updatedLegendes);
    };

    // Fonction pour ajouter une nouvelle légende vide
    const handleAddLegende = () => {
        const newLegende = { min: '', max: '', color: '#000000' }; // Valeurs par défaut
        setLegendes([...legendes, newLegende]);
    };

    // Fonction pour supprimer une légende par son index
    const handleRemoveLegende = (index) => {
        const updatedLegendes = legendes.filter((_, i) => i !== index);
        setLegendes(updatedLegendes);
    };

    return (
        <>
            {legendes.map((legen, index) => (
                <Row key={index} className="align-items-center mb-3">
                    <Col md={4}>
                        <FormField
                            colonne={">="}
                            title={">="}
                            type={"numbersimple"}
                            onchange={(v) => handleChange(index, 'min', v)}
                            value={legen.min}
                        />
                    </Col>
                    <Col md={4}>
                        <FormField
                            colonne={"<="}
                            title={"<="}
                            type={"numbersimple"}
                            onchange={(v) => handleChange(index, 'max', v)}
                            value={legen.max}
                        />
                    </Col>
                    <Col md={3}>
                        <FormField
                            colonne={"couleur"}
                            title={"couleur"}
                            type={"color"}
                            onchange={(v) => handleChange(index, 'color', v)}
                            value={legen.color}
                        />
                    </Col>
                    <Col md={1}>
                        <Button
                            variant="danger"
                            onClick={() => handleRemoveLegende(index)}
                            className="w-100"
                            title="Supprimer cette légende"
                        >
                            &minus; {/* Icône moins */}
                        </Button>
                    </Col>
                </Row>
            ))}

            {/* Bouton pour ajouter une nouvelle légende */}
            <Row className="mt-4">
                <Col>
                    <Button
                        variant="success"
                        onClick={handleAddLegende}
                        className="w-100"
                        title="Ajouter une nouvelle légende"
                    >
                        + Ajouter une critere
                    </Button>
                </Col>
            </Row>
        </>
    );
}

Critere.propTypes = {
    legendes: PropTypes.arrayOf(
        PropTypes.shape({
            min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            color: PropTypes.string,
        })
    ).isRequired,
    setLegendes: PropTypes.func.isRequired,
};

export default Critere;
