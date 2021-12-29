export const fieldTruck = [
    {
        name: "truck_plate",
        type: "input",
        multi: false
    },
    {
        name: "truck_type",
        type: "input",
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
        type: "input",
        multi: false

    }, {
        name: "address",
        type: "input",
        multi: false

    }, {
        name: "production_year",
        type: "number",
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
export const fieldCargo = [
    {
        name: "name",
        type: "input",
        multi: false
    }
]
export const fieldDriver = [
    {
        name: "name",
        type: "input",
        multi: false
    },
    {
        name: "address",
        type: "input",
        multi: false
    }
    , {
        name: "phone",
        type: "number",
        multi: false
    }
]
export const collumnDriver = ["id", "name", "address", "phone"]
export const collumnTruck = ["id", "truck_plate", "truck_type", "cargos", "driver", "price", "dimension", "address", "production_year", "status", "description"]
export const collumnCargo = ["id", "name"]