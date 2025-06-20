import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

// Função para formatar o CPF (ex.: 123.456.789-01)
const formatCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length <= 11) {
        return cpf.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, (match, p1, p2, p3, p4) => {
            let result = p1;
            if (p2) result += `.${p2}`;
            if (p3) result += `.${p3}`;
            if (p4) result += `-${p4}`;
            return result;
        });
    }
    return cpf.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para validar CPF
const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return { isValid: false, error: 'O CPF deve ter 11 dígitos.' };
    if (/^(\d)\1+$/.test(cpf)) return { isValid: false, error: 'CPF inválido: todos os dígitos são iguais.' };
    
    let sum = 0, remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf[i - 1]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[9])) return { isValid: false, error: 'CPF inválido: dígito verificador incorreto.' };
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf[i - 1]) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf[10])) return { isValid: false, error: 'CPF inválido: dígito verificador incorreto.' };
    
    return { isValid: true };
};

export default function CPFInput({ value, onChange, error, label = 'CPF', id = 'cpf', autoComplete = 'cpf', required = true, className = '', ...props }) {
    const handleChange = (e) => {
        const rawCPF = e.target.value.replace(/[^\d]/g, '');
        const formattedCPF = formatCPF(rawCPF);
        const validation = validateCPF(rawCPF);
        
        onChange({
            value: formattedCPF,
            rawValue: rawCPF,
            isValid: validation.isValid,
            error: validation.error || '',
        });
    };

    return (
        <div className={className}>
            <InputLabel htmlFor={id} value={label} />
            <TextInput
                id={id}
                name="cpf"
                value={value}
                className="mt-1 block w-full"
                autoComplete={autoComplete}
                onChange={handleChange}
                maxLength={14}
                placeholder="123.456.789-01"
                required={required}
                {...props}
            />
            <InputError message={error} className="mt-2" />
        </div>
    );
}