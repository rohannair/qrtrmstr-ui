export const setSelection = id => {
  return {
    type: 'SURVEY_SELECTION',
    id
  };
};

export const submitSurvey = (choices) => {
  // validateChoices(choices);
  // PUT survey(choices);
  // Transition to Thank You screen;
};
