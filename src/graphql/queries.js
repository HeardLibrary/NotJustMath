/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchLessonPlanMetadata = /* GraphQL */ `
  query SearchLessonPlanMetadata(
    $filter: SearchableLessonPlanMetadataFilterInput
    $sort: [SearchableLessonPlanMetadataSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableLessonPlanMetadataAggregationInput]
  ) {
    searchLessonPlanMetadata(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        text_title
        text_author
        text_publication_year
        grade_level_lower
        grade_level_upper
        math_concept_tags
        social_concept_tags
        standard_tags
        approval_state
        lesson_title
        createdAt
        updatedAt
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`;
export const getLessonPlanMetadata = /* GraphQL */ `
  query GetLessonPlanMetadata($id: ID!) {
    getLessonPlanMetadata(id: $id) {
      id
      text_title
      text_author
      text_publication_year
      grade_level_lower
      grade_level_upper
      math_concept_tags
      social_concept_tags
      standard_tags
      approval_state
      lesson_title
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLessonPlanMetadata = /* GraphQL */ `
  query ListLessonPlanMetadata(
    $filter: ModelLessonPlanMetadataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLessonPlanMetadata(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text_title
        text_author
        text_publication_year
        grade_level_lower
        grade_level_upper
        math_concept_tags
        social_concept_tags
        standard_tags
        approval_state
        lesson_title
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
