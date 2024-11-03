import React, { createContext, useState, useContext } from 'react';

// Create the context
const ShoppingListContext = createContext();

// Create the provider component
export const ShoppingListProvider = ({ children }) => {
  const [shoppingLists, setShoppingLists] = useState([
    {
        id: 3,
        name: 'Camping Gear',
        owner: 'user3',
        sharedWith: ['user1', 'user2'],
        items: [
          { id: 'item1', name: 'Tent', amount: 1, done: false },
          { id: 'item2', name: 'Sleeping Bags', amount: 2, done: false },
          { id: 'item3', name: 'Flashlight', amount: 2, done: true },
          { id: 'item4', name: 'Camping Stove', amount: 1, done: false },
          { id: 'item5', name: 'First Aid Kit', amount: 2, done: false },
          { id: 'item6', name: 'Bug Spray', amount: 2, done: false },
        ],
        archived: false,
    },
    // Add more sample lists as needed
  ]);

  const getShoppingListById = (id, loggedUser) => {
    return shoppingLists.find(list => 
      list.id === id && (list.owner === loggedUser || list.sharedWith.includes(loggedUser))
    );
  };
  

  const changeItemStatus = (listId, itemId) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId ? { ...item, status: !item.status } : item
              ),
            }
          : list
      )
    );
  };

  const deleteInvitedUser = (currentListId, item) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === currentListId
          ? {
              ...list,
              sharedWith: list.sharedWith.filter(user => user !== item),
            }
          : list
      )
    );
  };

  const inviteUser = (currentListId, newUser) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === currentListId && !list.sharedWith.includes(newUser)
          ? {
              ...list,
              sharedWith: [...list.sharedWith, newUser],
            }
          : list
      )
    );
  };

  const renameShoppingList = (id, userTriggered, newName) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === id && list.owner === userTriggered
          ? { ...list, name: newName }
          : list
      )
    );
  };

  const deleteItem = (listId, itemId) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.filter(item => item.id !== itemId),
            }
          : list
      )
    );
  };

  const addItem = (listId, itemName, itemAmount) => {
    setShoppingLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              items: [
                ...list.items,
                {
                  id: Date.now(), // Use current time as the unique ID
                  name: itemName,
                  amount: itemAmount,
                  status: false // Default status for new items
                }
              ],
            }
          : list
      )
    );
    console.log(shoppingLists[0])
  };
  
  

  return (
    <ShoppingListContext.Provider value={{ shoppingLists, setShoppingLists, getShoppingListById, renameShoppingList, changeItemStatus, deleteInvitedUser, inviteUser, deleteItem, addItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingLists = () => {
    return useContext(ShoppingListContext);
};