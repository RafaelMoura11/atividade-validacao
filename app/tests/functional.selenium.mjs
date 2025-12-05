// tests/functional.test.js

import { Builder, By, until } from 'selenium-webdriver';

const BASE_URL = 'http://localhost:5173';

async function createDriver() {
  return await new Builder().forBrowser('chrome').build();
}

async function fluxo1FiltroBasico(driver) {
  console.log('🧪 Fluxo 1: Aplicar filtro básico com data e tipo de crime');

  await driver.get(BASE_URL);

  await driver.wait(until.elementLocated(By.css('body')), 5000);

  // Troca esses seletores pelos IDs/classes reais da tua tela
  const startInput = await driver.findElement(By.css('#startDate'));
  const endInput = await driver.findElement(By.css('#endDate'));
  const crimeSelect = await driver.findElement(By.css('#crimeType'));
  const filterButton = await driver.findElement(By.css('#filterButton'));

  await startInput.clear();
  await startInput.sendKeys('2024-01-01');

  await endInput.clear();
  await endInput.sendKeys('2024-01-31');

  await crimeSelect.sendKeys('Roubo');

  await filterButton.click();

  const resultsTable = await driver.wait(
    until.elementLocated(By.css('#resultsTable')),
    5000
  );

  const rows = await resultsTable.findElements(By.css('tbody tr'));

  if (rows.length === 0) {
    throw new Error('Nenhum resultado foi exibido após aplicar o filtro básico.');
  }

  console.log('✅ Fluxo 1 passou (resultados exibidos após o filtro).');
}

async function fluxo2CamposObrigatorios(driver) {
  console.log('🧪 Fluxo 2: Tentar filtrar sem preencher campos obrigatórios');

  await driver.get(BASE_URL);

  const startInput = await driver.findElement(By.css('#startDate'));
  const endInput = await driver.findElement(By.css('#endDate'));
  const filterButton = await driver.findElement(By.css('#filterButton'));

  await startInput.clear();
  await endInput.clear();

  await filterButton.click();

  const errorMessage = await driver.wait(
    until.elementLocated(By.css('.error-message')),
    5000
  );

  const text = await errorMessage.getText();

  if (!text.toLowerCase().includes('data')) {
    throw new Error(
      `Mensagem de erro não parece relacionada às datas obrigatórias. Mensagem: ${text}`
    );
  }

  console.log('✅ Fluxo 2 passou (validação de campos obrigatórios funcionando).');
}

async function fluxo3FiltroSemParametros(driver) {
  console.log('🧪 Fluxo 3: Aplicar filtro sem parâmetros opcionais (filtro amplo)');

  await driver.get(BASE_URL);

  const filterButton = await driver.findElement(By.css('#filterButton'));

  // Se tiver selects de crime/região, você pode setar aqui (opcional)
  try {
    const crimeSelect = await driver.findElement(By.css('#crimeType'));
    await crimeSelect.sendKeys('Todos');
  } catch (e) {}

  await filterButton.click();

  const resultsTable = await driver.wait(
    until.elementLocated(By.css('#resultsTable')),
    5000
  );

  const rows = await resultsTable.findElements(By.css('tbody tr'));

  if (rows.length === 0) {
    throw new Error(
      'Nenhum resultado foi exibido ao aplicar filtro amplo (sem parâmetros específicos).'
    );
  }

  console.log('✅ Fluxo 3 passou (filtro amplo retornou resultados).');
}

(async function runFunctionalTests() {
  const driver = await createDriver();

  try {
    await fluxo1FiltroBasico(driver);
    await fluxo2CamposObrigatorios(driver);
    await fluxo3FiltroSemParametros(driver);

    console.log('🎉 Todos os testes funcionais foram executados com sucesso.');
  } catch (error) {
    console.error('❌ Erro durante a execução dos testes funcionais:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await driver.quit();
  }
})();
