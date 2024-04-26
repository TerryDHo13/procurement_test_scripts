import { test, expect } from '@playwright/test';

test.use({ storageState: 'states/.auth/hrHod.json' });


//Initial Request Form
test('New Initial Request Form, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();

  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '15' }).nth(2).click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Request Form from HR HOD');
  await page.getByRole('button', { name: 'IRF Category' }).click();
  await page.getByText('Business Operational Purchase').click();
  await page.locator('.v-input--selection-controls__ripple').first().click();
  await page.click('td:nth-child(2) > .v-input > .v-input__control > .v-input__slot');
  await page.locator('.v-text-field__slot input[type="text"]').last().fill('TestItem1')
  await page.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await page.locator('.v-text-field__slot input[type="number"]').last().fill('3')
  await page.getByLabel('Reason of Purchase').click();
  await page.getByLabel('Reason of Purchase').fill('This is entered by HR HOD');
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


//View IRF Summary
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
  await expect(page.getByRole('table').last()).toContainText('03/04/2024');
  await page.locator('.pl-1 > .v-btn').first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Requisitor Input
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('hr hod');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('hr hod');
  await page.locator('div:nth-child(2) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'HR & Administration' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('HR & Administration');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing IRF No. Input
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF No.').fill('KIRF/HRA/2024/00028');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KIRF/HRA/2024/00028');
  await page.locator('div:nth-child(4) > .pl-1 > .v-btn').click(); //Error, "Clear" button not working
  await expect(page.getByRole('main')).toContainText('IRF No.');
  await page.getByRole('button', { name: 'Reset' }).click();

  //Testing Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Form from HR HOD');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Request Form from HR HOD');
  await page.locator('div:nth-child(5) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Title');

  //Testing IRF Status Input
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'Process' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Process');
  await page.locator('div:nth-child(6) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('IRF Status');

  //Testing for all Inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('hr hod');
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'HR & Administration' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').fill('KIRF/HRA/2024/00028');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Form from HR HOD');
  await page.getByRole('button', { name: 'IRF Status' }).click();
  await page.getByRole('option', { name: 'New' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('03/04/2024');
  await expect(page.getByRole('table')).toContainText('hr hod');
  await expect(page.getByRole('table')).toContainText('HR & Administration');
  await expect(page.getByRole('table')).toContainText('KIRF/HRA/2024/00028');
  await expect(page.getByRole('table')).toContainText('Request Form from HR HOD');
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

test('View IRF Summary, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'View IRF Summary' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2' }).nth(1).click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1' }).nth(24).click();
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
  await page.getByPlaceholder('Filter By IRF No.').fill('IO');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Testing Invalid Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
});


//Purchase Requisition 
test('View PR Summary, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByLabel('Previous month').first().click();
  await page.getByRole('button', { name: '21' }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: 'Previous month' }).last().click();
  await page.getByRole('button', { name: '25' }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('21/03/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'HR & Administration' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('HR & Administration');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing PR No. Input
  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PR No.').fill('KPR/HRA/2024/00001');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPR/HRA/2024/00001');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PR No.');

  //Testing Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('R');
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Testing');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Request Testing');
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await expect(page.getByRole('main')).toContainText('Title');

  //Testing PR Status Input
  await page.getByRole('button', { name: 'PR Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Pending');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('PR Status');

  //Testing for all Inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '21' }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '25' }).last().click();
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'HR & Administration' }).click();
  await page.getByLabel('PR No.').click();
  await page.getByPlaceholder('Filter By PR No.').fill('KPR/HRA/2024/00001');
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').press('CapsLock');
  await page.getByPlaceholder('Filter By IRF Title').fill('Request Testing');
  await page.getByRole('button', { name: 'PR Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('21/03/2024');
  await expect(page.getByRole('table')).toContainText('HR & Administration');
  await expect(page.getByRole('table')).toContainText('KPR/HRA/2024/00001');
  await expect(page.getByRole('table')).toContainText('Request Testing');
  await expect(page.getByRole('table')).toContainText('Pending');
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');
  await expect(page.getByRole('main')).toContainText('Department');
  await expect(page.getByRole('main')).toContainText('PR No.');
  await expect(page.getByRole('main')).toContainText('Title');
  await expect(page.getByRole('main')).toContainText('PR Status');
});

test('View PR Summary, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Purchase Requisition' }).click();
  await page.getByRole('link', { name: 'View PR Summary' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: 'Previous month' }).first().click();
  await page.getByRole('button', { name: '25' }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: 'Previous month' }).last().click();
  await page.getByRole('button', { name: '13' }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  //Testing Invalid PR No. Input
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
});