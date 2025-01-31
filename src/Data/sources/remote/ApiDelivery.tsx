import axios from "axios";


const ApiDelivery = axios.create({
    baseURL: 'http://10.0.0.39:3000/api',
    headers: {
        'content-type': 'application/json'
    }
});

export {ApiDelivery}