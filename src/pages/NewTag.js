import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addDoc, doc } from "firestorage";

function NewTag() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const createTag = () => {
    addDoc(doc("tagsList"), {
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
          createTag();
        }}
      >
        <label>
          {" "}
          Name
          <input
            required
            placeholder="Add tag"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <button>Create</button>
      </form>
    </>
  );
}

export default NewTag;
