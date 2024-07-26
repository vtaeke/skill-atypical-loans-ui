export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
export const RESET_FORM = 'RESET_FORM'


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

export type FormActionTypes = UploadFormFieldAction | ResetFormAction;

export const updateFormField = (field: string, value: string): UploadFormFieldAction => ({
    type: UPDATE_FORM_FIELD,
    payload: { field, value }
})

export const resetForm = (): FormActionTypes => ({
    type: RESET_FORM
})