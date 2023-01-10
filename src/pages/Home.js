import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, deleteDoc } from "firestorage";

function Home() {
  const [insectsList, setInsectsList] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const list = getDocs(doc("insectsList")).data();
    setInsectsList(list);
  }, []);

  const deleteInsect = (insect) => {
    deleteDoc(doc("insectsList", insect.id));

    const newArray = insectsList.filter((bug) => bug.id !== insect.id);
    setInsectsList(newArray);
  };

  const filterList = insectsList.filter((insect) => {
    if (search === "") {
      return true;
    }
    return insect.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <main>
        <input
          type="search"
          placeholder="Find by name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Uglyness</th>
              <th>Annoyance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterList.map((insect) => {
              return (
                <tr key={insect.id}>
                  <td>{insect.name}</td>
                  <td>{insect.uglyness}</td>
                  <td>{insect.annoyance}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        navigate(`/insect/edit/${insect.id}`);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => {
                        deleteInsect(insect);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
      <nav>
        <Link to="/new">
          <button>New</button>
        </Link>
      </nav>
    </>
  );
}

export default Home;
