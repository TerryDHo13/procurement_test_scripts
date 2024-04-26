import { test, expect } from '@playwright/test';

test.use({ storageState: 'states/.auth/staff.json' });


//Initial Request Form
test('New Initial Request Form, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Initial Request Form' }).click();
  await page.getByRole('link', { name: 'New Initial Request Form' }).click();

  await page.getByLabel('Deadline').click();
  await page.getByRole('button', { name: '15' }).first().click();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Request Form from Staff');
  await page.getByRole('button', { name: 'IRF Category' }).click();
  await page.getByText('Business Operational Purchase').click();
  await page.locator('.v-input--selection-controls__ripple').first().click();
  await page.click('td:nth-child(2) > .v-input > .v-input__control > .v-input__slot');
  await page.locator('.v-text-field__slot input[type="text"]').last().fill('TestItem1')
  await page.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await page.locator('.v-text-field__slot input[type="number"]').last().fill('3')
  await page.getByLabel('Reason of Purchase').click();
  await page.getByLabel('Reason of Purchase').fill('This is entered by Staff');
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
  await expect(page.getByRole('main')).toContainText('Filter By Requisitor');

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.locator('div:nth-child(3) > .pl-1 > .v-btn').click();
  await expect(page.getByRole('main')).toContainText('Department');

  //Testing IRF No Input
  await page.getByLabel('IRF No.').click();
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
  await expect(page.getByRole('main')).toContainText('IRF Status');

  //Testing all at once
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '1', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByLabel('Filter By Requisitor').click();
  await page.getByPlaceholder('Filter By Requisitor').fill('staff');
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByLabel('IRF No.').click();
  await page.getByPlaceholder('Filter By IRF No.').press('CapsLock');
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
});

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
  await page.getByPlaceholder('Filter By IRF No.').fill('IO');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();

  //Testing Invalid Title Input
  await page.getByLabel('Title', { exact: true }).click();
  await page.getByPlaceholder('Filter By IRF Title').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
})


//Delivery
test('Delivery Status, Valid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Delivery' }).click();
  await page.getByRole('link', { name: 'Delivery Status' }).click();

  //Testing Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '3', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('02/04/2024');
  await page.getByRole('button', { name: 'Clear' }).first().click();
  await expect(page.getByRole('main')).toContainText('From');
  await expect(page.getByRole('main')).toContainText('Until');

  //Testing Department Input
  await page.getByRole('button', { name: 'Department' }).click();
  await page.getByRole('option', { name: 'Digital Heritage' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Digital Heritage');
  await page.getByRole('button', { name: 'Clear' }).nth(1).click();
  await expect(page.getByRole('main')).toContainText('Department');
  
  //Testing PO.NO Input
  await page.getByLabel('PO No.', { exact: true }).click();
  await page.getByPlaceholder('Filter By PO No.').press('CapsLock');
  await page.getByPlaceholder('Filter By PO No.').fill('KPO/DH/2024/00001');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('KPO/DH/2024/00001');
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();
  await expect(page.getByRole('main')).toContainText('PO No.');

  //Testing IRF Title Input
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

  //Testing Item Delivery Status Input
  await page.getByRole('button', { name: 'Item Delivery Status' }).click();
  await page.getByRole('option', { name: 'Pending' }).click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('table')).toContainText('Pending');
  await page.getByRole('button', { name: 'Clear' }).nth(4).click();
  await expect(page.getByRole('main')).toContainText('Item Delivery Status');

  //Testing all Inputs
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '2', exact: true }).first().click();
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

test('Delivery Status, Invalid Test', async ({ page }) => {
  await page.goto(process.env.BASE_URL);
  await page.getByRole('button', { name: 'Delivery' }).click();
  await page.getByRole('link', { name: 'Delivery Status' }).click();

  //Testing Invalid Date Input
  await page.getByLabel('From').click();
  await page.getByRole('button', { name: '3', exact: true }).first().click();
  await page.getByLabel('Until').click();
  await page.getByRole('button', { name: '1', exact: true }).last().click();
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).first().click();

  //Testing Invalid PO.No Input
  await page.getByRole('textbox', { name: 'PO No.' }).click();
  await page.getByPlaceholder('Filter By PO No.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear' }).nth(2).click();

  //Testing Invalid IRF Title Input
  await page.getByLabel('IRF Title.').click();
  await page.getByPlaceholder('Filter By IRF Title.').fill('o');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await page.getByRole('button', { name: 'Clear' }).nth(3).click();
  await page.getByLabel('IRF Title.').click();
  await page.getByPlaceholder('Filter By IRF Title.').fill('z');
  await page.getByRole('button', { name: '󰍉 filter' }).click();
  await expect(page.getByRole('cell', { name: 'No data available' })).toBeVisible();
})


