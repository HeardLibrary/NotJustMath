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

        if (result.data) {
            return result.data.getLessonPlanMetadata;
        } else {
            console.error(result.erros)
            return {};
        }
       
    } catch (error) {
        console.error(error);
        return {};
    }
}

export const listLessonPlans = async () => {
    try {
        let result = await apiClient.graphql({
            query: listLessonPlanMetadata,
        });

        if (result.data) {
            result = result.data.listLessonPlanMetadata.items;
        } else {
            console.error(result.errors);
            result = [];
        }

        return result.filter((item) => item != null);
    } catch (error) {
        console.error(error)
        return [];
    }
}

const searchLessonPlansWithContains = async (query) => {
    try {
        let containsResult = await apiClient.graphql({
            query: listLessonPlanMetadata,
            variables: {
                filter: {
                    or: [
                        {
                            lesson_title: {
                                contains: query
                            },
                        },
                        { 
                            text_title: {
                                contains: query
                            } 
                        },
                        { 
                            text_author: {
                                contains: query
                            } 
                        },
                        { 
                            social_concept_tags: {
                                contains: query
                            } 
                        },
                        { 
                            math_concept_tags: {
                                contains: query
                            } 
                        },
                        {
                            standard_tags: {
                                contains: query
                            }
                        },
                    ]
                }
            }
        });


        if (containsResult.data) {
            containsResult = containsResult.data.listLessonPlanMetadata.items;
        } else {
            console.error(containsResult.errors);
            containsResult = [];
        }

        return containsResult;
    } catch (error) {
        console.error(error)
        return []
    }
}

const searchLessonPlansWithElasticSearch = async (query) => {
    try {
        // Allows more partial matches with Regex
        const queryString = `.*${query}.*`

        let elasticSearchResults = await apiClient.graphql({
            query: searchLessonPlanMetadata,
            variables: {
                filter: {
                    or: [
                        {
                            lesson_title: {
                                match: {
                                    lesson_title: queryString
                                }
                            },
                        },
                        { 
                            text_title: {
                                match: {
                                    text_title: queryString
                                }
                            } 
                        },
                        { 
                            text_author: {
                                match: {
                                    text_author: queryString
                                }
                            } 
                        },
                        { 
                            social_concept_tags: {
                                match: {
                                    social_concept_tags: queryString
                                }
                            } 
                        },
                        { 
                            math_concept_tags: {
                                match: {
                                    math_concept_tags: queryString
                                }
                            } 
                        },
                    ]
                }
            }
        });

        if (elasticSearchResults.data) {
            elasticSearchResults = elasticSearchResults.data.searchLessonPlanMetadata.items;
        } else {
            console.error(elasticSearchResults.errors);
            elasticSearchResults = [];
        }

        return elasticSearchResults;
    } catch (error) {
        console.error(error)
        return [];
    }
}

export const searchLessonPlans = async (query) => {
    try {
        // Get results from two sources
        const containsSearchResults = await searchLessonPlansWithContains(query);
        const elasticSearchResults = await searchLessonPlansWithElasticSearch(query);

        // Remove duplicate results
        let totalResults = elasticSearchResults;
        const elasticSearchResultIDs = new Set(elasticSearchResults.map(result => result.id))
        containsSearchResults.forEach(result => {
            if (!elasticSearchResultIDs.has(result.id)) {
                totalResults.push(result);
            }
        })

        return totalResults;
    } catch (error) {
        console.log(error);
        return [];
    }
}
