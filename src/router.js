import gql from "graphql-tag";
import { createRouter, createWebHistory } from "vue-router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import Vehicles from './components/Vehicles.vue'
import Historial from './components/Historial.vue'
import Settings from './components/Settings.vue'
import DetailByLicensePlate from './components/DetailByLicensePlate.vue'

const routes = [{
        path: '/user/logIn',
        name: "logIn",
        component: LogIn,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/signUp/',
        name: "signUp",
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        path: '/user/home',
        name: "home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/settings',
        name: "settings",
        component: Settings,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/vehicles',
        name: "vehicles",
        component: Vehicles,
        meta: { requiresAuth: true }
    },
    
    {
        path: '/user/vehicles/detailByLicensePlate',
        name: "detailByLicensePlate",
        component: DetailByLicensePlate,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/historial',
        name: "historial",
        component: Historial,
        meta: { requiresAuth: true }
    },
    
    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://api-gtw-app.herokuapp.com/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate({
            mutation: gql `
                mutation ($refresh: String!) {
                    refreshToken(refresh: $refresh) {
                        access
                    }
                }
            `,
            variables: {
                refresh: localStorage.getItem("token_refresh"),
            },
        })

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch {
        localStorage.clear();
        alert("Su sesi??n expir??, por favor vuelva a iniciar sesi??n");
        return false;
    }
}

router.beforeEach(async(to, from) => {
    var is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) return true
    if (is_auth) return { name: "home" };
    return { name: "logIn" };
})

export default router;