import { Authenticator } from "@aws-amplify/ui-react";
import Header from "../../components/Header/Header";
import "./AdminPage.css";

const AdminPage = () => {
    return (
        <div className="page-container">
            <Header/>
            <Authenticator>
                {({ signOut, _user }) => (
                    <div className="admin-content-container">
                        <h3>Admin Page</h3>
                        <button onClick={signOut}>Logout</button>
                    </div>
                )}
            </Authenticator>
        </div>
        
    )
}

export default AdminPage;