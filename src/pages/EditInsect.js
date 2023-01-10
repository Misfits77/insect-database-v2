import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firestorage";

function EditInsect() {
  const [name, setName] = useState("");
  const [uglyness, setUglyness] = useState("");
  const [annoyance, setAnnoyance] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const insect = getDoc(doc("insectsList", params.id)).data();
    setName(insect.name);
    setAnnoyance(insect.annoyance);
    setUglyness(insect.uglyness);
  }, []);

  const editInsect = (name, annoyance, uglyness) => {
    updateDoc(doc("insectsList", params.id), {
      name: name,
      annoyance: annoyance,
      uglyness: uglyness,
    });
    navigate("/");
  };

  return (
    <>
      <main>
        <h2>Need to correct something?</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editInsect(name, annoyance, uglyness);
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

export default EditInsect;
