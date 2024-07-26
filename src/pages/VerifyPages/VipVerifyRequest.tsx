import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateFormField, resetForm } from '../../redux/formActions';
import HintsBlock from "../../components/HintBlock/HintBlock";
import './VerifyRequest.scss';
import categoryChoice from "../../resources/categoryChoice.svg";
import numberIcon from "../../resources/numberIcon.svg";
import peopleIcon from "../../resources/peopleIcon.svg";
import houseIcon from "../../resources/houseIcon.svg";
import homeLine from "../../resources/home-line.svg";
import errorIcon from "../../resources/errorIcon.svg";
import emailIcon from "../../resources/emailIcon.svg";
import { useNavigate } from "react-router-dom";
import circleSalut from "../../resources/circleSalut.svg";
import closeImg from "../../resources/closeImg.svg";
import mapIcon from "../../resources/mapIcon.svg";
import {AppDispatch} from "../../redux/store";
import Notification from "../Notification/Notification";

const VipVerifyRequest: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [formState, setFormState] = useState({
        requestType: '',
        contractNumber: '',
        propertyList: '',
        propertyCost: '',
        bank: 'Item 1',
        region: '',
        clientFamily: '',
        clientName: '',
        clientSurname: '',
        email: '',
        isVip: '',
        comment: ''
    });

    const [fileList, setFileList] = useState<File[]>([]);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMsg, setNotificationMsg] = useState('')

    const navigate = useNavigate();

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

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // for (const field in formState) {
        //     dispatch(updateFormField(field, formState[field as keyof typeof formState]));
        // }
        // Object.keys(formState).forEach((field) => {
        //     dispatch(updateFormField(field, formState[field as keyof typeof formState]));
        // })
        Object.entries(formState).forEach(([field, value]) => {
            dispatch(updateFormField(field, value))
        })

        setNotificationMsg('Заявка успешно создана!')
        setShowNotification(true)

        console.log('Данные формы отправлены в Redux:', formState);
    };

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
        navigate(path);
    };

    return (
        <div className="app">
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
                            <h2 style={{ fontSize: 20 }}>VIP. Запрос на верификацию отчетов</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-content-request">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={categoryChoice} alt="icon" />
                                    </span>
                                    <div className="input-block-category">
                                        <input
                                            type="text"
                                            placeholder="Категория запроса"
                                            value={formState.requestType}
                                            onChange={(e) => handleInputChange('requestType', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-content-credit-contract">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={numberIcon} alt="icon" />
                                    </span>
                                    <div className="input-block-contract">
                                        <input
                                            type="text"
                                            placeholder="Номер кредитного договора"
                                            value={formState.contractNumber}
                                            onChange={(e) => handleInputChange('contractNumber', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-content-body">
                                    <div className="form-content-realty">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={houseIcon} alt="icon" />
                                        </span>
                                        <div className="form-content-real-property">
                                            <select
                                                className='select-realty'
                                                value={formState.propertyList}
                                                onChange={(e) => handleInputChange('propertyList', e.target.value)}
                                            >
                                                <option value="" disabled hidden>Тип запроса</option>
                                                <option value="Объект недвижимости">Объект недвижимости</option>
                                                <option value="ИЖС">ИЖС</option>
                                            </select>
                                        </div>
                                        <div className="form-content-real-property">
                                            <input
                                                style={{ width: "395px", height: '25px' }}
                                                type="text"
                                                placeholder="Стоимость"
                                                value={formState.propertyCost}
                                                onChange={(e) => handleInputChange('propertyCost', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button className='button-realty-add'>Добавить</button>
                                </div>

                                <div className="form-content-body">
                                    <div className="form-content-bank">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={homeLine} alt="icon" />
                                        </span>
                                        <div className="form-content-form-bank">
                                            <select
                                                className='select-bank'
                                                value={formState.bank}
                                                onChange={(e) => handleInputChange('bank', e.target.value)}
                                            >
                                                <option value="" disabled hidden>Территориальный блок</option>
                                                <option value="Территориальный банк расположения объекта недвижимости">Территориальный банк расположения объекта недвижимости</option>
                                                <option value="Сбер">Сбер</option>
                                                <option value="Сбербанк">Сбербанк</option>
                                                <option value="СБЕР2">СБЕР</option>
                                                <option value="СБЕЕЕР!!!">СБЕЕЕР!!!</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-body">
                                    <div className="form-region-object">
                                        <span className="icon" style={{ marginRight: '10px' }}>
                                            <img width={30} height={30} src={mapIcon} alt="icon" />
                                        </span>
                                        <div className="form-content-region-object">
                                            <select
                                                className='select-region'
                                                value={formState.region}
                                                onChange={(e) => handleInputChange('region', e.target.value)}
                                            >
                                                <option value="" disabled hidden>Территориальный блок</option>
                                                <option value="Регион расположения объекта недвижимости">Регион расположения объекта недвижимости</option>
                                                <option value="регион1">регион1</option>
                                                <option value="регион2">регион2</option>
                                                <option value="регион3">регион3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-content-fio">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={peopleIcon} alt="icon" />
                                    </span>
                                    <div className="input-block">
                                        <input
                                            style={{ marginRight: '10px' }}
                                            className='fio'
                                            type="text"
                                            placeholder="Фамилия"
                                            value={formState.clientFamily}
                                            onChange={(e) => handleInputChange('clientFamily', e.target.value)}
                                        />
                                        <input
                                            style={{ marginRight: '10px' }}
                                            className='fio'
                                            type="text"
                                            placeholder="Имя"
                                            value={formState.clientName}
                                            onChange={(e) => handleInputChange('clientName', e.target.value)}
                                        />
                                        <input
                                            className='fio'
                                            type="text"
                                            placeholder="Отчество"
                                            value={formState.clientSurname}
                                            onChange={(e) => handleInputChange('clientSurname', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="form-content-email">
                                    <span className="icon" style={{ marginRight: '10px' }}>
                                        <img width={30} height={30} src={emailIcon} alt="icon" />
                                    </span>
                                    <div className="input-block-email">
                                        <input
                                            type="text"
                                            placeholder="Email"
                                            value={formState.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                        <img className='errorImg' src={errorIcon} alt="" />
                                    </div>
                                </div>

                                <div className="form-comment">
                                    <textarea
                                        placeholder="Комментарий"
                                        value={formState.comment}
                                        onChange={(e) => handleInputChange('comment', e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-button">
                                    <button type="submit" className="create-request-btn">Создать заявку</button>
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

export default VipVerifyRequest;
