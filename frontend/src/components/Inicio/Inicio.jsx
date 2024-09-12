import useSessionTimeout from '../../hooks/useSessionTimeout';
import { getLogs } from "../../services/productService";
import { useEffect, useState } from "react";

function Inicio() {
    const [logs, setLogs] = useState([]);
    
    useSessionTimeout();

    useEffect(() => {
        async function fetchLogs() {
            try {
                let data = await getLogs();
                if (data.length > 20) {
                    data = data.slice(-20);
                }
                data = data.reverse();
                setLogs(data);
            } catch (error) {
                console.error('Erro ao buscar os usuários:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
            <table border={1}>
                <thead>
                    <tr>
                        <th>Histórico</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.historicoID}>
                            <td>{log.historicoDescricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}

export default Inicio;
