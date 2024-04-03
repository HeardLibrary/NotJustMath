import { generateClient } from "aws-amplify/api";
import { createLessonPlanMetadata } from "../graphql/mutations.js";
import { getLessonPlanMetadata, listLessonPlanMetadata, searchLessonPlanMetadata } from "../graphql/queries.js";


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

export const searchLessonPlans = async (query) => {
    try {
        const result = await apiClient.graphql({
            query: searchLessonPlanMetadata,
            variables: {
                filter: {
                    or: [
                        {
                            lesson_title: {
                                match: {
                                    lesson_title: query
                                }
                            },
                        },
                        { 
                            text_title: {
                                match: {
                                    text_title: query
                                }
                            } 
                        },
                        { 
                            text_author: {
                                match: {
                                    text_author: query
                                }
                            } 
                        },
                        { 
                            social_concept_tags: {
                                match: {
                                    social_concept_tags: query
                                }
                            } 
                        },
                        { 
                            math_concept_tags: {
                                match: {
                                    math_concept_tags: query
                                }
                            } 
                        },
                        { 
                            standard_tags: {
                                match: {
                                    standard_tags: query
                                }
                            } 
                        },
                    ]
                }
            }
        });
        return result;
    } catch (error) {
        console.log(error)
    }
}
