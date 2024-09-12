import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MFA() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const codigo = location.state?.codigo || '';
    const [verifica, setVerifica] = useState('');

    const VerificarCodigo = (e) => {
        e.preventDefault();
        if (codigo === verifica) {
            navigate('/inicio', { state: { email } });
        } else {
            alert('O código não confere!');
        }
    };

    return (
        <div>
            <h1>Verifique que é você</h1>
            <form onSubmit={VerificarCodigo}>
                <label>Código de Verificação</label>
                <input
                    type="number"
                    name="verificador"
                    value={verifica}
                    onChange={(e) => setVerifica(e.target.value)}
                />
                <button type="submit">Verificar Código</button>
            </form>
            <Link to={'/inicio'}>vai</Link>
        </div>
    );
}

export default MFA;
