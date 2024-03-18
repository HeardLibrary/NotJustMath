import { Authenticator } from "@aws-amplify/ui-react";
import Header from "../../components/Header/Header";
import "./AdminPage.css";

const AdminPage = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <div className="page-container">
                    <Header/>
                    <h3>Admin Page</h3>
                    <p>Welcome, {user.signInDetails.loginId}</p>
                    <button onClick={signOut}>Logout</button>
                </div>
            )}
        </Authenticator>
    )
}

export default AdminPage;