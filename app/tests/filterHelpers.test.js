// tests/filterHelpers.test.js

const {
  isValidDateRange,
  validateRequiredFields,
  buildFilterQuery,
  addDays,
  normalizeCrimeRecord,
} = require('../src/utils/filterHelpers');

// 1) Validação de datas (campos vazios e ordem incorreta)
test('deve rejeitar intervalo de datas vazio ou com data inicial maior que final', () => {
  const emptyResult = isValidDateRange('', '');
  expect(emptyResult.ok).toBe(false);
  expect(emptyResult.error).toBe('Datas obrigatórias');

  const invalidOrder = isValidDateRange('2024-12-10', '2024-12-01');
  expect(invalidOrder.ok).toBe(false);
  expect(invalidOrder.error).toBe('Data inicial não pode ser maior que a data final');
});

// 2) Validação de campos obrigatórios
test('deve retornar lista de campos obrigatórios que estão faltando', () => {
  const filters = {
    startDate: '2024-12-01',
    endDate: '',
    crimeType: '',
  };

  const required = ['startDate', 'endDate', 'crimeType'];

  const missing = validateRequiredFields(filters, required);

  expect(missing).toContain('endDate');
  expect(missing).toContain('crimeType');
  expect(missing).not.toContain('startDate');
});

// 3) Combinação de filtros (query limpa, sem valores padrão)
test('deve montar objeto de query usando apenas filtros preenchidos', () => {
  const query = buildFilterQuery({
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    crimeType: 'roubo',
    region: 'todas', // não deve entrar
  });

  expect(query).toEqual({
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    crimeType: 'roubo',
  });

  const queryComPoucosFiltros = buildFilterQuery({
    startDate: null,
    endDate: null,
    crimeType: 'todos',
    region: 'norte',
  });

  expect(queryComPoucosFiltros).toEqual({
    region: 'norte',
  });
});

// 4) Função auxiliar de manipulação de datas
test('deve somar dias corretamente a uma data', () => {
  const result = addDays('2024-12-01', 5);
  expect(result).toBe('2024-12-06');

  expect(() => addDays('data-invalida', 3)).toThrow('Data inválida');
});

// 5) Função interna de normalização de dados
test('deve normalizar registro de crime vindo da API', () => {
  const raw = {
    id: 10,
    tipo_crime: 'furto',
    data_ocorrencia: '2024-11-30',
    regiao: 'centro',
    total: '7',
  };

  const normalized = normalizeCrimeRecord(raw);

  expect(normalized).toEqual({
    id: 10,
    crimeType: 'furto',
    date: '2024-11-30',
    region: 'centro',
    total: 7,
  });
});
