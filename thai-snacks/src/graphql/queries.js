/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      registered
      orders {
        items {
          id
          userId
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const getMarket = /* GraphQL */ `
  query GetMarket($id: ID!) {
    getMarket(id: $id) {
      id
      name
      products {
        items {
          id
          marketId
          description
          price
          shipped
          owner
          createdAt
          updatedAt
          orderProductsId
        }
        nextToken
      }
      tags
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listMarkets = /* GraphQL */ `
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
export const searchMarkets = /* GraphQL */ `
  query SearchMarkets(
    $filter: SearchableMarketFilterInput
    $sort: [SearchableMarketSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMarketAggregationInput]
  ) {
    searchMarkets(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
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
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      marketId
      description
      market {
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
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      updatedAt
      orderProductsId
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        marketId
        description
        market {
          id
          name
          tags
          owner
          createdAt
          updatedAt
        }
        file {
          bucket
          region
          key
        }
        price
        shipped
        owner
        createdAt
        updatedAt
        orderProductsId
      }
      nextToken
    }
  }
`;
