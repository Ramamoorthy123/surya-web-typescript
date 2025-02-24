export const columns = [
    {
      key: 1,
      value: "piling",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 2,
      value: "pile_installation",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 3,
      value: "surveying",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 4,
      value: "pile_distribution",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 5,
      value: "tracker_install",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 6,
      value: "bha_distribution",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 7,
      value: "tracker_distribution",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 8,
      value: "tracker_alignment",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 9,
      value: "module_install",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 10,
      value: "rail_distribution",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 11,
      value: "rail_install",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 12,
      value: "module_distribution",
      children: ["progress", "counts"],
      hidden: false
    },
    {
      key: 13,
      value: "module_install",
      children: ["progress", "counts"],
      hidden: false
    }
  ]
  

  export const bomcolumns = [
    {
        "key": 1,
        "value": "piling",
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
        children: ["progress", "counts"],
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