import { test, expect } from '@playwright/test';

test.use({ storageState: 'states/.auth/procurementManager.json' });

//IRF Tracking
test("IRF Tracking Report, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'IRF Tracking' }).click();
  await page.getByRole('link', { name: 'IRF Tracking Report' }).click();

  //Testing Date input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('01/04/2024');
  await page.locator('.col > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Requisitor input
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(14) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('#app').getByRole('document').getByRole('button', { name: 'Close' }).click();
  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('staff staff');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('Requisitor Name');

  //Testing Department input
  await page.getByRole('button', { name: 'Filter By Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00031');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('');

  //Testing IRF No. input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00040');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00040');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF No.');

  //Testing IRF Title input
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(13) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).last().click();
  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing - New');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Testing - New');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF Title');

  //Testing Status input
  await page.getByRole('button', { name: 'Filter By Status' }).click();
  await page.getByRole('option', { name: 'Initial Request Form' }).click();
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Process');
  await page.locator('div:nth-child(6) > div:nth-child(3) > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Filter By StatusInitial Request Form');
  await expect(page.getByRole('main')).toContainText('IRF Status');

  //Testing for all inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '2', exact: true }).last().click();
  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Filter By Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00039');
  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Testing for Staff');
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('staff staff');
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00039');
  await expect(page.getByRole('table')).toContainText('Request Testing for Staff');
  await expect(page.getByRole('table')).toContainText('Process');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Requisitor Name');
  await expect(page.getByRole('main')).toContainText('');
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await expect(page.getByRole('main')).toContainText('IRF Title');
  await expect(page.getByRole('main')).toContainText('IRF Status');
})

test("IRF Tracking Report, Invalid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'IRF Tracking' }).click();
  await page.getByRole('link', { name: 'IRF Tracking Report' }).click();
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await page.locator('.col > .v-btn').first().click();

  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await page.locator('.pl-1 > .v-btn').first().click();

  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click();

  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
})


//Initial Request from
test("New Initial Request Form, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();
  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '5' }).first().click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Request Form from Finance Manager');
  await page.getByRole('button', { name: 'IRF Category' }).click();
  await page.getByText('Business Operational Purchase').click();
  await page.locator('.v-input--selection-controls__ripple').first().click();
  await page.click('td:nth-child(2) > .v-input > .v-input__control > .v-input__slot');
  await page.locator('.v-text-field__slot input[type="text"]').last().fill('TestItem1')
  await page.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await page.locator('.v-text-field__slot input[type="number"]').last().fill('3')
  await page.getByLabel('Reason of Purchase').click();
  await page.getByLabel('Reason of Purchase').fill('This is entered by Finance Manager');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#app').getByRole('document').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('button', { name: 'back' }).click();
})

test('New Initial Request Form, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();
  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '30' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Submission Error');
});


test("To Process, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Badge Initial Request Form' }).click();
  await page.getByRole('link', { name: 'To Process' }).click();
  await page.locator('td').first().click();
  await page.getByRole('button', { name: 'back' }).click();
});


test("View IRF Summary, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'View IRF Summary' }).click();
  await page.getByLabel('From').click();
  
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '4', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('04/04/2024');
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('staff staff');
  await page.locator('div:nth-child(2) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');

  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Department');

  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00050');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00050');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click(); //error, "Clear" button does not work
  await page.getByRole('button', { name: 'Reset' }).click();
  
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Form from Staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Request Form from Staff');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Title');

  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'New' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('New');
  await page.locator('div:nth-child(6) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF Status');

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '4', exact: true }).last().click();
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00050');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Form from Staff');
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'New' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('04/04/2024');
  await expect(page.getByRole('table')).toContainText('staff staff');
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00050');
  await expect(page.getByRole('table')).toContainText('Request Form from Staff');
  await expect(page.getByRole('table')).toContainText('New');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('IRF Status');
});

test("View IRF Summary, Invalid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'View IRF Summary' }).click();
  //Invalid Test for Dates input
  await page.getByLabel('From').click();
  await page.getByLabel('Previous month').first().click();
  await page.getByRole('button', { name: '14' }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: 'Previous month' }).last().click();
  await page.getByRole('button', { name: '13' }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Invalid Test for Requisitor input
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Invalid Test for IRF No input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('IO');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Invalid Test for Title input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('o');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
});


