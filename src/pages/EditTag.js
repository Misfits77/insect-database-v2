import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firestorage";

function EditTag() {
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getTag = getDoc(doc("tagsList", params.id)).data();
    setName(getTag.name);
  }, []);

  const editTag = (name) => {
    updateDoc(doc("tagsList", params.id), {
      name: name,
    });
    navigate("/tags");
  };

  return (
    <>
      {" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editTag(name);
        }}
      >
        <label>
          {" "}
          Name
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <button>Save</button>
      </form>
    </>
  );
}

export default EditTag;
