import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const getMarket = `
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

const MarketPage = props => {
  const params = useParams();
  // state = {
  //   market: null,
  //   isLoading: true,
  //   isMarketOwner: false
  // }
  //
  // componentDidMount() {
  //   this.handleGetMarket();
  // }
  //
  // handleGetMarket = async () => {
  //   const input = {
  //     id: this.props.marketId
  //   };
  //
  //   const result = await API.graphql(graphqlOperation(getMarket, input));
  //
  //   this.setState({ market: result.data.getMarket, isLoading: false }, () => {
  //     this.checkMarketOwner();
  //   });
  // }
  //
  // checkMarketOwner = () => {
  //   const { user } = this.props;
  //   const { market } = this.props;
  //
  //   if (user) {
  //     this.setState({ isMarketOwner: user.username === market.owner });
  //   }
  // }

  return(
    <div>MarketPage {params.marketId}</div>
  )

  // render() {
  //   const { market, isLoading, isMarketOwner } = this.state;
  //
  //   return isLoading ? (
  //     <Spinner animation="grow" variant="primary" />
  //   ) : (
  //     <>
  //       {/* Back Button */}
  //       <Link className="link" to="/">
  //         Back to Markets List
  //       </Link>
  //
  //       <span className="items-center pt-2">
  //         <h2 className="mb-mr">{market.name}</h2>- {market.owner}
  //       </span>
  //
  //       {/* Market Metadata */}
  //       <div className="items-center pt-2">
  //         <span style={{ color: "var(--lightSquidInk)", paddingBottom: "1em" }}>
  //           <i className="bi bi-calendar2-plus"></i>
  //           {market.createdAt}
  //         </span>
  //       </div>
  //
  //       <Tabs defaultActiveKey="product-list">
  //         <Tab eventKey="add-product" title="Add Product">
  //           <>
  //             <i className="bi bi-plus"></i>
  //           </>
  //         </Tab>
  //         <Tab eventKey="product-list" title="Product List">
  //           {/*{market.products.items.map(product => (*/}
  //           {/*  */}
  //           {/*))}*/}
  //         </Tab>
  //       </Tabs>
  //     </>
  //   )
  // }
}

export default MarketPage;