//Quotation
test('View Quotation Summary, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Quotation' }).click();
  await page.getByRole('link', { name: 'View Quotation Summary' }).click();

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('staff staff');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');

  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Department');

  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00046');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00046');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF No.');

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Test Add Quotations 1');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Test Add Quotations 1');
  await page.locator('div:nth-child(6) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Title');

  await page.getByRole('button', { name: 'Quotation Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('New');
  await page.locator('div:nth-child(7) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Quotation Status');

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00046');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Test Add Quotations 1');
  await page.getByRole('button', { name: 'Quotation Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('staff staff');
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00046');
  await expect(page.getByRole('table')).toContainText('Test Add Quotations 1');
  await expect(page.getByRole('table')).toContainText('New');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('Quotation Status');
})

test('View Quotation Summary, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Quotation' }).click();
  await page.getByRole('link', { name: 'View Quotation Summary' }).click();
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('.pl-1 > .v-btn').first().click();

  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();

  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('div:nth-child(6) > .pl-1 > .v-btn').click();
})


//Purchase Requisition
test("View PR Summary, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '2', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table').last()).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PR No.').fill('KPR/FNA/2024/00009');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPR/FNA/2024/00009');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PR No.');

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing Quotation 2');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Testing Quotation 2');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('Title');

  await page.getByRole('button', { name: 'PR Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('PR Status');

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '2', exact: true }).last().click();
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').fill('KPR/FNA/2024/00009');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing Quotation 2');
  await page.getByRole('button', { name: 'PR Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await expect(page.getByRole('table')).toContainText('KPR/FNA/2024/00009');
  await expect(page.getByRole('table')).toContainText('Testing Quotation 2');
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('PR No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('PR Status');
})

test("View PR Summary, Invalid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '3', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
})


