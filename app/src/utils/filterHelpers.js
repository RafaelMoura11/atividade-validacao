// src/utils/filterHelpers.js

/**
 * Valida um intervalo de datas.
 * Regras:
 * - ambas as datas precisam existir
 * - o formato precisa ser válido (Date parseável)
 * - data inicial <= data final
 */
function isValidDateRange(start, end) {
  if (!start || !end) {
    return {
      ok: false,
      error: 'Datas obrigatórias',
    };
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return {
      ok: false,
      error: 'Formato de data inválido',
    };
  }

  if (startDate > endDate) {
    return {
      ok: false,
      error: 'Data inicial não pode ser maior que a data final',
    };
  }

  return { ok: true, error: null };
}

/**
 * Verifica campos obrigatórios em um objeto de filtros.
 * Retorna um array com o nome dos campos que estão vazios.
 */
function validateRequiredFields(filters, requiredKeys) {
  const missing = [];

  requiredKeys.forEach((key) => {
    const value = filters[key];

    if (value === undefined || value === null || value === '') {
      missing.push(key);
    }
  });

  return missing;
}

/**
 * Monta um objeto de filtros combinando vários campos.
 * Remove campos vazios para não poluir a query.
 */
function buildFilterQuery({ startDate, endDate, crimeType, region }) {
  const query = {};

  if (startDate) query.startDate = startDate;
  if (endDate) query.endDate = endDate;
  if (crimeType && crimeType !== 'todos') query.crimeType = crimeType;
  if (region && region !== 'todas') query.region = region;

  return query;
}

/**
 * Função auxiliar para somar dias a uma data (uso em filtros de período).
 */
function addDays(dateStr, days) {
  const date = new Date(dateStr);

  if (isNaN(date.getTime())) {
    throw new Error('Data inválida');
  }

  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10); // yyyy-mm-dd
}

/**
 * Normaliza um registro vindo da API para o formato usado no dashboard.
 */
function normalizeCrimeRecord(raw) {
  return {
    id: raw.id,
    crimeType: raw.tipo_crime || raw.crimeType,
    date: raw.data_ocorrencia || raw.date,
    region: raw.regiao || raw.region || 'N/A',
    total: Number(raw.total) || 0,
  };
}

module.exports = {
  isValidDateRange,
  validateRequiredFields,
  buildFilterQuery,
  addDays,
  normalizeCrimeRecord,
};
