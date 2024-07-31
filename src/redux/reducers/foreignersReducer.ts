import { UPDATE_FORM_FIELD, RESET_FORM, FormActionTypes } from '../action/formActions';

interface FormSettlement {
    product: string;
    contractNumber: string;
    clientFamily: string;
    clientName: string;
    clientSurname: string;
    bank: string;
    email: string;
    comment: string;
}

const initialState: FormSettlement = {
    product: '',
    contractNumber: '',
    clientFamily: '',
    clientName: '',
    clientSurname: '',
    bank: '',
    email: '',
    comment: '',
};

const formForeigners = (state = initialState, action: FormActionTypes): FormSettlement => {
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

export default formForeigners;
