import {ADD_FILES, FormActionTypes, RESET_FORM, UPDATE_FORM_FIELD} from '../action/formActions';

interface FormState {
    businessProcess: string,
    externalId: string,
    objectType: string,
    objectCost: string,
    tbObjectName: string,
    objectRegionCode: string,
    lastName: string,
    firstName: string,
    middleName: string,
    initiatorEmail: string,
    vip: string,
    comment: string,
    files: File[]
}

const initialState: FormState = {
    businessProcess: '',
    externalId: '',
    objectType: '',
    objectCost: '',
    tbObjectName: '',
    objectRegionCode: '',
    lastName: '',
    firstName: '',
    middleName: '',
    initiatorEmail: '',
    vip: '',
    comment: '',
    files: []
};

const formReducer = (state = initialState, action: FormActionTypes): FormState => {
    switch (action.type) {
        case UPDATE_FORM_FIELD:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };
        case RESET_FORM:
            return initialState;
        case ADD_FILES:
            return {
                ...state,
                files: [...state.files, ...action.payload]
            }
        default:
            return state;
    }
};

export default formReducer;
