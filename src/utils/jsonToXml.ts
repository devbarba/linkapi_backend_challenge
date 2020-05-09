import jsontoxml from 'jsontoxml';
import { DealPipeDriveInterface } from '../interfaces/PipeDriveInterface';

export function jsonToXml(payload: DealPipeDriveInterface) {
    return jsontoxml({
        pedido: {
            cliente: {
                nome: payload.person_name,
            },
            itens: {
                item: {
                    codigo: payload.id,
                    descricao: payload.title,
                    vlr_unit: payload.value,
                    qtde: '1',
                },
            },
        },
    });
}
