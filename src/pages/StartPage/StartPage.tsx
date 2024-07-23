import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import './StartPage.scss';
import clipBoard from "../../resources/clipboard-line.svg"
import createRequestIMG from "../../resources/createRequest.svg"
import {AssistantAppState, createAssistant, createSmartappDebugger} from "@sberdevices/assistant-client";

const initialize = (getState: () => any) => {
        return createSmartappDebugger({
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI0NTdiMjkxMi1kNzJmLTRkOWMtOTQyOS1lZGNiYjQ2OWFhNGEiLCJzdWIiOiJkMTUwMDA2YTA1YmNmYzcyMTU5NmZhYjczZDNhZjExNmI0NzU1YzY4NGM5NWI4MjdhZTk2NzhhZDUxZGEyODIxNTM5YmU5MjcwMDQyNjI5OCIsImlzcyI6IktFWU1BU1RFUiIsImV4cCI6MTcxNjUzODUyOCwiYXVkIjoiVlBTIiwidXNyIjoiMGMyZDY0NzEtMDg2YS00ZTU5LWJiYzYtNjgwNzI4ZjEyODJlIiwiaWF0IjoxNzE2NDUyMTE4LCJzaWQiOiIxMGY0YmRmNi0yOTA0LTRiY2ItOGY3OC00ZTM5NmEyYjUwOTcifQ.U5ZpqPkpc3oNJD-KI2DYRcaaGnIBhlULtFMb88EmMqDl96esD4d4QWg2syB8A3dFkdRlwUb-dnuFtaYYxBuGB6qhPWQKU5DGT_oznGa7yFl6QtJFoiUCzx8kVRI9zEMPIZ5Sh1w69u-YZg3zkp9frGPl0ekm5WYlfPeAbaLCLtFsGZR0WSHBkIh8z7dVKSO7_2ulIxZRJEGNy82KXzFg-Z72KTTtLLejV0oNi9wZi49_aKxxVXtIwgmdKKvGbJdGifegm1GtD_I-bZGTB4NS6uBbfTpJhXA0GXjb1VviSsYrEcueNb0VoBBakBgt3Jlxcc6-Qu_tpkkhx6Q2N_slCOAGOGkZMIBRMyqtHRWm5IbMuf4XfnYSholVYecJprRGl__lYeyjrY1mKlsaFOr_wsmy-82kCfKsM-VI7pEdc4pf1Ohwjf7HniOXLDXNffufhclH1HIo-HLqwgEjVjFLobSGdbc_I5AZKLcEJ3QSE0OoEZ70_AdINGvEFs0P6hL0gpc1mmKT3dcca6iG8bxrOu81NYD1MeVmEudc_wnfD3ypg_J5Mk1cKtYNtjEdMk2El4tC8-K-6-Rum-AIkiQrJ0_PrcXE4LvC0te-8RXABvqyso-L6bfuMBBInE0YkROdYBXN-Gl5kiQfJoRWMjXSinjScJ-Z29o2ofoUeMJfeAk',
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

const StartPage: React.FC = () => {
    const navigate = useNavigate();

    const assistantStateRef = useRef<AssistantAppState>();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();

    // useEffect(() => {
    //     assistantRef.current = initialize(() => assistantStateRef.current);
    //     assistantRef.current.on('data', ({ navigation, action }: any) => {
    //         if (navigation) {
    //             console.log(2)
    //             switch (navigation.command) {
    //                 case 'UP':
    //                     window.scrollTo(0, window.scrollY - 500);
    //                     break;
    //                 case 'DOWN':
    //                     window.scrollTo(0, window.scrollY + 500);
    //                     break;
    //             }
    //         }
    //         if (action) {
    //             console.log(1)
    //             console.log(action)
    //         }
    //     });
    //
    //     document.addEventListener('keydown', handleKeyDown);
    //
    //     return () => {
    //         document.removeEventListener('keydown', handleKeyDown);
    //     };
    // }, []);

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
            <div className="card" onClick={() => handleCardClick('/form')}>
                <img width={40} height={40} src={createRequestIMG} alt="Create Request" />
                <p>Создать запрос</p>
            </div>
            <div className="card" onClick={() => handleCardClick('/requests')}>
                <img width={40} height={40} src={clipBoard} alt="Clip Board" />
                <p>Посмотреть текущие</p>
            </div>
        </div>
    );
};

export default StartPage;
