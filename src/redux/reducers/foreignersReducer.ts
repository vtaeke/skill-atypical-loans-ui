import {UPDATE_FORM_FIELD, RESET_FORM, FormActionTypes, ADD_FILES} from '../action/formActions';

interface FormSettlement {
    product: string;
    contractNumber: string;
    clientFamily: string;
    clientName: string;
    clientSurname: string;
    bank: string;
    email: string;
    comment: string;
    files: File[];
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
    files: []
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
        case ADD_FILES:
            return {
                ...state,
                files: [...state.files, ...action.payload]
            }
        default:
            return state;
    }
};

export default formForeigners;
