/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLessonPlanMetadata = /* GraphQL */ `
  mutation CreateLessonPlanMetadata(
    $input: CreateLessonPlanMetadataInput!
    $condition: ModelLessonPlanMetadataConditionInput
  ) {
    createLessonPlanMetadata(input: $input, condition: $condition) {
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
export const updateLessonPlanMetadata = /* GraphQL */ `
  mutation UpdateLessonPlanMetadata(
    $input: UpdateLessonPlanMetadataInput!
    $condition: ModelLessonPlanMetadataConditionInput
  ) {
    updateLessonPlanMetadata(input: $input, condition: $condition) {
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
export const deleteLessonPlanMetadata = /* GraphQL */ `
  mutation DeleteLessonPlanMetadata(
    $input: DeleteLessonPlanMetadataInput!
    $condition: ModelLessonPlanMetadataConditionInput
  ) {
    deleteLessonPlanMetadata(input: $input, condition: $condition) {
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
