# Cypress-Automation-Assignment
---
## Task

#### Create automated tests for the Saucedemo.com website using Cypress. Use Cypress Cloud and any CI Provider of your choice to run parallel tests on Firefox and Chrome on a remote machine managed by CI Provider like Git Actions or Bitbucket Pipeline.  Website: __[https://www.saucedemo.com](https://www.saucedemo.com/v1/index.html)__
---
## Instructions on setting up and running the tests

1. Install **Node.js** and **Git** in your computer
1. Clone the repository in your working directory
1. Open `.github\workflows\cypress.yml` and set your own cypress record key:
```yml
CYPRESS_RECORD_KEY: <your key>
```
4. Similarly open the `cypress.config.js` file and set your own project ID and cypress record key:
```js
module.exports = defineConfig({
    projectId: 'your id',
    e2e: {
        env:{
            CYPRESS_RECORD_KEY: <your_key>
        },
    }
})
```
5. Open Visual Studios, Windows PowerShell or Command Prompt and navigate to the directory
1. Run the following command line program:
```shell
npm install
```
7. Once the download is completed, enter the following command to run the test in headless mode:
```shell
npx cypress run --record
```
8. To run the test automatically, you may do so by GitHub actions through pushing and pull requests.
1. You may enter the following command to open cypress for manual testing:
```shell
npx cypress open
```
---
#### Made under the mentorship of: Shahzeb Khan
---
<p align="center">
    <img src="https://d7umqicpi7263.cloudfront.net/img/product/269aa8b6-ac52-4bf4-812f-a7fba31ccf40.com/58bc3b55d8ba143b176ad691966bc9f7">
</p>