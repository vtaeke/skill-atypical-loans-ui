import { UPDATE_FORM_FIELD, RESET_FORM, FormActionTypes } from '../action/formActions';

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
    comment: ''
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
        default:
            return state;
    }
};

export default formReducer;
