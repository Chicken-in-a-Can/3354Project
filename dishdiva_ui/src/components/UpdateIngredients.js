import React, { useState, useEffect } from "react";

const UpdateIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    quantity: "",
    calories: "",
    sugars: "",
    carbs: "",
    protein: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const fetchIngredients = () => {
    fetch("http://localhost:8000/ingredients/")
      .then(res => res.json())
      .then(data => setIngredients(data));
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  const handleAdd = () => {
    fetch("http://localhost:8000/ingredients/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newIngredient.name,
        quantity: newIngredient.quantity,
        nutrition: {
          calories: parseFloat(newIngredient.calories),
          sugars: parseFloat(newIngredient.sugars),
          carbs: parseFloat(newIngredient.carbs),
          protein: parseFloat(newIngredient.protein),
        },
      }),
    })
      .then(res => res.json())
      .then(() => {
        setNewIngredient({ name: "", quantity: "", calories: "", sugars: "", carbs: "", protein: "" });
        fetchIngredients();
      });
  };

  const handleEdit = (id, ingredient) => {
    setEditingId(id);
    setEditingData({
      name: ingredient.name,
      quantity: ingredient.quantity,
    });
  };

  const handleUpdate = (id) => {
    fetch(`http://localhost:8000/ingredients/${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editingData.name,
        quantity: editingData.quantity,
      }),
    }).then(() => {
      setEditingId(null);
      fetchIngredients();
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/ingredients/${id}/`, {
      method: "DELETE",
    }).then(() => fetchIngredients());
  };

  return (
    <div>
      <div className="main update">
        <div className="left-section">
          <div className="section-title">Insert Ingredients</div>

          {["name", "quantity", "calories", "sugars", "carbs", "protein"].map((field) => (
            <div className="input-group" key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type="text"
                value={newIngredient[field]}
                onChange={e => setNewIngredient({ ...newIngredient, [field]: e.target.value })}
                placeholder={`e.g. ${field === "name" ? "Sugar" : "2"}`}
              />
            </div>
          ))}

          <button className="add-btn" onClick={handleAdd}>Add Ingredient</button>

          <div className="section-title">Edit Ingredients</div>
          <div className="edit-list">
            {ingredients.map((ingredient) => (
              <div className="ingredient-row" key={ingredient.id}>
                {editingId === ingredient.id ? (
                  <>
                    <input
                      value={editingData.name}
                      onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                    />
                    <input
                      value={editingData.quantity}
                      onChange={(e) => setEditingData({ ...editingData, quantity: e.target.value })}
                    />
                    <div className="action-buttons">
                      <button onClick={() => handleUpdate(ingredient.id)}>💾</button>
                      <button onClick={() => setEditingId(null)}>✕</button>
                    </div>
                  </>
                ) : (
                  <>
                    {ingredient.name} - {ingredient.quantity}
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => handleEdit(ingredient.id, ingredient)}>✎</button>
                      <button className="delete-btn" onClick={() => handleDelete(ingredient.id)}>×</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateIngredients;
