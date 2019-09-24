const Shop =  require("../../models/v2/shop.model");
const Product = require("../../models/v2/shopProduct.model");
const Sku = require("../../models/v2/sku.model");
const Crawler = require("./browser-handler/crawler");
const Handler = require("./browser-handler/DOMHandler");
let config = require("./browser-handler/config.json"); 

const shopSkuBySku = async (_sku)=>{
    const skus = await Product.find({sku:_sku})
    return skus;
}

module.exports = {
    getShops:async (req,res)=>{
        try {
            const shops = await Shop.find();
            res.json({
                data:shops
            })
        } catch (error) {
            console.log(error)
        }
    },
    getSkus:async (req,res)=>{
        try {
            const Skus = await Sku.find();
            console.log(Skus)
            res.json({
                data: Skus
            })
        } catch (error) {
            console.log(error)
        }
    },
    searchProduct: async (req,res)=>{
        try{
            const shops = config.shops;
            const sku = req.body.sku;
            const Skus = (await Sku.find()).map(e=>e._id);
            console.log(req.body)
            if(!!Skus.includes(sku)){
                const skus = await shopSkuBySku(sku)
                console.log(skus);
                for(let i = 0 ; i < skus.length; i++){
                    const goUrl = shops[skus[i].shop].searchUrl + sku;
                     
                }
            }else{
                const newSku = new Sku({
                    _id:sku
                })
                await newSku.save();
                const shops = config.shops;
                for(let i = 0; i<shops.length ;i++){
                    const goUrl = shops[i].searchUrl + sku;
                    const product = await Crawler.ini(goUrl,Handler[shops[i].type]);
                    if(!!product){
                        const tmpProduct = await Product.find({shopSku:sku});
                        if(!!tmpProduct){
                            tmpProduct.price = product.price;
                            tmpProduct.url  =  product.url;
                            await tmpProduct.save()
                        }else{
                            const newProduct = new Product({
                                ...product,
                                shopSku:sku,
                                sku:sku,
                                shop:shops[i].name
                            })
                            await newProduct.save()
                        }
                    }else{
                        const newProduct = new Product({
                            url:null,
                            shopSku:null,
                            sku:sku,
                            shop:shops[i].name
                        })
                        await newProduct.save()
                    }
                }
            }
            res.json({})
        }catch(error){
            console.log(error)
        }
    }
}