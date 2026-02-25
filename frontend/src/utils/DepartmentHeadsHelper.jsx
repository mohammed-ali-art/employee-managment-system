/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */


export const columns = [ 
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "70px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "100px"
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "120px"
    },
    {
        name: "Dob",
        selector: (row) => row.dob,
        sortable: true,
        width: "130px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center :true,
    },
];


export const DepartmentHeadButtons = ({ Id }) => {
    const handleDemote = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:5000/api/department-heads/demote/${Id}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                
                window.location.reload(); 
            } else {
                alert(data.error || "Error demoting");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={handleDemote}
        >
            Remove Head
        </button>
    );
};
