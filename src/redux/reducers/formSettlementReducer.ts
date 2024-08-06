import { UPDATE_FORM_FIELD, RESET_FORM, FormActionTypes } from '../action/formActions';

interface FormSettlement {
    restructuring: string;
    contractNumber: string;
    clientFamily: string;
    clientName: string;
    clientSurname: string;
    bank: string;
    email: string;
    comment: string;
}

const initialState: FormSettlement = {
    restructuring: '',
    contractNumber: '',
    clientFamily: '',
    clientName: '',
    clientSurname: '',
    bank: '',
    email: '',
    comment: '',
};

const formSettlement = (state = initialState, action: FormActionTypes): FormSettlement => {
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

export default formSettlement;