//Purchase Order
test('View PO Summary, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'View PO Summary' }).click();

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/DH/2024/00003');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await page.locator('body').press('CapsLock');
  await expect(page.getByRole('table')).toContainText('KPO/DH/2024/00003');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PO No.');

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing for Add Quotation');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Testing for Add Quotation');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('Title');

  await page.getByRole('button', { name: 'PO Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('PO Status');

  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/DH/2024/00003');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing for Add Quotation');
  await page.getByRole('button', { name: 'PO Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await expect(page.getByRole('table')).toContainText('KPO/DH/2024/00003');
  await expect(page.getByRole('table')).toContainText('Testing for Add Quotation');
  await expect(page.getByRole('table')).toContainText('Approved');

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('PO No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('PO Status');
});

test('View PO Summary, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'View PO Summary' }).click();
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();

})


//Delivery
test("Delivery Status, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Delivery' }).click();
  await page.getByRole('link', { name: 'Delivery Status' }).click();

  //Testing Date input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Department input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing PO.NO input
  await page.getByLabel('PO No.', { exact: true }).click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/DH/2024/00001');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPO/DH/2024/00001');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PO No.');

  //Testing IRF Title input
  await page.locator('header').filter({ hasText: 'Delivery Item Status' }).getByRole('button').click();
  await page.getByText('Title', { exact: true }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('Close Save').click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByLabel('IRF Title.').click();
  await page.getByPlaceholder('Filter By IRF Title.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF Title.').fill('Request Testing for Staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Request Testing for Staff');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('IRF Title.');

  //Testing Item Delivery Status input
  await page.getByRole('button', { name: 'Item Delivery Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Pending');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('Item Delivery Status');

  //Testing all inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('textbox', { name: 'PO No.' }).click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/DH/2024/00001');
  await page.getByLabel('IRF Title.').click();
  await page.getByPlaceholder('Filter By IRF Title.').fill('Request Testing for Staff');
  await page.getByRole('button', { name: 'Item Delivery Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await expect(page.getByRole('table')).toContainText('KPO/DH/2024/00001');
  await expect(page.getByRole('table')).toContainText('Request Testing for Staff');
  await expect(page.getByRole('table')).toContainText('Pending');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('PO No.');
  await expect(page.getByRole('main')).toContainText('IRF Title.');
  await expect(page.getByRole('main')).toContainText('Item Delivery Status');
})

test("Delivery Status, Invalid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Delivery' }).click();
  await page.getByRole('link', { name: 'Delivery Status' }).click();

  //Testing invalid Date input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '3', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  //Testing invalid PO.No input
  await page.getByRole('textbox', { name: 'PO No.' }).click();
  await page.getByPlaceholder('Filter By PO No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  //Testing invalid IRF Title input
  await page.getByLabel('IRF Title.').click();
  await page.getByLabel('IRF Title.').click();
  await page.getByPlaceholder('Filter By IRF Title.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
})


//Vendor
test("Add Vendor, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Vendor' }).click();
  await page.getByRole('link', { name: 'Add Vendor' }).click();

  await page.getByLabel('SSM Registration no.').fill('123');
  await page.getByLabel('SST Registration no.').fill('123');
  await page.getByRole('button', { name: 'SST Group' }).click();
  await page.getByText('Group G - IT Providers').click();
  await page.getByLabel('Company Name').fill('Testing Sdn Bhd');
  await page.getByRole('button', { name: 'Category' }).click();
  await page.getByText('ICT').click();
  await page.getByRole('button', { name: 'Payment Terms' }).click();
  await page.getByText('7 Days').click();
  await page.getByLabel('Address').fill('No 6, Jalan Testing');
  await page.getByRole('button', { name: 'Bank' }).click();
  await page.getByText('Affin Bank').click();
  await page.getByLabel('Bank account').fill('1234567890');
  await page.getByLabel('Contact Person').fill('aiman');
  await page.getByLabel('Phone 1').fill('0123456789');
  await page.getByLabel('Phone 2').fill('0134567890');
  await page.getByLabel('Email').fill('aiman@gmail.com');
  await page.getByLabel('Remarks').fill('Testing');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Submission Successful');
})

test("Add Vendor, Invalid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Vendor' }).click();
  await page.getByRole('link', { name: 'Add Vendor' }).click();

  await page.getByLabel('SST Registration no.').fill('123');
  await page.getByLabel('Contact Person').click();
  await page.getByLabel('Contact Person').fill('ABC');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Submission Error')).toBeVisible();
})


test("View Vendor, Valid Test", async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Vendor' }).click();
  await page.getByRole('link', { name: 'View Vendor' }).click();
  
  await page.getByRole('row', { name: 'View procurement procurement V0001 Test ICT 7 Days Aiman 0123456789 Active' }).getByRole('button').click();
  await expect(page.getByLabel('Vendor Code')).toHaveValue('V0001');
  await expect(page.getByLabel('SSM Registration no.')).toHaveValue('123');
  await expect(page.getByLabel('SST Registration no.')).toHaveValue('123');
  await expect(page.getByLabel('SST Group')).toHaveValue('Group G - IT Providers');
  await expect(page.getByLabel('Company Name')).toHaveValue('Test');
  await expect(page.getByLabel('Category')).toHaveValue('ICT');
  await expect(page.getByLabel('Payment Terms')).toHaveValue('7 Days');
  await expect(page.getByLabel('Address')).toHaveValue('No 6, Jalan Testing');
  await expect(page.getByLabel('Bank', { exact: true })).toHaveValue('Affin Bank');
  await expect(page.getByLabel('Bank account')).toHaveValue('123');
  await expect(page.getByLabel('Contact Person')).toHaveValue('Aiman');
  await expect(page.getByLabel('Phone 1')).toHaveValue('0123456789');
  await expect(page.getByLabel('Phone 2')).toHaveValue('0134567890');
  await expect(page.getByLabel('Email')).toHaveValue('testing@gmail.com');
  await expect(page.getByLabel('Remarks')).toHaveValue('Test');
  await expect(page.getByLabel('Last Updated', { exact: true })).toHaveValue('21/03/2024, 11:02:20 am');
  await expect(page.getByLabel('Last Updated By')).toHaveValue('procurement procurement');
  await page.getByRole('button', { name: 'back' }).click();
})