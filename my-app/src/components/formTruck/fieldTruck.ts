import { IField } from "../../types/type";

export const fieldTruck: IField[] = [
    {
        name: "truck_plate",
        type: "text",
        multi: false
    },
    {
        name: "truck_type",
        type: "select",
        multi: false
    },
    {
        name: "cargos",
        type: "select",
        multi: true

    }, {
        name: "driver",
        type: "select",
        multi: false

    }, {
        name: "price",
        type: "number",
        multi: false
    }, {
        name: "dimension",
        type: "text",
        multi: false

    }, {
        name: "address",
        type: "text",
        multi: false

    }, {
        name: "production_year",
        type: "date",
        multi: false

    }, {
        name: "status",
        type: "select",
        multi: false

    }, {
        name: "description",
        type: "textarea",
        multi: true

    }
]