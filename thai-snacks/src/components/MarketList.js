import React from "react";
import { Connect } from "aws-amplify-react";
import {graphqlOperation} from "aws-amplify";

const listMarkets = `
  query ListMarkets(
    $filter: ModelMarketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMarkets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        products {
          nextToken
        }
        tags
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const MarketList = () => {

  return (
    // <Connect query={graphqlOperation(listMarkets)}></Connect>
    <div>Market List</div>
  )
}

export default MarketList;