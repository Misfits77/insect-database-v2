import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, doc, deleteDoc } from "firestorage";

function Tags() {
  const [tagsList, setTagsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const list = getDocs(doc("tagsList")).data();
    setTagsList(list);
  }, []);

  const deleteTag = (tag) => {
    deleteDoc(doc("tagsList", tag.id));

    const newArray = tagsList.filter((t) => t.id !== tag.id);
    setTagsList(newArray);
  };

  return (
    <>
      <h2>TAGS</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {tagsList.map((tag) => {
            return (
              <tr key={tag.id}>
                <td>{tag.name}</td>
                <td>
                  <button
                    onClick={(e) => {
                      navigate(`/tag/edit/${tag.id}`);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => {
                      deleteTag(tag);
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
      <Link to="/tag/new">
        <button>New</button>
      </Link>
    </>
  );
}

export default Tags;
