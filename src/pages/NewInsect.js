import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addDoc, doc, getDocs } from "firestorage";

function NewInsect() {
  const [name, setName] = useState("");
  const [uglyness, setUglyness] = useState("");
  const [annoyance, setAnnoyance] = useState("");
  const [tag, setTag] = useState("");
  const [tagsList, setTagsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const tagList = getDocs(doc("tagsList")).data();
    setTagsList(tagList);
  }, []);

  const createInsect = () => {
    addDoc(doc("insectsList"), {
      name: name,
      uglyness: uglyness,
      annoyance: annoyance,
      tag: tag,
    });
    navigate("/");
  };

  return (
    <>
      <main>
        <h2>Add an insect to the database</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createInsect();
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
          <label>
            {" "}
            Uglyness
            <select
              required
              value={uglyness}
              onChange={(e) => {
                setUglyness(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="Low">Cute</option>
              <option value="Average">Average</option>
              <option value="Disgusting">Disgusting</option>
              <option value="UglyAF">Ugly AF</option>
            </select>
          </label>
          <label>
            {" "}
            Annoyance
            <select
              required
              value={annoyance}
              onChange={(e) => {
                setAnnoyance(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="None">None</option>
              <option value="Inconvenient">Inconvenient</option>
              <option value="Big">Big</option>
              <option value="Pain in the Ass">Pain in the Ass</option>
              <option value="Kill it or kill me">Kill it or kill me!</option>
            </select>
          </label>
          <label>
            Tag
            <select
              required
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
            >
              <option value="">Select</option>
              {tagsList.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                );
              })}
            </select>
          </label>
          <button>Submit</button>
        </form>
      </main>
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>
    </>
  );
}

export default NewInsect;
