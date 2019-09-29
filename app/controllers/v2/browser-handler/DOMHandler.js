module.exports = {
    wooecomerce:{
        search:()=>{
            try {
                if(!location.href.includes("?post_type=product&dgwt_wcas=1")){
                    // case 1 , redirect to product site
                        const productContainer = document.getElementsByClassName("summary entry-summary")[0];
                        const prices = productContainer
                                        .getElementsByClassName("price")[0]
                                        .getElementsByClassName("woocommerce-Price-amount amount");
                        const price = prices[prices.length>=2?1:0].innerText.split('.').join("");
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
                return false;
            }
            
        },
        fixUrl:()=>{
            try {
                const productContainer = document.getElementsByClassName("summary entry-summary")[0];
                const prices = productContainer
                                .getElementsByClassName("price")[0]
                                .getElementsByClassName("woocommerce-Price-amount amount");
                        
                        const price = prices[prices.length>=2?1:0].innerText.split('.').join("");
                        return !!price?price:false;
            } catch (error) {
                return false;
            }
        }
    },
    magento2: {
        search:()=>{
            try {
                const productsContainer = document.getElementsByClassName("products list items product-items")[0]
                                                .getElementsByClassName("item product product-item");
            
            if(productsContainer.length ===1){
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
                return false;
            }
            
        },
        fixUrl:()=>{
            try {
                const productContainer = document.querySelector(".product-info-main");
                const price = productContainer.querySelector("meta[itemprop=price]").content;
                return !!price?price:false;
            } catch (error) {
                return false
            }
        }
    },
    opencart: {
        search:()=>{
            try {
                const productsContainer = document.querySelectorAll(".product-thumb")
                if(productsContainer.length===1){
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
                return false;
            }
            
        },
        fixUrl:()=>{
            try {
                const productContainer = document.querySelector("#product-product");
                const list  = productContainer.querySelectorAll(".list-unstyled");
                const price = list[list.length-1].querySelector("h2").innerText.split(",").join("");
            return !!price?price:false; 
            } catch (error) {
                return false;
            }
        }
    },
    shopify:{
        search:()=>{
            try {
                const productsContainer = document.querySelectorAll(".product_c")[0];
                const products = productsContainer.querySelectorAll(".main_box");
                if(products.length===1){
                    const pricesContainer = products[0].querySelector(".price");
                    return(
                        {
                            price: pricesContainer.querySelector("span").innerText.split("V")[0].split(".").join(""),
                            url:products[0].querySelector(".desc").querySelector("a").href
                        } 
                    )                
                }
            } catch (error) {
                return false
            }
        },
        fixUrl:()=>{
            try {
                const priceContainer = document.querySelector("#productPrice");
                const price = priceContainer.textContent.trim().split("V")[0].split(".").join("");
                return !!price?price:false;
            } catch (error) {
                return false;
            }
        }
    },
    bootstrap1:{
        search:()=>{
            try {
                const productsContainer = document.querySelectorAll(".category-child")[0];
                const products = productsContainer.querySelectorAll(".product");
                if(products.length!==1){
                    return false
                }else{
                    const product = products[0].querySelector(".product-info");
                    const price = product.querySelector(".price").innerText.split("₫")[0].split(".").join("");
                    const url =  product.querySelector("a").href;
                    return {
                        price,url
                    }
                }
            } catch (error) {
                return false;
            }
        },
        fixUrl:()=>{
            try {
                const productContainer = document.querySelector("#product-single");
                if(!!productContainer){
                    const price = document.querySelector(".price-pro-detail").innerText.split(".").join("");
                    return !!price?price:false;
                }
                else{
                    return false;
                }
            } catch (error) {
                return false;
            }
        }
    },
    bootstrap2:{
        search:()=>{
            const productsContainer = document.querySelector("#search-result");
            const products = productsContainer.querySelectorAll(".product-item");
            if(!!products&&products.length!=1){
                console.log(products)
                return false;
            }else{
                const tmp  = products[0].querySelector(".price").innerText.split("VNĐ");
                const url =  products[0].querySelector("a").href;
                if(tmp.length===3){
                    const price = tmp[1].trim().split(" ")[2].split(".").join("");
                    return {price:!!price?price:false,url:url}
                }else{
                    const price = tmp[0].trim().split(".").join("");
                    return {price:!!price?price:false,url:url}
                }
            }
            
        },
        fixUrl:()=>{
            try {
                const test =  document.getElementsByClassName("attribute");
                const tmp = [];
                for(let i = 0; i<test.length;i++){
                    const text = test[i].querySelector("strong").innerText;
                    if(text =="Giá niêm yết:"||text=="Giá khuyến mãi:"){
                        tmp.push(test[i]);
                    }
                }
                const price =   tmp[tmp.length-1].innerText.split(" ")[3].split(".").join("");
                return !!price?price:false    
            } catch (error) {
                return false;
            }
            
        }
    }
}