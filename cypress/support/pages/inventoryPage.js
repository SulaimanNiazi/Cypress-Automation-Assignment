import productDetailsPage from "./productDetailsPage.js"
import page from "./page"
class inventoryPage extends page{
    inventory={
        list:'.inventory_list',
        items:{
            item:'.inventory_item',
            name:'.inventory_item_name',
            price:'.pricebar > .inventory_item_price',
            amountAtHome:6,
            button:{
                text:{
                    selected:'REMOVE',
                    unselected:'ADD TO CART',
                },
                path:function(selected,number){
                    return ':nth-child('+number.toString()+') > .pricebar'+(selected?' > .btn_secondary':' > .btn_primary')
                },
            },
        }
    }
    cartCounter='.fa-layers-counter'
    sort={
        toNumerical:function(string){
            return parseFloat(string.split('$').pop().trim())
        },
        option:{
            container:'.product_sort_container',
            selected:'.product_sort_container option:selected',
        },
        alphabetical:{
            ascend:{
                option:'Name (A to Z)',
                value:'az',
            },
            descend:{
                option:'Name (Z to A)',
                value:'za',
            },
        },
        numerical:{
            ascend:{
                option:'Price (low to high)',
                value:'lohi',
            },
            descend:{
                option:'Price (high to low)',
                value:'hilo',
            },
        }
    }
    verifyHome(){
        cy.get(this.inventory.list).find(this.inventory.items.item).should('have.length',this.inventory.items.amountAtHome)
    }
    addItem(num){
        cy.get(this.inventory.items.button.path(false,num)).should('have.text',this.inventory.items.button.text.unselected).click()
    }
    verifyCount(num){
        cy.get(this.cartCounter).should('be.visible').should('have.text',num.toString())
    }
    verifyNotSelected(num){
        cy.get(this.inventory.items.button.path(false,num)).should('have.text',this.inventory.items.button.text.unselected)
    }
    removeItem(num){
        cy.get(this.inventory.items.button.path(true,num)).should('have.text',this.inventory.items.button.text.selected).click()
    }
    visitDetailsPage(num){
        cy.get(this.inventory.items.name).eq(num-1).click()
        return new productDetailsPage()
    }
    sortByName(reverse){
        if(reverse){
            cy.get(this.sort.option.container).select(this.sort.alphabetical.descend.option).should('have.value',this.sort.alphabetical.descend.value)
        }
        else{
            cy.get(this.sort.option.container).select(this.sort.alphabetical.ascend.option).should('have.value',this.sort.alphabetical.ascend.value)
        } 
    }
    sortByPrice(descending){
        if(descending){
            cy.get(this.sort.option.container).select(this.sort.numerical.descend.option).should('have.value',this.sort.numerical.descend.value)
        }
        else{
            cy.get(this.sort.option.container).select(this.sort.numerical.ascend.option).should('have.value',this.sort.numerical.ascend.value)
        }
    }
    verifySorted(reverse){
        cy.get(this.sort.option.selected).then((choice)=>{
            if((choice.text().includes(this.sort.alphabetical.ascend.option))||(choice.text().includes(this.sort.alphabetical.descend.option))){
                this.path=this.inventory.items.name
            }
            else{
                this.path=this.inventory.items.price
            }
            return Array()
        }).then((list)=>{
            cy.get(this.path).each(($el)=>{
                let val=$el.text()
                if(this.path==this.inventory.items.price){
                    val=this.sort.toNumerical(val)
                }
                list.push(val)
            }).then(()=>{
                let sorted
                if(this.path==this.inventory.items.price){
                    sorted=list.map(x=>x).sort((a,b)=>a-b)
                }
                else{
                    sorted=list.map(x=>x).sort()
                }
                if(reverse)sorted=sorted.reverse()
                expect(sorted).to.deep.equal(list)
            })
        })
    }
}
export default inventoryPage;