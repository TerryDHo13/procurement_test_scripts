import { test, expect } from '@playwright/test';

test("Quotation Test, Testing process for To Process", async ({ browser }) => {
  const staffContext = await browser.newContext({ storageState: 'states/.auth/staff.json' });
  const staffPage = await staffContext.newPage();

  const procurementOfficerContext = await browser.newContext({ storageState: 'states/.auth/procurementOfficer.json' });
  const procurementOfficerPage = await procurementOfficerContext.newPage();

  await staffPage.goto(process.env.BASE_URL);
  await staffPage.getByRole('button', { name: 'Initial Request Form' }).click();
  await staffPage.getByRole('link', { name: 'New Initial Request Form' }).click();
  await staffPage.getByLabel('Deadline').click();
  await staffPage.getByRole('button', { name: '15' }).click();
  await staffPage.getByLabel('Title').fill('Test1 To Process');
  await staffPage.getByRole('button', { name: 'IRF Category' }).click();
  await staffPage.getByRole('option', { name: 'Business Operational Purchase' }).click();
  await staffPage.locator('.v-input--selection-controls__ripple').first().click();
  await staffPage.click('td:nth-child(2) > .v-input > .v-input__control > .v-input__slot');
  await staffPage.locator('.v-text-field__slot input[type="text"]').last().fill('TestItem1')
  await staffPage.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await staffPage.locator('.v-text-field__slot input[type="number"]').last().fill('3')
  await staffPage.getByLabel('Reason of Purchase').click();
  await staffPage.getByLabel('Reason of Purchase').fill('Testing Purposes for To Process');
  await staffPage.getByRole('button', { name: 'Submit' }).click();
  await staffPage.locator('#app').getByRole('document').getByRole('button', { name: 'Submit' }).click();
  await staffPage.getByRole('button', { name: 'Ok' }).click();
  await staffPage.getByRole('button', { name: 'back' }).click();

  await procurementOfficerPage.goto(process.env.BASE_URL);
  await procurementOfficerPage.getByRole('button', { name: 'Initial Request Form' }).click();
  await procurementOfficerPage.getByRole('link', { name: 'To Process' }).click();
  await procurementOfficerPage.locator('td').first().click();
  await procurementOfficerPage.getByRole('button', { name: 'Action' }).click();
  await procurementOfficerPage.getByRole('menuitem', { name: 'Process' }).click();
  await procurementOfficerPage.getByLabel('Procurement Remarks').click();
  await procurementOfficerPage.getByLabel('Procurement Remarks').fill('This is for Testing Purposes');
  await procurementOfficerPage.locator('#app').getByRole('document').getByRole('button', { name: 'Save' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Ok' }).click();
});

test('Quotation Test, Testing Add Quotation and To Recommend', async ({ browser }) => {
  const procurementOfficerContext = await browser.newContext({ storageState: 'states/.auth/procurementOfficer.json' });
  const procurementOfficerPage = await procurementOfficerContext.newPage();

  await procurementOfficerPage.goto(process.env.BASE_URL);
  await procurementOfficerPage.getByRole('button', { name: 'Badge Quotation' }).click();
  await procurementOfficerPage.getByRole('link', { name: 'Add Quotation' }).click();
  await procurementOfficerPage.locator('td').first().click();
  await procurementOfficerPage.getByRole('button', { name: '+ Add Item' }).click();
  await procurementOfficerPage.getByLabel('Item Name').click();
  await procurementOfficerPage.getByLabel('Item Name').fill('TestItem2');
  await procurementOfficerPage.getByLabel('Item Quantity', { exact: true }).click();
  await procurementOfficerPage.getByLabel('Item Quantity', { exact: true }).fill('3');
  procurementOfficerPage.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await procurementOfficerPage.getByRole('button', { name: 'Submit' }).click();
  await procurementOfficerPage.getByRole('button', { name: '++ Multiple Add' }).click();
  await procurementOfficerPage.getByPlaceholder('Select Vendor').click();

  await procurementOfficerPage.getByText('Testing Sdn Bhd').click();

  await procurementOfficerPage.locator('td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="text"]').nth(6).fill('1'); //Waranty input

  await procurementOfficerPage.locator('td:nth-child(4) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.getByRole('button', { name: '15' }).click(); //Schedule 

  await procurementOfficerPage.locator('td:nth-child(5) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="text"]').nth(8).fill('TestNameBrand'); //Brand Name

  await procurementOfficerPage.locator('td:nth-child(6) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(1).fill('1'); //Unit Price Fee

  await procurementOfficerPage.getByRole('button', { name: '0' }).first().click();
  await procurementOfficerPage.getByRole('option', { name: '6' }).click(); //Tax

  await procurementOfficerPage.locator('td:nth-child(8) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(2).fill('1'); //Delivery Fee

  await procurementOfficerPage.locator('td:nth-child(9) > .v-input > .v-input__control > .v-input__slot').first().click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(3).fill('1'); //Quantity

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-text-field__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="text"]').nth(9).fill('TestItem2'); //Item Name

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(3) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="text"]').nth(10).fill('1'); //Warranty input

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(4) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.getByRole('button', { name: '15' }).click(); //Schedule 

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(5) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="text"]').nth(12).fill('TestNameBrand2'); //Brand Name

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(6) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(4).fill('1'); //Unit Price Fee

  await procurementOfficerPage.getByRole('button', { name: '0' }).first().click();
  await procurementOfficerPage.getByRole('option', { name: '6' }).first().click(); //Tax

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(8) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(5).fill('1'); //Delivery Fee

  await procurementOfficerPage.locator('tr:nth-child(2) > td:nth-child(9) > .v-input > .v-input__control > .v-input__slot').click();
  await procurementOfficerPage.locator('.v-text-field__slot input[type="number"]').nth(6).fill('1'); //Quantity

  procurementOfficerPage.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await procurementOfficerPage.getByRole('button', { name: 'Save' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Deleted Items' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'OK' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Add Reply' }).first().click();
  await procurementOfficerPage.getByRole('combobox').locator('i').click();
  await procurementOfficerPage.getByText('Test', { exact: true }).click();
  await procurementOfficerPage.getByLabel('Warranty').click();
  await procurementOfficerPage.getByLabel('Warranty').fill('1');
  await procurementOfficerPage.getByLabel('Delivery Schedule').click();
  await procurementOfficerPage.getByRole('button', { name: '19' }).click();
  await procurementOfficerPage.getByLabel('Brand').click();
  await procurementOfficerPage.getByLabel('Brand').fill('TestNameBrand3');
  await procurementOfficerPage.getByLabel('Unit Price (RM)').click();
  await procurementOfficerPage.getByLabel('Unit Price (RM)').fill('2');
  await procurementOfficerPage.getByRole('button', { name: 'Select Tax' }).click();
  await procurementOfficerPage.getByRole('option', { name: '6' }).click();
  await procurementOfficerPage.getByLabel('Delivery Fee (RM)').click();
  await procurementOfficerPage.getByLabel('Delivery Fee (RM)').fill('1');
  await procurementOfficerPage.getByLabel('Item Reply Quantity').click();
  await procurementOfficerPage.getByLabel('Item Reply Quantity').fill('3');
  await procurementOfficerPage.getByRole('button', { name: 'Submit' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Ok' }).click();
  await procurementOfficerPage.locator('div:nth-child(6) > .v-dialog > div > header > .v-toolbar__content > .v-btn').click();
  await procurementOfficerPage.getByRole('button', { name: 'View Reply' }).first().click();
  await procurementOfficerPage.getByRole('button', { name: 'Select' }).first().click();
  await procurementOfficerPage.getByLabel('Item Remarks').click();
  await procurementOfficerPage.getByLabel('Item Remarks').fill('Item is Good');
  await procurementOfficerPage.getByRole('button', { name: 'Select' }).nth(2).click();
  await procurementOfficerPage.locator('.v-dialog > div > header > .v-toolbar__content > .v-btn').last().click();
  await procurementOfficerPage.getByRole('button', { name: 'Edit Item' }).nth(1).click();
  await procurementOfficerPage.getByRole('textbox', { name: 'Item Name' }).click();
  await procurementOfficerPage.getByRole('textbox', { name: 'Item Name' }).fill('TestItem2.1');
  await procurementOfficerPage.getByRole('spinbutton', { name: 'Item Quantity' }).click();
  await procurementOfficerPage.getByRole('spinbutton', { name: 'Item Quantity' }).fill('4');
  procurementOfficerPage.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await procurementOfficerPage.getByRole('button', { name: 'Save' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Edit Item' }).nth(1).click();
  await procurementOfficerPage.getByRole('button', { name: 'Delete', exact: true }).click();
  procurementOfficerPage.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await procurementOfficerPage.getByRole('button', { name: 'Yes' }).click();
  await procurementOfficerPage.locator('.v-btn__content').nth(6).click(); //Go to recommend
  await procurementOfficerPage.getByRole('button', { name: 'Action' }).click();
  await procurementOfficerPage.getByRole('menuitem', { name: 'Recommend' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'ok' }).click();
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').click();
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('T');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('This is entered by ');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('This is entered by P');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('This is entered by Procurement ');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('This is entered by Procurement O');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').press('CapsLock');
  await procurementOfficerPage.getByLabel('Recommendation By Procurement').fill('This is entered by Procurement Officer');
  procurementOfficerPage.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await procurementOfficerPage.getByRole('button', { name: 'Save' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Action' }).click();
  await procurementOfficerPage.getByRole('menuitem', { name: 'Recommend' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Yes' }).click();
  await procurementOfficerPage.getByRole('button', { name: 'Ok' }).click();
});

test('Quotation Test, Testing To Check', async ({ browser }) => {
  const financeManagerContext = await browser.newContext({ storageState: 'states/.auth/financeManager.json' });
  const financeManagerPage = await financeManagerContext.newPage();

  await financeManagerPage.goto(process.env.BASE_URL);
  await financeManagerPage.getByRole('button', { name: 'Badge Quotation' }).click();
  await financeManagerPage.getByRole('button', { name: 'Quotation' }).click();
  await financeManagerPage.getByRole('link', { name: 'To Check' }).click();

  await financeManagerPage.getByRole('cell', { name: 'Check' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Check' }).click();
  await financeManagerPage.getByRole('button', { name: 'Yes' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('button', { name: 'Badge Purchase Requisition' }).click();
  await financeManagerPage.getByRole('link', { name: 'Generate PR' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Generate PR' }).first().click();

  await financeManagerPage.getByLabel('PR Title').click();
  await financeManagerPage.locator('.v-text-field__slot textarea').nth(1).fill('This is entered by Finance Manager');

  await financeManagerPage.getByLabel('Procurement Remarks').click();
  await financeManagerPage.locator('.v-text-field__slot textarea').nth(2).fill('This is entered by Finance Manager');

  await expect(financeManagerPage.locator('form')).toContainText('Submit');
  await financeManagerPage.locator('button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--dark.v-size--default:has-text("Submit")').last().click();
  await financeManagerPage.locator('button.v-btn.v-btn--text.theme--dark.v-size--default.green--text.text--darken-1:has-text("Ok")').click();

  await financeManagerPage.getByRole('link', { name: 'Expenditure' }).click();
  await financeManagerPage.locator('button.v-btn.v-btn--is-elevated.v-btn--has-bg.theme--dark.v-size--small.primary').first().click();
  await expect(financeManagerPage.locator('form')).toContainText('Expenditure Type');
  await financeManagerPage.getByRole('button', { name: 'Expenditure Type' }).click();
  await financeManagerPage.getByRole('option', { name: 'CAPEX' }).click();

  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Submit' }).click();
  await financeManagerPage.getByRole('button', { name: 'Submit' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('link', { name: 'To Recommend' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Recommend' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Recommend' }).click();
  await financeManagerPage.getByRole('button', { name: 'Yes' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('link', { name: 'To Approve' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Approve' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Approve' }).click();
  await financeManagerPage.getByRole('button', { name: 'Yes' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('button', { name: 'Badge Purchase Order' }).click();
  await financeManagerPage.getByRole('link', { name: 'Generate PO' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Generate PO' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Submit' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('link', { name: 'To Verify' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Verify' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Verify' }).click();
  await financeManagerPage.getByRole('button', { name: 'Yes' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();

  await financeManagerPage.getByRole('link', { name: 'To Approve' }).click();
  await financeManagerPage.getByRole('cell', { name: 'Approve' }).first().click();
  await financeManagerPage.getByRole('button', { name: 'Action' }).click();
  await financeManagerPage.getByRole('menuitem', { name: 'Approve' }).click();
  await financeManagerPage.getByRole('button', { name: 'Yes' }).click();
  await financeManagerPage.getByRole('button', { name: 'Ok' }).click();
});