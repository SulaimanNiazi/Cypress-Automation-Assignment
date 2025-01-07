// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('checkSorted',(path,amount,reverse,unitValue,symbol,symbolAfter)=>{
    if((symbol==null)||(unitValue==null)){
        unitValue=false
    }
    if(symbolAfter==null){
        symbolAfter=false
    }
    let list=Array(amount)
    cy.get(path).each(($el,index)=>{
        let val=$el.text()
        if(unitValue){
            val=parseFloat(val.split(symbol)[+symbolAfter].trim())
        }
        list[index]=val
    }).then(()=>{
        const sorted=reverse?list.map(x=>x).sort((a,b)=>b-a):list.map(x=>x).sort((a,b)=>a-b)
        expect(sorted).to.deep.equal(list)
    })
})