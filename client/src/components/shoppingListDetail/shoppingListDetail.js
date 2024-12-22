import React, { useState } from 'react';
import "./shoppingListDetail.css"
import { useShoppingLists } from '../../providers/shoppingListProvider';
import Icon from '@mdi/react';
import { mdiAccessPointCheck, mdiPencil, mdiDeleteCircle, mdiPlus } from '@mdi/js';

const ShoppingListDetail = () => {
  const { getShoppingListById, renameShoppingList, changeItemStatus, deleteInvitedUser, inviteUser, deleteItem, addItem } = useShoppingLists();
  const currentListId = 3;
  const [currentUser, setCurrentUser] = useState("user1")
  const shoppingList = getShoppingListById(currentListId, currentUser);

  const [showCompleted, setShowCompleted] = useState(true);

  if (!shoppingList) {
    return <p>You don't have access to this shopping list, or it doesn't exist.</p>;
  }

  const handleSelectChange = (event) => {
    setShowCompleted(event.target.value === 'show');
  };

  const handleSelectChangeUser = (event) => {
    setCurrentUser(event.target.value);
  };
  return (
    <div className='wrapper'>
      <h2>{shoppingList.name} <Icon path={mdiAccessPointCheck} size={1} /></h2>
      {shoppingList.owner === currentUser && (
        <div>
          <strong>You are owner of this shopping list.</strong>
          <button onClick={() => renameShoppingList(currentListId, currentUser, prompt("Insert your name:"))}>
            Rename <Icon path={mdiPencil} size={0.5} />
          </button>
        </div>
      )}

      <select onChange={handleSelectChangeUser} style={{marginRight: "10px"}}>
        <option value="user1">User1</option>
        <option value="user2">User2</option>
        <option value="user3">User3</option>
      </select>

      <select onChange={handleSelectChange}>
        <option value="show">Show all</option>
        <option value="hide">Hide solved</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.items
            .filter(item => showCompleted || !item.status)
            .map((item, index) => (
              <tr key={index}>
                <td className='tdAmount'>{item.amount}</td>
                <td className='tdName'>{item.name}</td>
                <td className='tdStatus'>
                  <button onClick={() => changeItemStatus(currentListId, item.id)}>
                    {item.status ? '✔️' : '❌'}
                  </button>
                </td>
                <td className='tdAction'>
                  <button onClick={() => deleteItem(currentListId, item.id)}>
                    <Icon path={mdiDeleteCircle} size={0.5} /> Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className='addItemButton' onClick={() => addItem(currentListId, prompt("Insert item name: "), parseInt(prompt("Insert count: ")))}>Insert item into list <Icon path={mdiPlus} size={0.5}></Icon></button>

      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '5px', borderTop: "1px solid black"}}>
        <strong style={{marginTop: "5px"}}>Members: </strong>
        {shoppingList.sharedWith && shoppingList.sharedWith.length > 0 ? (
          shoppingList.sharedWith.map((item, index) => (
            <span key={index}>
              {item}
              <button onClick={() => deleteInvitedUser(currentListId, item)}><Icon path={mdiDeleteCircle} size={0.5} /></button>
              {index < shoppingList.sharedWith.length - 1 ? '' : ''}
            </span>
          ))
        ) : (
          <span>No Members</span> // Fallback if no members are present
        )}
      </div>
      <button onClick={() => inviteUser(currentListId, prompt("Insert name of user: "))}>Invite collaborators</button>

      {currentUser !== shoppingList.owner && (
        <button onClick={() => deleteInvitedUser(currentListId, currentUser)}>
          Leave from this shopping list
        </button>
      )}
      <h4>_</h4>
      <h4>_</h4>
      <h4>_</h4>
    </div>
  );
};

export default ShoppingListDetail;
