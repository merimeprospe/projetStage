import { configureStore, createSlice } from "@reduxjs/toolkit";
//import axios from "axios";
const initialState = {
    company: null,
    products: null,
    error: null,
    user: {
        user: {},
        access_token: null,
    },
    collections: null,
    productsearch: [],
    curent: null,
    token: null,
    product: null,
    collection: null,
    idProduct: null,
    idCollection: null,
    login: null,
    commande:{},
    api:"https://api.genuka.com/2021-10/",
    url: document.location.protocol + "//" + document.location.hostname,
    cart:{
        products:{
            product:[],
            // product:[{
            //     name: null,
            //     id: null,
            //     quantity: null,
            //     price: null,
            //     image: null,
            //     variante:{
            //         taille: null,
            //         couleur: null,
            //     } 
            // }],
            total: 0,
            prixTotal: 0,
            /**
             * {
             * name: ,
             * id:,
             * quantity,
             * price,
             * properties{complement:, note:""}
             * }
             * 
             */
         },
        address: {
            additional_address: null,
            addressable_id: 1074,
            addressable_type: "",
            attributes: {
                tel: ""
            },
            city: "",
            country: "",
            country_code: null,
            created_at: "",
            family_name: "",
            given_name: "",
            id: null,
            is_billing: 0,
            is_primary: 1,
            is_shipping: 1,
            label: "",
            latitude: "",
            longitude: "",
            organization: "",
            postal_code: "",
            region: null,
            state: null,
            street: "",
            type: 1,
            updated_at: "",
            ville: null,
            ville_id: null
        },
        address_id: 417,
        address_type: 2,
        date: "",
        human_date: "",
        mode: "",
        state: 0
     }
};

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    reducers: {
        /**setter */
        setCompany: (state, action) => {
            state.company = action.payload
        },
        setCommande: (state, action) => {
            state.commande = action.payload
        },
        setCart: (state) => {
            console.log('state.user rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
            state.cart.products.product = []
            state.cart.products.total = 0
            state.cart.products.prixTotal = 0 
        },
        setProductsearch: (state, action) => {
            state.productsearch = action.payload
        },
        setUserC: (state, action) => {
            console.log('state.user',state.user)
            state.user = action.payload
            console.log('state.user',state.user)
        },
        setPrixTotal: (state, action) => {
            state.prixTotal = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setCurent:(state, action) => {
            state.curent = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setquantutycart1: (state, action) => {
            for(let i=0; i<state.cart.products.total; i++){
                if(state.cart.products.product[i].id === action.payload.pro.id){
                    for(let j=0; j<action.payload.k; j++)
                    {
                        state.cart.products.product[i].quantity++ 
                    }
                }
            }
        },
        setquantutycart: (state, action) => {
            for(let i=0; i<state.cart.products.total; i++){
                if(state.cart.products.product[i].id === action.payload.id){
                    state.cart.products.product[i].quantity++
                }
            }
        },
        setRemovquantutycart: (state, action) => {
            for(let i=0; i<state.cart.products.total; i++){
                if(state.cart.products.product[i].id === action.payload.id){
                    if(state.cart.products.product[i].quantity!==1)
                    {
                        state.cart.products.product[i].quantity--
                    }
                }
            }
        },
        deletproductcart: (state, action) => {
            let p = []
            let n = 0
            for(let i=0; i<state.cart.products.total; i++){
                if(i === action.payload){
                    n=1
                }else{
                    p.push(state.cart.products.product[i])
                }
            }
            if(n===1){
                state.cart.products.product = p
                state.cart.products.total--
            }
        },
        addProductcart: (state, action) => {
            state.cart.products.product[state.cart.products.total] = action.payload
        },
        addtotalcart: (state) => {
            state.cart.products.total++
        },
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setCollections: (state, action) => {
            state.collections = action.payload
        },
        addProducts: (state, action) => {
            for (let index = 0; index < action.payload.length; index++) {
                const element = action.payload[index];
                state.products.data.push(element)

            }
        },
        addProduct: (state, action) => {
            state.products.data.push(action.payload)
        },
        addCollections: (state, action) => {
            for (let index = 0; index < action.payload.length; index++) {
                const element = action.payload[index];
                state.collections.data.push(element)

            }
        },
        addCollection: (state, action) => {
            state.collections.data.push(action.payload)
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        setCollection: (state, action) => {
            state.collection = action.payload
        },
        setIdProduct: (state, action) => {
            state.idProduct = action.payload
        },
        setIdCollection: (state, action) => {
            state.idCollection = action.payload
        },
        
        
    }
});
export const { 
    setCompany,
    setLogin,
    setProducts,
    addProducts,
    setCurent,
    setCommande,
    setError,
    setPrixTotal,
    setProductsearch,
    setquantutycart,
    deletproductcart,
    setRemovquantutycart,
    addProduct,
    addProductcart,
    addtotalcart,
    addCollection,
    setCollections,
    setquantutycart1,
    setToken,
    setProduct,
    setCollection,
    setIdProduct,
    setIdCollection,
    setUserC,
    setCart,getCompany } = dataSlice.actions;
export const store = configureStore({
    reducer: {
        data: dataSlice.reducer
    }
});