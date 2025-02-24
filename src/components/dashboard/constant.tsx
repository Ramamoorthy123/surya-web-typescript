export const progressMenu = [
    {
        key: 1,
        label: 'Completed',
        color: '#66f1ad'
    },
    {
        key: 2,
        label: 'In progress',
        color: '#fcddd9'
    },
    {
        key: 3,
        label: 'Not Started',
        color: '#fff'
    }
]

export const columns = [
    {
        "key": 1,
        "value": "part_name",
        "hidden": false
    },
    {
        "key": 2,
        "value": "part_description",
        "hidden": false
    },
    {
        "key": 3,
        "value": "project_quantity",
        "hidden": false
    },
    {
        "key": 4,
        "value": "construction_spares",
        "hidden": true
    },
    {
        "key": 5,
        "value": "addl_qty_incl_o&m_spares",
        "hidden": true
    },
    {
        "key": 6,
        "value": "total_quantity",
        "hidden": true
    },
    {
        "key": 7,
        "value": "on-site_qty",
        "hidden": false
    },
    {
        "key": 8,
        "value": "balance_qty",
        "hidden": false
    },
    {
        "key": 9,
        "value": "distributed",
        "children": [
            "percentage",
            "qty"
        ],
        "hidden": false
    },
    {
        "key": 10,
        "value": "installed",
        "children": [
            "percentage",
            "qty"
        ],
        "hidden": false
    }
]