import { test, expect } from '@playwright/test';

test.use({ storageState: 'states/.auth/ceo.json' });


//IRF Tracking
test('IRF Tracking Report, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'IRF Tracking' }).click();
  await page.getByRole('link', { name: 'IRF Tracking Report' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('01/04/2024');
  await page.locator('.col > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Requisitor Input
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(14) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).nth(1).click();
  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('staff staff');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('Requisitor Name');

  //Testing Department Input
  await page.getByRole('button', { name: 'Filter By Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00040');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('');

  //Testing IRF No. Input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00038');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00038');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF No.');

  //Testing Title Input
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(13) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).nth(1).click();
  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Staff testing');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Staff testing');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF Title');

  //Testing Status Input
  await page.getByRole('button', { name: 'Filter By Status' }).click();
  await page.getByRole('option', { name: 'Initial Request Form' }).locator('div').first().click();
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'New' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('main')).toContainText('Initial Request Form');
  await expect(page.getByRole('table')).toContainText('New');
  await page.locator('div:nth-child(6) > div:nth-child(3) > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF Status');
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Reset Default' }).click();

  //Testing for all Inputs
  await page.locator('header').filter({ hasText: 'IRF Tracking Report' }).getByRole('button').nth(1).click();
  await page.locator('div:nth-child(13) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.locator('div:nth-child(14) > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Close' }).nth(1).click();
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Filter By Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00040');
  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing - New');
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('staff staff');
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00040');
  await expect(page.getByRole('table')).toContainText('Testing - New');
  await expect(page.getByRole('table')).toContainText('Process');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Requisitor Name');
  await expect(page.getByRole('main')).toContainText('');
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await expect(page.getByRole('main')).toContainText('IRF Title');
  await expect(page.getByRole('main')).toContainText('Filter By StatusInitial Request Form');
  await expect(page.getByRole('main')).toContainText('IRF Status');
});

test('IRF Tracking Report, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'IRF Tracking' }).click();
  await page.getByRole('link', { name: 'IRF Tracking Report' }).click();

  //Testing Invalid Date input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('.col > .v-btn').first().click();

  //Testing Invalid Requisitor input
  await page.getByLabel('Requisitor Name').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('.pl-1 > .v-btn').first().click();

  //Testing Invalid IRF No. input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('o');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click();

  //Testing Invalid Title input
  await page.getByLabel('IRF Title').click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
});


//Initial Request Form
test('New Initial Request Form, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();

  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '5', exact: true }).click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Testing Request CEO');
  await page.getByRole('button', { name: 'IRF Category' }).click();
  await page.getByRole('option', { name: 'Business Operational Purchase' }).click();
  await page.locator('.v-input--selection-controls__ripple').first().click();
  await page.click('td:nth-child(2) > .v-input > .v-input__control > .v-input__slot');
  await page.locator('.v-text-field__slot input[type="text"]').last().fill('TestItem1')
  await page.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await page.locator('.v-text-field__slot input[type="number"]').last().fill('3')
  await page.getByLabel('Reason of Purchase').click();
  await page.getByLabel('Reason of Purchase').fill('This is entered by CEO');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#app').getByRole('document').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.getByRole('button', { name: 'back' }).click();
});

test('New Initial Request Form, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();

  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '30' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#app')).toContainText('Submission Error');
});


//Testing View IRF Summary
test('View IRF Summary, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'View IRF Summary' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('01/04/2024');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Requisitor Input
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('staff staff');
  await page.locator('div:nth-child(2) > .pl-1 > .v-btn').click();
  await expect(page.getByLabel('Filter By Requisitor')).toBeVisible();

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('button', { name: 'Department' })).toBeVisible();

  //Testing IRF No Input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00039');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00039');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click(); //Error, "Clear" button not working
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await page.getByRole('button', { name: 'Reset' }).click();

  //Testing Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Testing for Staff');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Request Testing for Staff');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Title');

  //Testing Status Input
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Process');
  await page.locator('div:nth-child(6) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('button', { name: 'IRF Status' })).toBeVisible();
  await expect(page.getByRole('main')).toContainText('IRF Status');

  //Testing all at once
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '2', exact: true }).last().click();
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('DHIRF/DH/2024/00039');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Testing for Staff');
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('staff staff');
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await expect(page.getByRole('table')).toContainText('DHIRF/DH/2024/00039');
  await expect(page.getByRole('table')).toContainText('Request Testing for Staff');
  await expect(page.getByRole('table')).toContainText('Process');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('IRF Status');
})

test('View IRF Summary, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'View IRF Summary' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByLabel('Previous month').first().click();
  await page.getByRole('button', { name: '14' }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: 'Previous month' }).last().click();
  await page.getByRole('button', { name: '13' }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Testing Invalid Requisitor Input
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell')).toContainText('No data available');
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Testing Invalid IRF No Input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Testing Invalid Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
})


// Purchase Requisition
test('View PR Summary, Testing every possible input and clear button', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '2', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing PR NO. input
  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PR No.').fill('KPR/FNA/2024/00009');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPR/FNA/2024/00009');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PR No.');

  //Testing Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing Quotation 2');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Testing Quotation 2');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('Title');

  //Testing PR Status Input
  await page.getByRole('button', { name: 'PR Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('PR Status');

  //Testing for all inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
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

test('View PR Summary, Testing every possible invalid input', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '3', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  //Testing Invalid PR NO. Input
  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  //Testing Invalid Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
   await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
})


//Purchase Order
test('View PO Summary, Valid Test', async ({page}) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'View PO Summary' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Department input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing PO No. input
  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/FNA/2024/00002');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPO/FNA/2024/00002');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PO No.');

  //Testing Title input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing Quotation 2');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Testing Quotation 2');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('Title');

  //Testing PO Status
  await page.getByRole('button', { name: 'PO Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('PO Status');

  //Testing all inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Accounts & Finance Department' }).click();
  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/FNA/2024/00002');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Testing Quotation 2');
  await page.getByRole('button', { name: 'PO Status' }).click();
  await page.getByRole('option', { name: 'Approved' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await expect(page.getByRole('table')).toContainText('Accounts & Finance Department');
  await expect(page.getByRole('table')).toContainText('KPO/FNA/2024/00002');
  await expect(page.getByRole('table')).toContainText('Testing Quotation 2');
  await expect(page.getByRole('table')).toContainText('Approved');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('PO No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('PO Status');
})

test('View PO Summary, Invalid Test', async ({page}) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Order' }).click();
  await page.getByRole('link', { name: 'View PO Summary' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '3', exact: true }).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  //Testing Invalid PO NO. Input
  await page.getByLabel('PO No.').click();
  await page.getByPlaceholder('Filter By PO No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  //Testing Invalid Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
})
