import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateFormField, resetForm } from '../../redux/action/formActions';
import HintsBlock from "../../components/HintBlock/HintBlock";
import '../VerifyPages/VerifyRequest.scss';
import './ConclussionTransactions.scss';
import categoryChoice from "../../resources/categoryChoice.svg";
import numberIcon from "../../resources/numberIcon.svg";
import peopleIcon from "../../resources/peopleIcon.svg";
import homeLine from "../../resources/home-line.svg";
import errorIcon from "../../resources/errorIcon.svg";
import emailIcon from "../../resources/emailIcon.svg";
import { useNavigate } from "react-router-dom";
import circleSalut from "../../resources/circleSalut.svg";
import closeImg from "../../resources/closeImg.svg";
import {AppDispatch} from "../../redux/store";
import Notification from "../Notification/Notification";
import '../SettlementOfProblemDebt/SettlementOfProblemDebt.scss'
import NorificationAlert from "../Notification/NorificationAlert";

const ConclusionTransactions: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formState, setFormState] = useState({
        businessProcess: '',
        externalId: '',
        lastName: '',
        firstName: '',
        middleName: '',
        tbObjectName: '',
        initiatorEmail: '',
        comment: '',
    });

    const [fileList, setFileList] = useState<File[]>([]);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMsg, setNotificationMsg] = useState('')
    const [emailError, setEmailError] = useState<React.ReactNode>(null)
    const [successSubmit, setSuccessSubmit] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showErrors, setShowErrors] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const validateEmail = () => {
            if (formState.initiatorEmail === '') {
                setEmailError(null)
                return;
            }

            const emailReg = /^[a-zA-Z0-9._%+-]+@(sberbank.ru|sber.ru|omega.sbrf.ru)$/;
            if (!emailReg.test(formState.initiatorEmail)) {
                setEmailError(
                    <>
                        <span style={{color: 'rgb(239, 107, 37)'}}>
                            Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                        </span>
                        <span style={{ color: '#fff'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                    </>)
            } else {
                setEmailError(null)
            }
        }
        validateEmail()
    }, [formState.initiatorEmail])

    // условие - проверка на все поля
    // useEffect(() => {
    //     const validValue = Object.values(formState).every(val => val !== '') && fileList.length > 0;
    //     setSuccessSubmit(validValue)
    // }, [formState, fileList])

    // условие - Отчество, комментарий - не обязательное
    // useEffect(() => {
    //     const requiredFields: (keyof typeof formState)[] = [
    //         'businessProcess', 'externalId', 'tbObjectName', 'lastName', 'firstName', 'initiatorEmail'
    //     ];
    //     const validValue = requiredFields.every(field => formState[field] !== '') && fileList.length > 0;
    //     setSuccessSubmit(validValue);
    // }, [formState, fileList]);

    useEffect(() => {
        let requiredFields: (keyof typeof formState)[] = [];
        if (formState.businessProcess === 'Индивидуальные схемы кредитования') {
            requiredFields = [ 'businessProcess', 'externalId', 'tbObjectName', 'initiatorEmail']
        } else if (formState.businessProcess === 'Кредит на индивидуальных условиях') {
            requiredFields = [ 'businessProcess', 'externalId', 'lastName', 'firstName', 'initiatorEmail']
        }
        const validValue = requiredFields.every(field => formState[field] !== '') && fileList.length > 0;
        setSuccessSubmit(validValue);
    }, [formState, fileList]);

    // const assistantStateRef = useRef<AssistantAppState>();
    // const assistantRef = useRef<ReturnType<typeof createAssistant>>();
    //
    // useEffect(() => {
    //     assistantRef.current = initialize(() => assistantStateRef.current);
    //     assistantRef.current.on('data', ({ navigation, action }: any) => {
    //         if (navigation) {
    //             switch (navigation.command) {
    //                 case 'UP':
    //                     window.scrollTo(0, window.scrollY - 500);
    //                     break;
    //                 case 'DOWN':
    //                     window.scrollTo(0, window.scrollY + 500);
    //                     break;
    //             }
    //         }
    //     });
    // }, []);

    const handleFileRemove = (index: number) => {
        const newFileList = [...fileList];
        newFileList.splice(index, 1);
        setFileList(newFileList);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            setFileList([...fileList, ...filesArray]);
        }
    };

    //вывод в консоль файлов, которые были добавлены
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setShowErrors(true);

        if (successSubmit) {
            Object.entries(formState).forEach(([field, value]) => {
                dispatch(updateFormField(field, value))
            })

            const formData = new FormData()
            Object.entries(formState).forEach(([field, value]) => {
                formData.append(field, value)
            });
            fileList.forEach(file => {
                formData.append('files', file)
            });

            setNotificationMsg('Заявка успешно создана!')
            setShowNotification(true)

            console.log('Данные формы отправлены в Redux:', formState);
            console.log('Прикрепленные файлы:', fileList);
        }
    };

    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     // for (const field in formState) {
    //     //     dispatch(updateFormField(field, formState[field as keyof typeof formState]));
    //     // }
    //     // Object.keys(formState).forEach((field) => {
    //     //     dispatch(updateFormField(field, formState[field as keyof typeof formState]));
    //     // })
    //     Object.entries(formState).forEach(([field, value]) => {
    //         dispatch(updateFormField(field, value))
    //     })
    //     setNotificationMsg('Заявка успешно создана!')
    //     setShowNotification(true)
    //
    //     // setTimeout(() => {
    //     //     setShowNotification(false)
    //     // }, 4000)
    //
    //     console.log('Данные формы отправлены в Redux:', formState);
    // };

    const handleInputChange = (field: string, value: string) => {
        setFormState(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const closeNotification = () => {
        setShowNotification(false)
    }

    const handleCardClick = (path: string) => {
        if (Object.values(formState).some(val => val !== '') || fileList.length > 0) {
            setAlertMessage('');
            setShowAlert(true);
        } else {
            navigate(path);
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    return (
        <div className="app" style={{ height: '100vh'}}>
            <div className="container">
                <div className="up-header">
                    <button className='btn-close' onClick={() => handleCardClick('/')}><img src={closeImg} alt=""/></button>
                </div>
                <div className="header">
                    <div style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <span style={{ color: 'rgb(165, 165, 165)' }}>Нетиповые заявки /</span>
                        <span style={{ color: '#fff' }}>Создание заявки</span>
                    </div>
                    <button className='my-order' style={{ color: '#fff' }} onClick={() => handleCardClick('/requests')}>Мои заявки</button>
                </div>


                <div className="main">
                    <div className="form">
                        <div className="form-block">
                            <h2 style={{ fontSize: 20 }}>Заключение нетиповой и сверхлимитной сделки</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-content-request">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={categoryChoice} alt="icon" />
                                    </span>
                                    <div className="input-block-category">
                                        <select className="select-realty-category"
                                            value={formState.businessProcess}
                                            onChange={(e) => handleInputChange('businessProcess', e.target.value)}
                                        >
                                            <option value='' disabled>Категория запроса</option>
                                            <option value='Индивидуальные схемы кредитования'>Индивидуальные схемы кредитования</option>
                                            <option value='Кредит на индивидуальных условиях'>Кредит на индивидуальных условиях</option>
                                        </select>
                                    </div>
                                </div>

                                {formState.businessProcess && (
                                    <>
                                        { /* Индивидуальные схемы кредитования */ }
                                        {formState.businessProcess === 'Индивидуальные схемы кредитования' && (
                                            <div>
                                                <div className="form-content-credit-contract">
                                                    <span className="icon" style={{marginRight: '10px'}}>
                                                        <img width={30} height={30} src={numberIcon} alt="icon"/>
                                                    </span>
                                                    <div className="input-block-contract">
                                                        <input
                                                            type="text"
                                                            placeholder="Номер кредитного договора"
                                                            value={formState.externalId}
                                                            onChange={(e) => handleInputChange('externalId', e.target.value)}/>
                                                        {showErrors && !formState.externalId && (
                                                            <div className="error-message">
                                                                <span className="span-error-info">Обязательное поле</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="form-content-body">
                                                    <div className="form-content-bank">
                                                    <span className="icon" style={{marginRight: '10px'}}>
                                                        <img width={30} height={30} src={homeLine} alt="icon"/>
                                                    </span>
                                                        <div className="form-content-form-bank">
                                                            <select
                                                                className='select-bank'
                                                                value={formState.tbObjectName}
                                                                onChange={(e) => handleInputChange('tbObjectName', e.target.value)}
                                                            >
                                                                <option value="" disabled>Название организации</option>
                                                                <option value="Сбер">Сбер</option>
                                                                <option value="Сбербанк">Сбербанк</option>
                                                                <option value="СБЕР2">СБЕР</option>
                                                                <option value="СБЕЕЕР!!!">СБЕЕЕР!!!</option>
                                                            </select>
                                                            {showErrors && !formState.tbObjectName && (
                                                                <div className="error-message" style={{ marginBottom: '5px'}}>
                                                                    <span className="span-error-info">Обязательное поле</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-content-email">
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={emailIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block-email">
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            value={formState.initiatorEmail}
                                                            onChange={(e) => handleInputChange('initiatorEmail', e.target.value)}/>
                                                        {emailError && (
                                                            <img className='errorImg' src={errorIcon} alt=""/>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-comment">
                                                    <textarea
                                                        maxLength={1000}
                                                        placeholder="Комментарий"
                                                        value={formState.comment}
                                                        onChange={(e) => handleInputChange('comment', e.target.value)}
                                                    ></textarea>
                                                </div>
                                                {emailError && (
                                                    <div style={{fontSize: '12px', marginBottom: '5px'}}>{emailError}</div>
                                                )}
                                                {showErrors && !formState.initiatorEmail && (
                                                    <div className="error-message">
                                                    <span style={{color: 'rgb(239, 107, 37)'}}>
                                                         Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                                                    </span>
                                                    <span style={{ color: '#fff'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                                                    </div>
                                                )}
                                                {/*{fileList.length === 0 && (*/}
                                                {/*    <div style={{ fontSize: '12px' }}><span style={{color: 'rgb(239, 107, 37)'}}>Отсутствуют документы.</span> Прикрепите документы к заявке</div>*/}
                                                {/*)}*/}
                                                {showErrors && fileList.length === 0 && (
                                                    <div className="error-message">
                                                        <span className="span-error-info">Отсутствуют документы.</span> Прикрепите документы к заявке</div>
                                                )}
                                            </div>
                                        )}

                                        { /* Кредит на индивидуальных условиях */ }
                                        {formState.businessProcess === 'Кредит на индивидуальных условиях' && (
                                            <div>
                                                <div className="form-content-credit-contract">
                                            <span className="icon" style={{marginRight: '10px'}}>
                                                <img width={30} height={30} src={numberIcon} alt="icon"/>
                                            </span>
                                                    <div className="input-block-contract">
                                                        <input
                                                            type="text"
                                                            placeholder="Номер кредитного договора"
                                                            value={formState.externalId}
                                                            onChange={(e) => handleInputChange('externalId', e.target.value)}/>
                                                        {showErrors && !formState.externalId && (
                                                            <div className="error-message">
                                                                <span className="span-error-info">Обязательное поле</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-content-fio">
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={peopleIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block">
                                                        <input
                                                            style={{marginRight: '10px'}}
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Фамилия"
                                                            value={formState.lastName}
                                                            onChange={(e) => handleInputChange('lastName', e.target.value)}/>
                                                        <input
                                                            style={{marginRight: '10px'}}
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Имя"
                                                            value={formState.firstName}
                                                            onChange={(e) => handleInputChange('firstName', e.target.value)}/>
                                                        <input
                                                            className='fio'
                                                            type="text"
                                                            placeholder="Отчество"
                                                            value={formState.middleName}
                                                            onChange={(e) => handleInputChange('middleName', e.target.value)}/>
                                                        <div style={{ display: 'flex'}}>
                                                            {showErrors && !formState.lastName && (
                                                                <div className="error-message" style={{ marginRight: '102px'}}>
                                                                    <span className="span-error-info">Обязательное поле</span> Фамилия
                                                                </div>
                                                            )}
                                                            {showErrors && !formState.firstName && (
                                                                <div className="error-message">
                                                                    <span className="span-error-info">Обязательное поле</span> Имя
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-content-email">
                                                <span className="icon" style={{marginRight: '10px'}}>
                                                    <img width={30} height={30} src={emailIcon} alt="icon"/>
                                                </span>
                                                    <div className="input-block-email">
                                                        <input
                                                            type="text"
                                                            placeholder="Email"
                                                            value={formState.initiatorEmail}
                                                            onChange={(e) => handleInputChange('initiatorEmail', e.target.value)}/>
                                                        {emailError && (
                                                            <img className='errorImg' src={errorIcon} alt=""/>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="form-comment">
                                                <textarea
                                                    maxLength={1000}
                                                    placeholder="Комментарий"
                                                    value={formState.comment}
                                                    onChange={(e) => handleInputChange('comment', e.target.value)}
                                                ></textarea>
                                                </div>
                                                {emailError && (
                                                    <div style={{fontSize: '12px', marginBottom: '5px'}}>{emailError}</div>
                                                )}
                                                {showErrors && !formState.initiatorEmail && (
                                                    <div className="error-message">
                                                    <span style={{color: 'rgb(239, 107, 37)'}}>
                                                         Указан некорректный адрес корпоративной электронной почты. Проверьте, что электронная почта, которую вы ввели, с одним из доменов:
                                                    </span>
                                                        <span style={{ color: '#fff'}}>  @sberbank.ru    @sber.ru    @omega.sbrf.ru </span>
                                                    </div>
                                                )}
                                                {/*{fileList.length === 0 && (*/}
                                                {/*    <div style={{ fontSize: '12px' }}><span style={{color: 'rgb(239, 107, 37)'}}>Отсутствуют документы.</span> Прикрепите документы к заявке</div>*/}
                                                {/*)}*/}
                                                {showErrors && fileList.length === 0 && (
                                                    <div className="error-message">
                                                        <span className="span-error-info">Отсутствуют документы.</span> Прикрепите документы к заявке</div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}



                                <div className="form-button" style={{ marginTop: '20px'}}>
                                    <button className="create-request-btn">Создать заявку</button>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className="right-block-request">
                        <HintsBlock fileList={fileList} onFileRemove={handleFileRemove} setFileList={setFileList} />
                    </div>
                </div>

                {showNotification && (
                    <Notification message={notificationMsg} onClose={closeNotification} />
                )}
                {showAlert && (
                    <NorificationAlert message={alertMessage} onClose={closeAlert} />
                )}

                <div className='footer-verify'>
                    <div className="circle" style={{ paddingRight: '14px', cursor: 'pointer' }} onClick={() => handleCardClick('/requests')}>
                        <img width={61} height={61} src={circleSalut} alt="Clip Board" />
                    </div>
                    <div className="salut">
                        <input className='salut-input' type="text" placeholder={'Напишите, чем вам помочь'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConclusionTransactions;
