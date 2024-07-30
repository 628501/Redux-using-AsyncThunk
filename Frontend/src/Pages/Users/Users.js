import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, userDelete } from "../../Slices/UserSlice";
import classes from "./Users.module.css";

const Users = () => {
  const dispatch = useDispatch();
  const { users, error } = useSelector((state) => state.usersInfo);

  useEffect(() => {
    dispatch(getUsers());
  },[dispatch]);

  const Delete = async (id) => {
    try {
      await dispatch(userDelete(parseInt(id)))
      .unwrap();
      dispatch(getUsers());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Crud App with JSON Server</h2>
      <Link to="/" className={classes.shining}>
        Create +
      </Link>
      {error !== "" ? (
        <h5 className="text-center text-danger">{error}</h5>
      ) : null}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>EMAIL</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>{user.contact}</td>
              <td>
                <Link
                  to={`/edit/${user.id}`}
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
                <button
                  onClick={() => Delete(user.id)}
                  className="btn btn-sm btn-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
