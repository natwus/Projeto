import useSessionTimeout from '../../hooks/useSessionTimeout';
import { getLogs } from "../../services/productService";
import { useEffect, useState } from "react";
import { Container, Table, Td, Th } from '../Style/TableStyle/tableStyle';

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
        <Container>
            <Table border={1} style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                        <Th>Histórico</Th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log) => (
                        <tr key={log.historicoID}>
                            <Td>{log.historicoDescricao}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default Inicio;
