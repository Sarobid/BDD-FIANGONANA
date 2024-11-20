import { Card } from 'primereact/card';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import ficheServ from 'services/fiche/ficheService';
import FormField from 'services/FormField';

function NouveauSuivieFiche({numfiche,dekoninaid,actionApres}){
    const titleTable = [
        { title: "Daty ny Famangina", data: "datesuivie", typeData: 'date' , isRequired:true },
        { title: "Description", data: "descriptionsuivie", typeData: 'input' },
    ]
    const [filterValues, setFilterValues] = useState({numfichempiangona:numfiche,mpiangonaid:dekoninaid});
    useEffect(()=>{
        setFilterValues((prev) => ({ ...prev, numfichempiangona:numfiche,mpiangonaid:dekoninaid}))
    },numfiche,dekoninaid)
    const enregistrement = async ()=>{
        if(!filterValues['datesuivie']){
            alert("Oviana no namangy")
        }else{
            if(!filterValues['descriptionsuivie']){
                filterValues['descriptionsuivie'] = '';
                try {
                let data = await ficheServ.addsuivieFiche(filterValues);
                alert("Famangina bien enregistrer")
                actionApres();
                } catch (error) {
                    alert("une erreur s'est produite, veuiller recommencer SVP")
                }
            }
        }
    }
    return (
        <Card>
                    <Row>
                        {titleTable.map(
                            (column, index) =>
                                    <Col key={index} sm={12}>
                                        <FormField
                                            colonne={column}
                                            title={column.title}
                                            type={column.typeData}
                                            value={filterValues[column.data] || ""}
                                            onchange={(value) => setFilterValues((prev) => ({ ...prev, [column.data]: value }))}
                                        />
                                    </Col>
                                
                        )}
                        <Col sm={12}>
                            <Button variant="primary" onClick={enregistrement}>
                                + enregistrer
                            </Button>
                        </Col>
                    </Row>
                </Card>
    )
}
NouveauSuivieFiche.propTypes = {
    actionApres: PropTypes.func.isRequired,
    numfiche: PropTypes.string.isRequired,
    dekoninaid: PropTypes.string.isRequired,
}
export default NouveauSuivieFiche;