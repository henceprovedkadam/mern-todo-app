import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { FaRegEdit } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

import axios from "axios";
function App() {
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editId, setEditId] = useState("");
  const [btnText, setBtnText] = useState("Add");
  const [sort, setSort] = useState("all");
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/users/verify`, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          if (!error.response.data.success) {
            navigate("/login");
          }
        }
      });
  }, [API_BASE, navigate]);

  useEffect(() => {
    axios
      .post(
        `${API_BASE}/api/events/getalltext`,
        { sort },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        setUsers(response.data.userData);
        setName(response.data.userName);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          if (!error.response.data.success) {
            navigate("/");
          }
        }
      });
  }, [refresh, sort, navigate, API_BASE]);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>)=> {
    e.preventDefault();
    console.log("Submitting: ", text);
    if (editId === null) {
      axios
        .post(
          `${API_BASE}/api/events/addtext`,
          { text },
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response);
          setText("");
          setRefresh((prev) => !prev);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      axios
        .put(
          `${API_BASE}/api/events/editbyid/${editId}`,
          { text },
          { withCredentials: true },
        )
        .then((response) => {
          console.log(response);
          setRefresh((prev) => !prev);
          setText("");
          setEditId("");
          setBtnText("Add");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const deleteById = (id: string) => {
    axios
      .delete(`${API_BASE}/api/events/deletebyid/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const editById = (id: string, newText: string) => {
    setEditId(id);
    setText(newText);
    setBtnText("Update");
  };

  const status = (id: string, isCompleted: boolean) => {
    console.log(id, isCompleted);
    axios
      .put(
        `${API_BASE}/api/events/status/${id}`,
        { isCompleted },
        { withCredentials: true },
      )
      .then((response) => {
        console.log(response);
        setRefresh((prev) => !prev);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const escBack = () => {
    setEditId("");
    setText("");
    setBtnText("Add");
  };

  const handleLogout = () => {
    axios
      .post(`${API_BASE}/api/users/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  type todo = {
    _id: string;
    text: string;
    isCompleted: boolean;
  }
  return (
    <>
      {/* NAME AND LOGOUT */}
      <div
        className="w-full font-mono flex flex-col items-center justify-center text-neutral-50 bg-orange-300 top-0 
      mb-10
      md:mb-15"
      >
        <strong className="flex justify-center items-center w-full bg-orange-400">{`Welcome, ${name}`}</strong>
        <button
          className="absolute flex top-7 right-2 items-center w-20 float-right pl-1 justify-center text-neutral-50 bg-orange-300 cursor-pointer hover:bg-orange-950 rounded-sm"
          onClick={handleLogout}
        >
          Logout
          <IoMdLogOut size={20} />
        </button>
      </div>
      {/* MAIN CONTAINER */}
      <div className="flex items-center justify-center min-h-screen font-mono flex-col gap-y-10">
        {/* HEADING */}
        <h1
          className="rubik-distressed-regular text-orange-500 
        text-3xl
        md:text-4xl"
        >
          Todo App
        </h1>
        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit}
          className="bg-orange-400 flex items-center justify-center px-2 py-2 gap-x-2 sticky top-0 rounded-sm 
          max-w-[63rem]"
        >
          <input
            className="bg-orange-200 rounded-sm hover:border-orange-400 
            px-2 h-8 w-3/4 text-sm
            md:w-70"
            placeholder="Your text goes here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            className="bg-orange-300 hover:bg-orange-800 px-1 rounded-sm w-1/4 h-8"
            type="submit"
          >
            {btnText}
          </button>
          {/* ADDING ESCAPE BUTTON BESIDE UPDATE */}
          {editId != null && (
            <button className="cursor-pointer" onClick={escBack}>
              <IoArrowBackCircle size={30} />
            </button>
          )}
        </form>

        {/* SORT SELECTION  */}
        <div className="max-w-50 flex flex-row justify-center items-center text-sm md:text-md">
          <button
            className={`${
              sort === "all" ? "hover: bg-orange-300" : "bg-orange-100"
            } px-2 py-1 border`}
            onClick={() => setSort("all")}
          >
            All
          </button>
          <button
            className={`${
              sort === "pending" ? "hover: bg-orange-300" : "bg-orange-100"
            } px-2 py-1 border`}
            onClick={() => setSort("pending")}
          >
            Pending
          </button>
          <button
            className={`${
              sort === "completed" ? "hover: bg-orange-300" : "bg-orange-100"
            } px-2 py-1 border`}
            onClick={() => setSort("completed")}
          >
            Completed
          </button>
        </div>

        {/* DISPLAY DATA */}
        <div>
          {users.length === 0 ? (
            <div>
              <h2 className="text-md">No Data Found.</h2>
            </div>
          ) : (
            // TABLE CONTAINER
            <div className="flex items-center justify-center max-w-70 text-xs md:text-sm mb-10">
              {/* TABLE HEAD */}
              <table className="border rounded-sm">
                <thead className="border">
                  <tr className="flex">
                    <th className="border w-10 md:w-20 flex justify-center items-center">
                      Index
                    </th>
                    <th className="border w-25 md:w-55 flex justify-center items-center">
                      Todos
                    </th>
                    <th className="border w-15 md:w-20 flex justify-center items-center">
                      Actions
                    </th>
                    <th className="border w-15 md:w-30 flex justify-center items-center">
                      Task Done?
                    </th>
                  </tr>
                </thead>
                {/* TABLE BODY */}
                <tbody className="border">
                  {users.map((user: todo, index) => {
                    return (
                      <tr
                        key={user._id || index}
                        className="flex hover:bg-orange-200"
                      >
                        <td className="border w-10 md:w-20 p-2 flex justify-center items-center">
                          {index + 1}
                        </td>
                        <td className="border w-25 md:w-55 p-2 flex justify-center items-center">
                          {user.text}
                        </td>
                        <td className="border w-15 md:w-20 p-2 flex justify-center items-center">
                          {
                            <div className="flex items-center justify-center gap-1">
                              <button
                                className="cursor-pointer p-1 hover:border hover:bg-orange-300"
                                onClick={() => deleteById(user._id)}
                              >
                                <MdDeleteOutline size={23} />
                              </button>
                              {/* <strong>|</strong> */}
                              <button
                                className="cursor-pointer p-1 pr-1 hover:border hover:bg-orange-300 "
                                onClick={() => editById(user._id, user.text)}
                              >
                                <FaRegEdit size={20} />
                              </button>
                            </div>
                          }
                        </td>
                        <td className="border w-15 md:w-30 p-2 flex justify-center items-center flex-row">
                          {user.isCompleted ? (
                            <button
                              className="flex flex-row gap-x-2 cursor-pointer hover:border-2 hover:border-green-400 rounded-sm p-2"
                              onClick={() => status(user._id, false)}
                            >
                              <span className="hidden md:block">Completed</span>
                              <IoCheckmarkDoneCircleOutline
                                size={23}
                                className="bg-green-400 rounded-full"
                              />
                            </button>
                          ) : (
                            <button
                              className="flex flex-row gap-x-2 cursor-pointer hover:border-2 hover:border-red-400 rounded-sm p-2 "
                              onClick={() => status(user._id, true)}
                            >
                              <span className="hidden md:block">Pending</span>
                              <FcCancel size={23} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
