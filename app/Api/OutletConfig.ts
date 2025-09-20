import { gql } from "@apollo/client";

export const OUTLET_CONFIG = gql`
   query OutletConfigData ($outletId: Int!) {
    getOutletConfigData (id: $outletId) {
        id
        name
        source
        email
        city
        region
        country
        outlet_image
        street_line_1
        street_line_2
        is_active
        website_id
        created_at
    }
   } 
`