import React from "react";
//import "./styles.css";

const UpdateIngredients = () => {
  return (
    <div>
      <div className="main update">
        <div className="left-section">
          <div className="section-title">Insert Ingredients</div>
          <div className="input-group">
            <label>Ingredient name</label>
            <input type="text" placeholder="e.g. Sugar" />
          </div>
          <div className="input-group">
            <label>Ingredient quantity</label>
            <input type="text" placeholder="e.g. 2 cups" />
          </div>
          <button className="add-btn">Add Ingredient</button>

          <div className="section-title">Edit Ingredients</div>
          <div className="edit-list">
            {["Sugar - 2 cups", "Flour - 1.5 cups", "Salt - 1 tsp"].map(
              (item, index) => (
                <div className="ingredient-row" key={index}>
                  {item}
                  <div className="action-buttons">
                    <button className="edit-btn">✎</button>
                    <button className="delete-btn">×</button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateIngredients;
