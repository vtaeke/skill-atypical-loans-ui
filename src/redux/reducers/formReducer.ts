import {ADD_FILES, ADD_REALTY_OBJECT, FormActionTypes, RESET_FORM, UPDATE_FORM_FIELD} from '../action/formActions';

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
    files: File[],
    addRealtyObjects: {objectType: string, objectCost: string}[],
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
    files: [],
    addRealtyObjects: [],
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
            };
        case ADD_REALTY_OBJECT:
            return {
                ...state,
                addRealtyObjects: [...state.addRealtyObjects, action.payload]
            };
        default:
            return state;
    }
};

export default formReducer;
