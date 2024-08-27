export const UPDATE_FORM_FIELD = 'UPDATE_FORM_FIELD'
export const RESET_FORM = 'RESET_FORM'
export const ADD_FILES = 'ADD_FILES'
export const ADD_REALTY_OBJECT = 'ADD_REALTY_OBJECT'


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

interface AddRealtyAction {
    type: typeof ADD_REALTY_OBJECT;
    payload: {
        objectType: string;
        objectCost: string;
    };
}

export type FormActionTypes = UploadFormFieldAction | ResetFormAction | AddFilesAction | AddRealtyAction;

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

export const addRealtyObject = (objectType: string, objectCost: string):AddRealtyAction => {
    return {
        type: ADD_REALTY_OBJECT,
        payload: {objectType, objectCost}
    }
}