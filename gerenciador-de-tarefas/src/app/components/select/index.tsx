import { ChangeEvent } from 'react';
import './style.css'
interface Select {
    array: any[],
    chave: string,
    text: string,
    label: string,
    value: string,
    changeValue: (value: string) => void,
}

export default function Select({ array, chave, text, label, value, changeValue }: Select) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        changeValue(e.target.value);
    };

    return (
        <div className='select'>
            <label htmlFor={chave}>{label}</label>
            <select className='label-select' onChange={handleChange} id={chave} value={value}>
                <option value="">Selecione</option>
                {array.map((element) => (
                    <option key={element[chave]} value={element[chave]}>{ element[text] }</option>
                ))}
            </select>
        </div>
    );
}
