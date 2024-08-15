/* eslint-disable react/prop-types */

import React from "react";

export const GlobalFiltering = ({ filter, setFilter }) => {
    return (
        <div style={styles.container}>
            <label htmlFor="search-input" style={styles.label}>
                Search:
            </label>
            <input
                id="search-input"
                type="text"
                value={filter || ""}
                onChange={(e) => setFilter(e.target.value)}
                style={styles.input}
                placeholder="Type to search..."
            />
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        fontFamily: "'Roboto', sans-serif",
    },
    label: {
        marginRight: "10px",
        fontWeight: "bold",
    },
    input: {
        padding: "8px 12px",
        border: "1px solid #ced4da",
        borderRadius: "4px",
        fontSize: "14px",
        transition: "border-color 0.3s",
    },
    inputFocus: {
        borderColor: "#80bdff",
        outline: "none",
        boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
    },
    placeholder: {
        color: "#6c757d",
    },
};

// Adding focus effect using JavaScript
const inputStyle = document.createElement("style");
inputStyle.textContent = `
  #search-input:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  #search-input::placeholder {
    color: #6c757d;
  }
`;
document.head.appendChild(inputStyle);
