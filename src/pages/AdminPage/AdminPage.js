import { Routes, Route } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { useState, useEffect } from "react";
import { listLessonPlans } from "../../util/dynamo";
import { LessonPlanApprovalStates } from "../../util/constants";
import AdminViewLessonPlan from "../../components/AdminViewLessonPlan/AdminViewLessonPlan";
import ReviewSubheader from "../../components/ReviewSubheader/ReviewSubheader";
import RenderPendingLessonPlans from "../../components/RenderPendingLessonPlans/RenderPendingLessonPlans";
import "./AdminPage.css";
import RenderApprovedLessonPlans from "../../components/RenderApprovedLessonPlans/RenderApprovedLessonPlans";
import RenderRejectedLessonPlans from "../../components/RenderRejectedLessonPlans/RenderRejectedLessonPlans";

const AdminPage = () => {
    const [pendingLessonPlans, setPendingLessonPlans] = useState([]);
    const [approvedLessonPlans, setApprovedLessonPlans] = useState([]);
    const [rejectedLessonPlans, setRejectedLessonPlans] = useState([]);

    useEffect(() => {
        const getAndSetLessonPlans = async () => {
            const lessonPlans = await listLessonPlans();
            setPendingLessonPlans(lessonPlans.filter(lp => lp.approval_state === LessonPlanApprovalStates.PENDING));
            setApprovedLessonPlans(lessonPlans.filter(lp => lp.approval_state === LessonPlanApprovalStates.APPROVED));
            setRejectedLessonPlans(lessonPlans.filter(lp => lp.approval_state === LessonPlanApprovalStates.REJECTED));
        };
        getAndSetLessonPlans();
    }, []);

    const renderGrades = (lower, upper) => {
        if (lower === upper) {
            return `Grade ${lower}`
        } else {
            return `Grades ${lower} - ${upper}`
        }
    }

    return (
        <div className="page-container">
            <Authenticator>
                <>
                    <ReviewSubheader />
                    <div className="admin-content-container">
                        <Routes>
                            <Route
                                path=""
                                element={
                                    <RenderPendingLessonPlans
                                        lessonPlans={pendingLessonPlans}
                                        renderGrades={renderGrades}
                                    />
                                }
                            />
                            <Route
                                path="approved"
                                element={
                                    <RenderApprovedLessonPlans
                                        lessonPlans={approvedLessonPlans}
                                        renderGrades={renderGrades}
                                    />
                                }
                            />
                            <Route
                                path="rejected"
                                element={
                                    <RenderRejectedLessonPlans
                                        lessonPlans={rejectedLessonPlans}
                                        renderGrades={renderGrades}
                                    />
                                }
                            />
                            <Route
                                path="view/:lessonPlanID"
                                element={<AdminViewLessonPlan lessonPlans={pendingLessonPlans} />}
                            />
                            <Route
                                path="/approved/view/:lessonPlanID"
                                element={<AdminViewLessonPlan lessonPlans={approvedLessonPlans} />}
                            />
                            <Route
                                path="/rejected/view/:lessonPlanID"
                                element={<AdminViewLessonPlan lessonPlans={rejectedLessonPlans} />}
                            />
                        </Routes>
                    </div>
                </>
            </Authenticator>
        </div>
    );
}

export default AdminPage;