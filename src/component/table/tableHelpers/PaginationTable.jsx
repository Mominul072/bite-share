/* eslint-disable react/prop-types */


const styles = {
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
    },
    paginationButton: {
        backgroundColor: "#4CAF50",
        border: "none",
        color: "white",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        margin: "4px 2px",
        cursor: "pointer",
        borderRadius: "5px",
    },
    paginationButtonHover: {
        backgroundColor: "#45a049",
    },
};

const PaginationTable = ({ previousPage, nextPage }) => {
    return (
        <div style={styles.paginationContainer}>
            <button style={styles.paginationButton} onClick={() => previousPage()}>
                Prev
            </button>
            <button style={styles.paginationButton} onClick={() => nextPage()}>
                Next
            </button>
        </div>
    );
};

export default PaginationTable;
