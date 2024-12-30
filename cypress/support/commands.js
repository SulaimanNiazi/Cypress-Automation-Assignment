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
Cypress.Commands.add('sidebarSelect',(num)=>{
    cy.get('.bm-burger-button > button').click()
    cy.get('.bm-menu a').eq(num-1).click()
})
Cypress.Commands.add('getItemButton',(selected,number)=>{
    const path=':nth-child('+number.toString()+') > .pricebar'+(selected?' > .btn_secondary':' > .btn_primary')
    return cy.get(path)
})
Cypress.Commands.add('checkSorted',(path,toFloat,reverse)=>{
    let list=Array(6)
    cy.get(path).each(($el,index)=>{
        let val=$el.text()
        if(toFloat){
            val=parseFloat(val.split('$').pop().trim())
        }
        list[index]=val
    }).then(()=>{
        const sorted=reverse?list.map(x=>x).sort((a,b)=>b-a):list.map(x=>x).sort((a,b)=>a-b)
        expect(sorted).to.deep.equal(list)
    })
})