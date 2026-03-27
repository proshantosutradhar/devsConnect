import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";

function ChangePassword() {
  const [password, setPassword] = useState();
  const [newPass, setNewPass] = useState();
  const [message, setMessage] = useState();
  const [toast, setToast] = useState(false);

  const handleSubmit = async () => {
    try {
      await axios.patch(
        BASE_URL + "/profile/password",
        { password, newPass },
        { withCredentials: true },
      );

      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 1000);
    } catch (err) {
      setMessage(err.response.data);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-50">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title text-2xl">Change Password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter old password"
              className="input border mt-3 border-white input-ghost"
            />
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
              className="input border border-white mb-3 mt-3 input-ghost"
            />
            <p className="text-red-600 font-semibold">{message}</p>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update Password
              </button>
            </div>
          </div>
        </div>
        {toast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Password updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
