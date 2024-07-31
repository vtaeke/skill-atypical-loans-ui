import {ADD_FILES, FormActionTypes, RESET_FORM, UPDATE_FORM_FIELD} from '../action/formActions';

interface FormState {
    requestType: string;
    contractNumber: string;
    propertyList: string;
    propertyCost: string;
    bank: string;
    region: string;
    clientFamily: string;
    clientName: string;
    clientSurname: string;
    email: string;
    isVip: string;
    comment: string;
    files: File[];
}

const initialState: FormState = {
    requestType: '',
    contractNumber: '',
    propertyList: '',
    propertyCost: '',
    bank: '',
    region: '',
    clientFamily: '',
    clientName: '',
    clientSurname: '',
    email: '',
    isVip: '',
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
