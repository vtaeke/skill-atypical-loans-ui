import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateFormField, resetForm } from '../../redux/action/formActions';
import './Requests.scss';
import categoryChoice from "../../resources/categoryChoice.svg";
import numberIcon from "../../resources/numberIcon.svg";
import peopleIcon from "../../resources/peopleIcon.svg";
import filtersIcon from "../../resources/filtersIcon.svg";
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
import RequestsList from "../RequestsList/RequestsList";

const Requests: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [fileList, setFileList] = useState<File[]>([]);
    const [showNotification, setShowNotification] = useState(false)
    const [notificationMsg, setNotificationMsg] = useState('')
    const [emailError, setEmailError] = useState<React.ReactNode>(null)
    const [successSubmit, setSuccessSubmit] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showFilterWindow, setShowFilterWindow] = useState(false);

    const handleFilterClick = () => {
        setShowFilterWindow(!showFilterWindow);
    };

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


    const closeNotification = () => {
        setShowNotification(false)
    }

    const handleCardClick = (path: string) => {
        navigate(path);
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
                        <span style={{ color: 'rgb(165, 165, 165)' }}>Заявки / </span>
                        <span style={{ color: '#fff' }}>Мои заявки</span>
                    </div>
                    {/*<button className='my-order' style={{ color: '#fff' }} onClick={() => handleCardClick('/requests')}>Мои заявки</button>*/}
                </div>


                <div className="main">
                    <div className="form">
                        <div className="form-block" style={{ width: '1230px'}}>
                            <div className="form-block-header">
                                <div className="form-block-description">
                                    <p className="my-order" style={{ paddingRight: '40px'}}>Мои заявки</p>
                                    <p style={{ paddingRight: '10px'}}>№ КД</p>
                                    <input className="input-block-search" type="text" placeholder="Поиск"/>
                                </div>
                                <button type="submit" className='filters' onClick={handleFilterClick}>
                                    <img src={filtersIcon} alt=""/>
                                </button>
                                {showFilterWindow && (
                                    <div
                                        className="filter-window"
                                        style={{
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                                        }}
                                    >
                                        <div className="filter-header">
                                            <p>Статус</p>
                                            <div className="filter-buttons">
                                                <button className="fb-style">Выполнена
                                                    <svg style={{marginLeft: '5px'}} width="10.000000" height="10.000000" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle id="Oval 2" cx="5.000000" cy="5.000000" r="5.000000" fill="#2AC673" fill-opacity="1.000000"/>
                                                    </svg>
                                                </button>
                                                <button className="fb-style">Отказано
                                                    <svg style={{marginLeft: '5px'}} width="10.000000" height="10.000000" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle id="Oval 2" cx="5.000000" cy="5.000000" r="5.000000" fill="#EF6B25" fill-opacity="1.000000"/>
                                                    </svg>
                                                </button>
                                                <button className="fb-style">В работе
                                                    <svg style={{marginLeft: '5px'}} width="10.000000" height="10.000000" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle id="Oval 2" cx="5.000000" cy="5.000000" r="5.000000" fill="#FFFFFF" fill-opacity="0.960000"/>
                                                    </svg>
                                                </button>
                                                <button className="fb-style">Создана
                                                    <svg style={{marginLeft: '5px'}} width="10.000000" height="10.000000" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle id="Oval 2" cx="5.000000" cy="5.000000" r="5.000000" fill="#FFFFFF" fill-opacity="0.550000"/>
                                                    </svg>
                                                </button>
                                                <button className="fb-style">Ошибка
                                                    <svg style={{marginLeft: '5px'}} width="10.000000" height="10.000000" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle id="Oval 2" cx="5.000000" cy="5.000000" r="5.000000" fill="#DC283A" fill-opacity="1.000000"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="filter-body">
                                            <p>Тип</p>
                                            <div className="filter-type">
                                                <div className="filter-type-category">
                                                    <p>1.</p><button className="ft-style">Урегулирование проблемной задолженности</button>
                                                </div>
                                                <div className="filter-type-category">
                                                    <p>2.</p><button className="ft-style">Верификация отчетов</button>
                                                </div>
                                                <div className="filter-type-category">
                                                    <p>3.</p><button className="ft-style">Иностранные граждане</button>
                                                </div>
                                                <div className="filter-type-category">
                                                    <p>4.</p><button className="ft-style">VIP. Верификация отчетов</button>
                                                </div>
                                                <div className="filter-type-category">
                                                    <p>5.</p><button className="ft-style">Нетиповая и сверхлимитная сделки</button>
                                                </div>
                                                <div className="filter-type-category">
                                                    <p>6.</p><button className="ft-style">Сделка по не транзакционным продуктам</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="filter-btn">
                                            <button style={{
                                                backgroundImage: 'linear-gradient(45.00deg, rgb(47, 214, 92) 0%, rgb(32, 193, 199) 100%)',
                                                color: 'white'
                                            }} className="fb-btn">Найти</button>
                                            <button
                                                style={{ backgroundColor: 'rgba(255, 255, 255, 0.28)', color: "#a09a9a"}}
                                                className="fb-btn">Сбросить</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form >
                                <div className="table-requests">
                                    <div className="table-description">
                                        <p style={{marginRight: '428px'}}>№КД</p>
                                        <p style={{marginRight: '603px'}}>Тип</p>
                                        <p>Статус</p>
                                    </div>
                                    <RequestsList/>
                                </div>

                                <div className="form-button-requests" style={{ marginTop: '20px'}}>
                                    <button
                                        onClick={() => handleCardClick('/')}
                                        type="submit" className="request-btn">Создать заявку</button>
                                </div>

                            </form>
                        </div>
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

export default Requests;