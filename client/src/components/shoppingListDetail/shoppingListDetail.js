import React, { useState } from 'react';
import "./shoppingListDetail.css"
import { useShoppingLists } from '../../providers/shoppingListProvider';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// This component is responsible for displaying the details of a shopping list.
const ShoppingListDetail = () => {
  const { getShoppingListById, renameShoppingList, changeItemStatus, deleteInvitedUser, inviteUser, deleteItem, addItem } = useShoppingLists();
  const currentListId = 3;
  const [currentUser, setCurrentUser] = useState("user3")
  const shoppingList = getShoppingListById(currentListId, currentUser);

  const [showCompleted, setShowCompleted] = useState(true);

  // If the shopping list doesn't exist or the user doesn't have access to it, display a message.
  if (!shoppingList) {
    return <p>You don't have access to this shopping list, or it doesn't exist.</p>;
  }

  // This function is called when the user changes the value of the select element.
  const handleSelectChange = (event) => {
    setShowCompleted(event.target.value === 'show');
  };

  // This function is called when the user changes the value of the select element.
  const handleSelectChangeUser = (event) => {
    setCurrentUser(event.target.value);
  };

  // This object contains the data for the pie chart.
  const completedItems = shoppingList.items.filter(item => item.status).length;
  const pendingItems = shoppingList.items.length - completedItems;

  // This object contains the data for the pie chart.
  const data = {
    labels: ['Completed', 'Open'],
    datasets: [
      {
        data: [completedItems, pendingItems],
        backgroundColor: ['#77dd77', '#36A2EB'],
        hoverBackgroundColor: ['#77dd77', '#36A2EB']
      }
    ]
  };

  return (
    <div className='wrapper'>
      <h2>{shoppingList.name}
      {shoppingList.owner === currentUser && (
        <div>
          <button onClick={() => renameShoppingList(currentListId, currentUser, prompt("Insert your name:"))}>
            Rename ✏️
          </button>
        </div>
      )}
      </h2>
      

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
                    {item.status ? '✅' : '🟦'}
                  </button>
                </td>
                <td className='itemDeleteButton'>
                  <button onClick={() => deleteItem(currentListId, item.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <button className='addItemButton' onClick={() => addItem(currentListId, prompt("Insert item name: "), parseInt(prompt("Insert count: ")))}>➕</button>
      
      <div className="pie">
        <Pie data={data} />
      </div>

      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", gap: '10px', borderTop: "1px solid black"}}>
        <strong>Members: </strong>
        {shoppingList.sharedWith && shoppingList.sharedWith.length > 0 ? (
          shoppingList.sharedWith.map((item, index) => (
            <span key={index}>
              {item}
              <button onClick={() => deleteInvitedUser(currentListId, item)}>❌</button>
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
    </div>
  );
};

// Export the component.
export default ShoppingListDetail;
