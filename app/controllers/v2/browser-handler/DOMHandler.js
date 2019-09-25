module.exports = {
    wooecomerce:()=>{
        try {
            if(!location.href.includes("?post_type=product&dgwt_wcas=1")){
                // case 1 , redirect to product site
        
                    const productContainer = document.getElementsByClassName("summary entry-summary")[0];
                    console.log(productContainer)
                    const prices = productContainer.getElementsByClassName("woocommerce-Price-amount amount");
                    const price = prices[prices.length >=1?1:0].innerText.split('.').join("");
                    return {
                        price:price,
                        url:location.href
                    }
                }
                else{
                // case 2 , dont match product
                    return false;
                }    
        } catch (error) {
            
        }
        
    },
    magento2: ()=>{
        try {
            const productsContainer = document.getElementsByClassName("products list items product-items")[0]
                                            .getElementsByClassName("item product product-item");
        
        if(productsContainer.length <=1){
            const productContainer = productsContainer[0];
            const url = productContainer.querySelector(".product-item-link").href;
            const price = productContainer.querySelector(".price").innerText.split(" ")[0].split(".").join("")
        return {
                price,url
            }
        }
        else{
            //case 2
            return false
        }    
        } catch (error) {
            
        }
        
    },
    opencart: ()=>{
        try {
            const productsContainer = document.querySelectorAll(".product-thumb")
            if(productsContainer.length<=1){
                // case 1: match product
                const productContainer = productsContainer[0];
                return {
                    price: productContainer.querySelector(".price").innerText.split(",").join(""),
                    url: productContainer.querySelector("a").href
                }
            }else{
                return false
            }    
        } catch (error) {
            
        }
        
    }
}