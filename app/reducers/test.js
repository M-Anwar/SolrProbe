// @flow

// Types
export const actionNames = {
    TEST_TYPE : 'TEST_TYPE'
}
export type TestAction = {type: 'TEST_TYPE', payload: string}


// Action Creators
export const actions = {
    testAction: (option: string): TestAction => ({type: actionNames.TEST_TYPE, payload:option})
};
