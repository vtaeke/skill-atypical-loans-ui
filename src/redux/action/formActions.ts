export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
export const RESET_FORM = 'RESET_FORM'
export const ADD_FILES = 'ADD_FILES'


interface UploadFormFieldAction {
    type: typeof UPDATE_FORM_FIELD;
    payload: {
        field: string;
        value: string;
    }
}

interface ResetFormAction {
    type: typeof RESET_FORM;
}

interface AddFilesAction {
    type: typeof ADD_FILES;
    payload: File[];
}

export type FormActionTypes = UploadFormFieldAction | ResetFormAction | AddFilesAction;

export const updateFormField = (field: string, value: string): UploadFormFieldAction => ({
    type: UPDATE_FORM_FIELD,
    payload: { field, value }
})

export const resetForm = (): FormActionTypes => ({
    type: RESET_FORM
})

export const addFiles = (files: File[]): AddFilesAction => ({
    type: ADD_FILES,
    payload: files
})