const Shop =  require("../../models/v2/shop.model");
const Product = require("../../models/v2/shopProduct.model");
const Sku = require("../../models/v2/sku.model");
const Crawler = require("./browser-handler/crawler");
const Handler = require("./browser-handler/DOMHandler");
let config = require("./browser-handler/config.json"); 

const shopSkuBySku = async (_sku)=>{
    const skus = await Product.find({sku:_sku});
    return skus;
}
const productByShop = async (_shop)=>{
    return await Product.find({shop:_shop});
}

const searchOneProduct = async (_sku)=>{
    try{
        const shops = config.shops;
        const sku = _sku;;
        const Skus = (await Sku.find()).map(e=>e._id);
        if(!!Skus.includes(sku)){
            const Products = await shopSkuBySku(sku)
            console.log(Products);
            for(let i = 0 ; i < Products.length; i++){
                const shop = shops.find(e=>e.name===Products[i].shop);
                const goUrl = shop.searchUrl + sku;
                const product = await Crawler.ini(goUrl,Handler[shop.type])
                console.log(product)
                if(!!product){
                    Products[i].price = product.price;
                    Products[i].url = product.url;
                    await Products[i].save;
                }
            }
            return true;
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
                    const Products = await shopSkuBySku(sku);
                    const tmpProduct = Products.find(e=>product.url.includes(e.shop))
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
                        await newProduct.save();
                    }
                }else{
                    const newProduct = new Product({
                        url:null,
                        shopSku:null,
                        sku:sku,
                        shop:shops[i].name
                    })
                    await newProduct.save();
                }
            }
            return true;
        }
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports = {
    getSkus:async (req,res)=>{
        try {
            const Skus = await Sku.find();
            
            res.json({
                data: Skus,
                success: !!Skus
            })
        } catch (error) {
            console.log(error);
            res.json({
                success: false
            })
        }
    },
    getShopProducts: async (req,res)=>{
        try {
            const shop = req.params.shop;
            console.log(shop);
            const products = await Product.find({shop:shop});
            res.json({
                success: !!products,
                data: products
            })

        } catch (error) {
            console.log(error);
            res.json({
                success: false
            })
        }
    },
    searchProduct: async (req,res)=>{
        try {
            const sku = req.body.sku
                        .trim()
                        .replace(/\s+/g, "-")
                        .toUpperCase();

            if(await searchOneProduct(sku)){
                res.json({
                    success: true
                })
            }else{
                res.json({
                    success: false
                })
            }
        } catch (error) {
            console.log(error);
        }
    },
    getShops: async (req, res)=>{
        try {
            const shops = await Shop.find();
            res.json({
                success: !!shops,
                data: shops
            })
            
        } catch (error) {
            console.log(error);
        }
    },
    deleteSku:async (req,res)=>{
        try {
            const sku = req.params.sku
                        .trim()
                        .replace(/\s+/g, "-")
                        .toUpperCase();
            await Sku.deleteOne({_id:sku});
            await Product.deleteMany({sku:sku})

            res.json({
                success: true
            })

        } catch (error) {
            console.log(error);
            res.json({
                success: false
            })
        }
    },
    getPrimaryProduct :async ()=>{
        try {
            const products = await Product.find();
            res.json({
                success:!!products,
                data:products
            })
        } catch (error) {
            console.log(res)
            res.json({
                success:false
            })
        }
    }
}