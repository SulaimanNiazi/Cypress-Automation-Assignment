# Cypress-Automation-Assignment
---
## Task

#### Create automated tests for the Saucedemo.com website using Cypress. Use Cypress Cloud and any CI Provider of your choice to run parallel tests on Firefox and Chrome on a remote machine managed by CI Provider like Git Actions or Bitbucket Pipeline.  Website: __[https://www.saucedemo.com](https://www.saucedemo.com/v1/index.html)__
Requirements:
1. Technology Stack
   - Cypress
   - Cypress Cloud
   - CI Provider (of your choice e.g. Git Actions, Bitbucket Pipeline)

2. Setup:
   - Setup a Cypress repository on your machine.
   - Create a public remote repository and push your code there. Prefer to use a remote version control system whose CI tool you are familiar with e.g. use Github if you are familiar with Git Actions.
   - Create an account on Cypress Cloud and set up a public project on Cypress Cloud.

3. Test Cases to Automate:
   1. Successful Sign In:
  	- Automate the login process using valid credentials.

   2. Add Items to Cart and Remove Them from the Products Page:
  	- Add items to the cart from the products page and then remove them. Verify the cart icon and that the “Add to Cart” option returns for the product tile

   3. Add Items to Cart and Remove Them from the Checkout Page:
  	- Add items to the cart, proceed to the checkout page, and remove them from the cart on the checkout page. Verify that it is removed from the cart successfully

   4. Add Items to Cart and Remove Them from the Product Details Page:
  	- Add items to the cart from the product details page ( By clicking on the product)  and then remove them. Verify that the cart icon and that the “Add to Cart” option returns

   5. Buy Items:
  	- Add items to the cart, proceed to checkout, and complete the purchase.

   6. Add Items to Cart, Logout, and Login Again to Verify Cart Persistence:
  	- Add items to the cart, log out, log back in, and verify that the cart retains the items.

   7. Verify All Sorting Options on Products Page:
  	- Verify the functionality of all sorting options (e.g., price, name) on the products page.

4. Execution:
   - Create a test pipeline file in your code repository such that tests on Firefox and Chrome would run in parallel.
   - Trigger this test pipeline from the CI tool.

Guidelines

- Data Management:
  - Test Data should be stored as JSON and use Cypress fixtures to provide data to the tests.


- Configurable:
  - Test Browser (Firefox/Chrome) should be selectable through a config file or other means.

- Assertions & Error Handling:
  - Implement robust error handling and validation checks to ensure test stability and reliability.
  - Add as many assertions as you see fit. Each assertion should be documented in the repo with a valid reasoning for its inclusion

- Reporting:
  - Implement reporting to capture test results for any failed tests.
  - You can use any tool for reporting.


Submission:
- Share public repository link containing the automated tests.
- Ensure the repository includes a README file with instructions on setting up and running the tests.
- Share links of the successful run on Cypress Cloud.
- Include a brief report on the test coverage and any challenges faced during automation.

---
## Instructions on setting up and running the tests

1. Install **Node.js** and **Git** in your computer
1. Clone the repository in your working directory
1. Open Visual Studios, Windows PowerShell or Command Prompt and navigate to the directory
1. Run the following command line program:
```shell
npm install
```
5. Once the download is completed, enter the following command to run the test in headless mode:
```shell
npx cypress run --record
```
6. To run the test automatically, you may do so by GitHub actions through pushing and pull requests.
1. You may enter the following command to open cypress for manual testing:
```shell
npx cypress open
```
---
__[Link of successful run on Cypress Cloud](https://cloud.cypress.io/projects/r367ew/runs/21/overview?roarHideRunsWithDiffGroupsAndTags=1)__

---
#### Made under the mentorship of: Shahzeb Khan
---
<p align="center">
    <img src="https://d7umqicpi7263.cloudfront.net/img/product/269aa8b6-ac52-4bf4-812f-a7fba31ccf40.com/58bc3b55d8ba143b176ad691966bc9f7">
</p>