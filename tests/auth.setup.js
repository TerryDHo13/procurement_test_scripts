const { test } = require('@playwright/test');
const { LoginPage } = require('../page/loginPage');


const staffFile = 'states/.auth/staff.json';
const hrHodFile = 'states/.auth/hrHod.json';
const ceoFile = 'states/.auth/ceo.json';
const financeManagerFile = 'states/.auth/financeManager.json';
const financeExecutiveFile = 'states/.auth/financeExecutive.json';
const procurementManagerFile = 'states/.auth/procurementManager.json';
const procurementOfficerFile = 'states/.auth/procurementOfficer.json';
const hodFile = 'states/.auth/hod.json';


test('Authenticate Staff', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.STAFF_EMAIL, process.env.PASSWORD, staffFile);
  await loginPage.authenticate();
});


test('Authenticate HR HOD', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.HR_HOD_EMAIL, process.env.PASSWORD, hrHodFile);
  await loginPage.authenticate();
});


test('Authenticate CEO', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.CEO_EMAIL, process.env.PASSWORD, ceoFile);
  await loginPage.authenticate();
});


test('Authenticate Finance Manager', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.FINANCE_MANAGER_EMAIL, process.env.PASSWORD, financeManagerFile);
  await loginPage.authenticate();
});


test('Authenticate Finance Executive', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.FINANCE_EXECUTIVE_EMAIL, process.env.PASSWORD, financeExecutiveFile);
  await loginPage.authenticate();
});


test('Authenticate Procurement Manager', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.PROCUREMENT_MANAGER_EMAIL, process.env.PASSWORD, procurementManagerFile);
  await loginPage.authenticate();
});


test('Authenticate Procurement Officer', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.PROCUREMENT_OFFICER_EMAIL, process.env.PASSWORD, procurementOfficerFile);
  await loginPage.authenticate();
});


test('Authenticate HOD', async ({ page }) => {
  const loginPage = new LoginPage(page, process.env.HOD_EMAIL, process.env.PASSWORD, hodFile);
  await loginPage.authenticate();
});