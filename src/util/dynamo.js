import { generateClient } from "aws-amplify/api";
import { createLessonPlanMetadata } from "../graphql/mutations.js";
import { getLessonPlanMetadata, listLessonPlanMetadata } from "../graphql/queries.js";


const apiClient = generateClient({
    authMode: 'apiKey',
});

export const addLessonPlan = async (lessonPlanMetadata) => {
    await apiClient.graphql({
        query: createLessonPlanMetadata,
        variables: {
            input: lessonPlanMetadata
        }
    })
}

export const getLessonPlanByID = async (lessonPlanID) => {
    try {
        const result = await apiClient.graphql({
            query: getLessonPlanMetadata,
            variables: {
                id: lessonPlanID
            }
        });
        return result.data.getLessonPlanMetadata;
    } catch (error) {
        console.error(error);
    }
}

export const listLessonPlans = async () => {
    try {
        const result = await apiClient.graphql({
            query: listLessonPlanMetadata,
        });
        return result.data.listLessonPlanMetadata.items.filter((item) => item != null);
    } catch (error) {
        console.error(error)
    }
}

export const listLessonPlansWithFilter = async (lessonPlanFilter) => {
    try {
        const result = await apiClient.graphql({
            query: listLessonPlanMetadata,
            variables: {
                filter: lessonPlanFilter
            }
        });
        return result;
    } catch (error) {
        console.error(error)
    }
}
