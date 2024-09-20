import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.scss';
import clipBoard from "../../resources/clipboard-line.svg"
import clipboardVerifyV1 from "../../resources/clipboardVerifyV1.svg"
import clipboardVerifyVip from "../../resources/clipboardVerifyVip.svg"
import createRequestIMG from "../../resources/createRequest.svg"
import clipboardProfile from "../../resources/clipboardProfile.svg"
import clipBoardNotTr from "../../resources/clipBoardNotTr.svg"
import clipBoardNotTypical from "../../resources/clipBoardNotTypical.svg"
import clipBoardRegularFile from "../../resources/clipBoardRegularFile.svg"
import clipBoardRegistry from "../../resources/clipBoardRegistry.svg"
import buttonClose from "../../resources/buttonClose.svg"
import circleSalut from "../../resources/circleSalut.svg"
import {AssistantAppState, createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const initializeAssistant = (getState: () => any) => {
    return createSmartappDebugger({
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI3ODFjMmNlMC1iNmM3LTQxOGYtYTE5My04NGRkYWMxOTg4MTMiLCJzdWIiOiI0MGJmY2U4MDFlNTVlYjZjMGM1ZDE1NzU5ZjQ0MzFmMjMwZTM5YzZmZWY1OTM5ZWE5NTNkMjZkYjE3YTIyYzg1NTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcyNjkwNzk0NywiYXVkIjoiVlBTIiwidXNyIjoiMzViNGNlNTYtNWU1Zi00MTRiLWIzMDctODNjZGNmMDNjY2FhIiwiaWF0IjoxNzI2ODIxNTM3LCJzaWQiOiI0YTc2ZWY0OC1iOTM0LTRkOTQtYjMyZC1mMTIzZTZjMGMwMjkifQ.R0DtJiT4CSGqzvdo0gyab8fS4sZ5fpNugyQstfbzuIDBwTolPL47-K949iU2g13eCTSxcOhmXPWBG1999s306kAfQGfM1nMFC0vBSxE43aAH17gQyoijIartbgox2QVpdX0WTkprofAFD3jAavdZJ_tPnavOTL_kbKUYp-tPaQUorGe4mlVbV0i0caD7nLSu3kNSncBokD9AOGjH1Hv844FiG50A_21emi4FK0yCmbPlvDUEi6Z6kAzwnfKxgkHDXhBUnAR4VSVbFuePZ3y2c0v59H8Ekf6d4m1NwrdIVO3gCXdI6k5NdHt-ImgyVJ1oaJH0ly7t4HrtQwAb_8DN0DzcSLunBKuWCo-85DbXF4pW8UCaouKphI-iAQV-EQGqfFypyPbekLoul3Ootl5PXugGN6LSkKKM2kDwbVDTLm4RWmMStqWqUKAoD0itafgGjSyy7PatNkbWt21lk13WMnpBMZ4VGUOh_yp9nm1KO4dHj7LngWVQJbxmwiY2Tb0B9LOKJWibkrCuwHQu3bIPAPgA6E7n38xllKJTuZV61VveetEbmJML_ugiLpmAfNtQjWa_n6pGTz1bOpNKt2AF86fwYqhTiJLFqRYkSZLN6-t_Z4L47NIofg2eDMFPDuzGkqiF6upzqzrziHYonBJoGVT9ZqBiEZWQV7P5Nq7VTk0',
        initPhrase: 'Привет',
        getState,
        nativePanel: {
            defaultText: 'Привет',
            screenshotMode: false,
            tabIndex: -1,
        },
    });
    return createAssistant({ getState });
}

// const initializeAssistant = (getState: any) => {
//     return createAssistant({
//         getState,
//     });
// };

const StartPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch:AppDispatch = useDispatch();

    const assistantStateRef = useRef<AssistantAppState>();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();

    useEffect(() => {
        assistantRef.current = initializeAssistant(() => {});

        assistantRef.current.on('data', ({action}: any) => {
            if (action.type === "OPEN_FORM") {
                dispatch({ type: 'OPEN_FORM', payload: action.payload});
            };
        });
    },[])


    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'KeyN') {
            handleCardClick('/form');
        }
        if (event.code === 'KeyM') {
            handleCardClick('/requests');
        }
    };

    const handleCardClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="start-page">
            <div className="main">
                <div className='header-content'>
                    <h3 className='header-h3' style={{ color : '#fff'}}>Заявки</h3>
                    <button style={{background: "none", border: 'none', cursor: 'pointer', width: '32px', height: '32px'}}>
                        <img width={32} height={32} src={buttonClose} alt="Clip Board" />
                    </button>
                </div>
            </div>


            {/*<div className="card" onClick={() => handleCardClick('/form')}>*/}
            {/*    <img width={40} height={40} src={createRequestIMG} alt="Create Request" />*/}
            {/*    <p>Создать запрос</p>*/}
            {/*</div>*/}
            <div className="card-body">
                <div className="card" onClick={() => handleCardClick('/requests')}>
                    <img width={35} height={38} src={clipBoard} alt="Clip Board" />
                    <p>Мои заявки</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/verify')}>
                    <img width={35} height={38} src={clipboardVerifyV1} alt="Create Request" />
                    <p>Верификация</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/vip-verify')}>
                    <img width={35} height={38} src={clipboardVerifyVip} alt="Create Request" />
                    <p>VIP.Верификация</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/foreigners')}>
                    <img width={35} height={38} src={clipboardProfile} alt="Create Request" />
                    <p>Иностранцы</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/non-transactional')}>
                    <img width={35} height={38} src={clipBoardNotTr} alt="Create Request" />
                    <p>Нетранзикционные</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/conclusion-transactions')}>
                    <img width={35} height={38} src={clipBoardNotTypical} alt="Create Request" />
                    <p>Нетиповая и сверхлимитная</p>
                </div>
                <div className="card" onClick={() => handleCardClick('/settlement-problem-debt')}>
                    <img width={35} height={38} src={clipBoardRegularFile} alt="Create Request" />
                    <p>Урегулирование задолженности</p>
                </div>
                <div className="card"
                     // onClick={() => handleCardClick('/registers')}
                >
                    <img width={35} height={38} src={clipBoardRegistry} alt="Create Request" />
                    <p>Реестры</p>
                </div>
            </div>

            <div className='footer'>
                <div className="circle" style={{paddingRight: '14px', cursor: 'pointer'}} onClick={() => handleCardClick('/requests')}>
                    <img width={61} height={61} src={circleSalut} alt="Clip Board" />
                </div>
                <div className="salut">
                    <input className='salut-input' type="text" placeholder={'Напишите, чем вам помочь'}/>
                </div>
            </div>

        </div>
    );
};

export default StartPage;
