import React, { useState } from "react";
import "./listsOverview.css";

// Seznamy, které se zobrazí na úvodní stránce
const shoppingLists = [
    { id: 1, name: "Sunday dinner", sharedtome: false, archived: false, owner: "true" },
    { id: 2, name: "Peter's Lunch", sharedtome: true, archived: true, owner: "false" },
    { id: 3, name: "Summercamp", sharedtome: false, archived: true, owner: "true" },
    { id: 4, name: "IKEA furniture", sharedtome: false, archived: false, owner: "true" },
    { id: 5, name: "School project", sharedtome: true, archived: false, owner: "false" },
    { id: 6, name: "Holidays", sharedtome: true, archived: true, owner: "false" },
    { id: 7, name: "Personal", sharedtome: false, archived: true, owner: "true" },
    { id: 8, name: "Lidl food", sharedtome: true, archived: false, owner: "false" },
];

// Komponenta pro zobrazení seznamů
function ListsOverview() {
    const [lists, setLists] = useState(shoppingLists);
    const currentUser = "true"; // Replace with the actual current user ID

    // Funkce pro mazání seznamu
    const deleteList = (id) => {
        const list = lists.find((list) => list.id === id);
        if (list.owner !== currentUser) {
            alert("You are not the owner of this list and cannot delete it.");
            return;
        }
        if (window.confirm("Are you sure you want to delete this list?")) {
            setLists(lists.filter((list) => list.id !== id));
        }
    };

    // Funkce pro sdílení seznamu
    const shareList = (id) => {
        const list = lists.find((list) => list.id === id);
        if (list.owner !== currentUser) {
            alert("You are not the owner of this list and cannot share it.");
            return;
        }
        const userToShareWith = prompt("Enter the user ID to share this list with:");
        if (userToShareWith) {
            alert(`List with id ${id} shared with user ${userToShareWith}!`);
        }
    };

    const [filter, setFilter] = useState("all");

    // Funkce pro změnu filtru
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Filtr seznamů
    const filteredLists = lists.filter((list) => {
        if (filter === "all") return true;
        if (filter === "archived") return list.archived === true;
        if (filter === "notArchived") return list.archived === false;
        return true;
    });

    // Funkce pro přidání nového seznamu
    const addNewList = () => {
        const newListName = prompt("Enter the name of the new list:");
        if (newListName) {
            const newList = {
                id: lists.length + 1,
                name: newListName,
                sharedtome: false,
                archived: false,
                owner: currentUser,
            };
            setLists([...lists, newList]);
        }
    };

    // Zobrazení seznamů
    return (
        <div style={{ padding: "10px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
            <h1>Stacy's Todo</h1>
            <div style={{ marginBottom: "20px" }}>
            <label htmlFor="filter">Filter lists: </label>
            <select id="filter" value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="archived">Archived</option>
                <option value="notArchived">Not Archived</option>
            </select>
            </div>
            <button
                onClick={() => addNewList()}
                style={{
                    background: "none",
                    border: "3px solid #ccc",
                    cursor: "pointer",
                    color: "green",
                    padding: "3px",
                    fontSize: "16px",
                    marginBottom: "20px",
                }}
            >
                ➕
            </button>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {filteredLists.map((list) => (
                    <div
                        key={list.id}
                        style={{
                            border: "2px solid #ccc",
                            borderRadius: "10px",
                            margin: "10px",
                            padding: "20px",
                            width: "200px",
                            textAlign: "center",
                            background: "darkgrey",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            cursor: "pointer"
                        }}
                    >
                        <h3>{list.name}</h3>
                        <div>
                            {list.sharedtome ? "🤝" : "👑"} {/*pokud to mi to nikdo nesdili, tak jsem vlastnikem*/}
                            {list.archived ? "📦" : " "}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <button
                                onClick={() => shareList(list.id)}
                                style={{
                                    background: "none",
                                    border: "3px solid #ccc",
                                    cursor: "pointer",
                                    color: "blue",
                                    marginRight: "10px",
                                    padding: "3px",
                                    fontSize: "16px",
                                }}
                            >
                                🔗
                            </button>
                            <button
                                onClick={() => deleteList(list.id)}
                                style={{
                                    background: "none",
                                    border: "3px solid #ccc",
                                    cursor: "pointer",
                                    color: "red",
                                    padding: "3px",
                                    fontSize: "16px",
                                }}
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Export komponenty pro zobrazení seznamů
export default ListsOverview;
