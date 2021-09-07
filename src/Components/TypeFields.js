const typeFields = {
    ENE_SLRS: [{
            name: "market_run_id",
            label: "Market",
            options: ["DAM", "HASP", "RTM", "RUC"]
        }, {
            name: "schedule",
            label: "Schedule",
            options: ["All", "Export", "Generation", "Import"]
        }, {
            name: "tac_zone_name",
            label: "TAC Name",
            options: ["All", "Caiso_Totals", "NONTAC", "TAC_AZPS", "TAC_BANC",
                    "TAC_BANCSMUD", "TAC_BCHA", "TAC_ECNTR", "TAC_IPCO", "TAC_LADWP",
                    "TAC_NCNTR", "TAC_NEVP", "TAC_NORTH", "TAC_NWMT", "TAC_PAC",
                    "TAC_PGE", "TAC_PNM", "TAC_PSEI", "TAC_SCL", "TAC_SOUTH", "TAC_SRP",
                    "TAC_TIDC" ]
        }],
    PRC_LMP: [{
            name: "market_run_id",
            label: "Market",
            options: ["DAM", "RUC", "RTM"]
        }, {
            name: "node",
            label: "Node",
            options: ["0096WD_7_N001", "0096WD_7_N002", ]
    }],
    ENE_TRANS_LOSS: [{
        name: "market_run_id",
        label: "Market",
        options: ["RTD"]
    }],
}

export {typeFields};