import { IRouter } from './../types/type';
import Cargo from "../pages/cargo/cargo"
import DetailCargo from "../pages/detailCargo/detailCargo"
import DetailDriver from "../pages/detailDriver/detailDriver"
import DetailTruck from "../pages/detailTruck/detailTruck"
import Driver from "../pages/driver/driver"
import Home from "../pages/home/home"
import MyAccount from "../pages/myAccount/myAccount"
import NewCargo from "../pages/newCargo/newCargo"
import NewDriver from "../pages/newDriver/newDriver"
import NewTruck from "../pages/newTruck/newTruck"

export const router: IRouter[] = [
    {
        path: "/truck",
        component: Home,
        name: "Home",
        header: true
    },
    {
        path: "/truck/newTruck",
        component: NewTruck,
        name: "NewTruck"
    },
    {
        path: "/truck/:id",
        component: DetailTruck,
        name: "DetailTruck"
    },
    {
        path: "/driver",
        component: Driver,
        name: "Driver",
        header: true
    },
    {
        path: "/driver/newDriver",
        component: NewDriver,
        name: "NewDriver"
    },
    {
        path: "/driver/:id",
        component: DetailDriver,
        name: "DetailDriver"
    },
    {
        path: "/cargos",
        component: Cargo,
        name: "Cargo",
        header: true
    },
    {
        path: "/cargos/newCargo",
        component: NewCargo,
        name: "NewCargo"
    },
    {
        path: "/cargos/:id",
        component: DetailCargo,
        name: "DetailCargo"
    },
    {
        path: "/account",
        component: MyAccount,
        name: "MyAccount"
    },
]