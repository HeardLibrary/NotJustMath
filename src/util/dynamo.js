import { generateClient } from "aws-amplify/api";
import { createLessonPlanMetadata } from "../graphql/mutations.js";
import { listLessonPlanMetadata } from "../graphql/queries.js";

const apiClient = generateClient();

export const addLessonPlan = async (lessonPlanMetadata) => {
    try {
        await apiClient.graphql({
            query: createLessonPlanMetadata,
            variables: {
                input: lessonPlanMetadata
            }
        })
    } catch (error) {
        console.log(error);
    }
}

export const listLessonPlans = async () => {
    try {
        const result = await apiClient.graphql({
            query: listLessonPlanMetadata,
        });
        return result.data.listLessonPlanMetadata.items;
    } catch (error) {
        console.log(error)
    }
}

export const listLessonPlansWithCriteria = async (lessonPlanCriteria) => {
    try {
        const result = await apiClient.graphql({
            query: listLessonPlanMetadata,
            variables: {
                filter: lessonPlanCriteria
            }
        });
        console.log(result);
    } catch (error) {
        console.log(error)
    }
}
