import React, {useState, useEffect} from "react";
import { UserContext } from "../App";
import { createMarket } from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const NewMarket = () => {
  const [tags, setTags] = useState(["Chips", "Cookies", "Sweets", "Pastries", "Nuts"]);
  const [name, setName] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [addMarketDialog, toggleAddMarketDialog] = useState(false);

  const handleAddMarket = async user => {
    try {
      toggleAddMarketDialog(false);
      const input = {
        name: name,
        // tags: selectedTags,
        // todo: When creating a Market in AppSync console, the "sub" is used as the "owner", not "username"
        owner: user.attributes.sub
      };
      const result = await API.graphql(graphqlOperation(createMarket, { input }));
      console.log({ result });
      console.info(`Created market: id ${result.data.createMarket.id}`);
      setName("");
      setSelectedTags([]);
    } catch (err) {
      console.error('[!] Error adding new market', err);
      // todo: Add a UI notification here
    }
  }

  const handleFilterTags = query => {
    // 1. Below, we create a new array of Objects from the String values in the "tags" array
    // 2. We then filter through the new array of Objects and only keep values that matches
    // --> what's typed in the Select input box (*represented by the passed "query" param)
    const filteredTags = tags
      .map(tag => ({ value: tag, label: tag }))
      .filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()));
    setOptions(options => [
      ...options,
      filteredTags
    ]);
    console.log(options);
  }


  return (
    <UserContext.Consumer>
      {({ user }) => <>
        {/*{console.log(user)}*/}
        <div className="market-header">
          <h1 className="market-title">
            Create Your Market Place
            <Button onClick={() => toggleAddMarketDialog(true)}>
              {/*<i className="bi bi-pencil"></i>*/}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                   className="bi bi-pencil"
                   viewBox="0 0 16 16">
                <path
                  d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
              edit
            </Button>
          </h1>
        </div>

        <Modal show={addMarketDialog}>
          <Modal.Header>
            <Modal.Title>Create New Market</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Create Market Name</Form.Label>
                <Form.Control
                  placeholder="Market Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Add Tags</Form.Label>
                // TODO: Add a dynamic Select component here
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => toggleAddMarketDialog(!addMarketDialog)}>
              Cancel
            </Button>
            <Button variant="primary" disabled={!name} onClick={() => handleAddMarket(user)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>}
    </UserContext.Consumer>
  )
}

export default NewMarket;