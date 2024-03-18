import { generateClient } from "aws-amplify/api";
import { createLessonPlanMetadata } from "../graphql/mutations.js";

const apiClient = generateClient();

export const addLessonPlan = async (lessonPlanMetadata) => {
    try {
        console.log(lessonPlanMetadata);
        const result = await apiClient.graphql({
            query: createLessonPlanMetadata,
            variables: {
                input: lessonPlanMetadata
            }
        })
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
